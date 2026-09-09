import { ChatGroq } from '@langchain/groq';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

/**
 * Strict Zod Schema for ATS Resume & Job Match Analysis
 */
export const AtsAnalysisResultSchema = z.object({
  overallScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe('Overall ATS Match Score between 0 and 100 based on weighted metrics'),
  categoryScores: z.object({
    skillsMatch: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe('Match percentage for primary hard technical and tool skills (45% weight)'),
    experienceAndProjects: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe('Relevance of projects, practical experience, and domain alignment (25% weight)'),
    keywordDensity: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe('ATS keyword presence, industry terminology, and action verbs (20% weight)'),
    educationAndEligibility: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe('Academic branch, batch, and criteria alignment (10% weight)'),
  }),
  matchStatus: z
    .enum(['STRONG_MATCH', 'MODERATE_MATCH', 'LOW_MATCH'])
    .describe('STRONG_MATCH (>=80), MODERATE_MATCH (60-79), LOW_MATCH (<60)'),
  matchedSkills: z
    .array(z.string())
    .describe('Technical and functional skills found in both the job requirements and the student resume'),
  missingSkills: z
    .array(z.string())
    .describe('Crucial skills or requirements specified in the job description that are missing from the resume'),
  partialSkills: z
    .array(z.string())
    .describe('Skills where the candidate possesses a related or underlying competency (e.g. MySQL vs PostgreSQL)'),
  recommendations: z
    .array(z.string())
    .min(2)
    .max(5)
    .describe('Actionable, specific bullet points advising the student on how to tailor their resume for this specific job'),
  summary: z
    .string()
    .describe('A 2-3 sentence executive evaluation summary explaining the candidate fit for this role'),
});

export type AtsAnalysisResult = z.infer<typeof AtsAnalysisResultSchema>;

export interface JobEvaluationContext {
  title: string;
  companyName: string;
  description: string;
  skills: string[];
  location?: string;
  salaryPackage?: string;
  minCgpa?: number;
  allowedBranches?: string[];
  eligibleBatches?: number[];
}

/**
 * Production LangChain ATS Matching Engine using Groq (Llama 3.3 70B)
 */
export async function runAtsAnalysisPipeline(
  rawResumeText: string,
  jobContext: JobEvaluationContext
): Promise<AtsAnalysisResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured in environment variables.');
  }

  // 1. Semantic Chunking & Cleaning with RecursiveCharacterTextSplitter
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
    separators: ['\n\n', '\n', ' ', ''],
  });

  const resumeChunks = await textSplitter.splitText(rawResumeText);
  const normalizedResumeText = resumeChunks.join('\n\n--- SECTION BREAK ---\n\n');

  // 2. Groq models to attempt in order of availability and intelligence
  const candidateModels = [
    process.env.GROQ_MODEL,
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.6-27b',
    'groq/compound-mini',
  ].filter(Boolean) as string[];

  // 3. Construct Prompt
  const promptTemplate = PromptTemplate.fromTemplate(`
You are an expert AI Hiring Manager and Senior ATS (Applicant Tracking System) Evaluation Specialist for Tier-1 Tech Companies and Campus Placement Cells.

Your task is to critically analyze a Student's Resume against a Target Job Drive Description and produce a precise, realistic, and highly actionable ATS evaluation scorecard.

### EVALUATION CRITERIA & WEIGHTS:
1. Core Technical Skills (45%): Check for both exact and semantic matches of programming languages, frameworks, libraries, databases, and DevOps tools.
2. Projects & Practical Experience (25%): Evaluate whether candidate projects demonstrated technologies relevant to the role.
3. ATS Keyword Density (20%): Check for industry terminology, architectural keywords, and impactful action verbs.
4. Eligibility & Academic Fit (10%): Degree, branch, and overall readiness.

---

### TARGET JOB DETAILS:
- **Role Title**: {jobTitle}
- **Company**: {companyName}
- **Required / Evaluated Skills**: {jobSkills}
- **Location**: {jobLocation}
- **Min CGPA Requirement**: {minCgpa}
- **Allowed Branches**: {allowedBranches}
- **Job Description & Responsibilities**:
{jobDescription}

---

### CANDIDATE RESUME TEXT:
{resumeText}

---

### INSTRUCTIONS:
- Be strictly objective and realistic in your scoring. Do not give artificially inflated 100% scores unless candidate is an exceptional 1-to-1 match.
- Classify skills accurately:
  * matchedSkills: Skills clearly evidenced in the resume.
  * missingSkills: Important job skills nowhere to be found in the resume.
  * partialSkills: Equivalent or complementary skills (e.g., job asks for DynamoDB, student has MongoDB).
- Provide 3 to 4 actionable, highly tailored recommendations on how the student can optimize bullet points, projects, and keywords for this exact position.
`);

  const formattedPrompt = await promptTemplate.format({
    jobTitle: jobContext.title,
    companyName: jobContext.companyName,
    jobSkills: jobContext.skills && jobContext.skills.length > 0 ? jobContext.skills.join(', ') : 'Not specified',
    jobLocation: jobContext.location || 'Flexible',
    minCgpa: jobContext.minCgpa !== undefined && jobContext.minCgpa > 0 ? `${jobContext.minCgpa} CGPA` : 'No cutoff',
    allowedBranches: jobContext.allowedBranches && jobContext.allowedBranches.length > 0 ? jobContext.allowedBranches.join(', ') : 'All Branches',
    jobDescription: jobContext.description,
    resumeText: normalizedResumeText,
  });

  // 4. Try models with fallback loop
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const llm = new ChatGroq({
        apiKey,
        model: modelName,
        temperature: 0.1,
        maxRetries: 1,
      });

      const structuredLlm = llm.withStructuredOutput(AtsAnalysisResultSchema);
      const result = await structuredLlm.invoke(formattedPrompt);
      return result;
    } catch (err: any) {
      console.warn(`[GROQ_MODEL_FALLBACK] Model ${modelName} failed or unavailable:`, err?.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All Groq candidate models failed. Please check your API key and connection.');
}
