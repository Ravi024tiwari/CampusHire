import { prisma } from '@/lib/prisma';
import { extractText } from 'unpdf';
import { runAtsAnalysisPipeline, AtsAnalysisResult } from '@/lib/ai/ats-pipeline';

export interface AtsScoreResponse {
  score: AtsAnalysisResult;
  fromCache: boolean;
  evaluatedAt: string;
  resumeUrl: string;
  jobId: string;
}

/**
 * Fetches PDF binary buffer from a remote Cloudinary / HTTPS URL
 */
async function fetchPdfBufferFromUrl(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch resume file from storage (HTTP ${response.status})`);
  }
  return await response.arrayBuffer();
}

/**
 * Extracts plain text from a PDF ArrayBuffer using unpdf
 */
async function extractTextFromPdf(buffer: ArrayBuffer): Promise<string> {
  try {
    const { text } = await extractText(new Uint8Array(buffer));
    const combinedText = Array.isArray(text) ? text.join('\n') : String(text || '');
    if (!combinedText || combinedText.trim().length < 20) {
      throw new Error('PDF contains minimal or unreadable text. Please ensure it is not a scanned image.');
    }
    return combinedText.trim();
  } catch (error: any) {
    console.error('[PDF_TEXT_EXTRACTION_ERROR]', error);
    throw new Error(`Failed to extract text from resume: ${error?.message || 'Invalid PDF format'}`);
  }
}

/**
 * Core Service: Calculates or retrieves cached ATS score for a student and job
 */
export async function getOrCalculateAtsScore(params: {
  studentId: string;
  jobId: string;
  resumeUrl: string;
  forceRefresh?: boolean;
}): Promise<AtsScoreResponse> {
  const { studentId, jobId, resumeUrl, forceRefresh = false } = params;

  if (!resumeUrl || resumeUrl === '#') {
    throw new Error('No valid resume URL provided for ATS scoring.');
  }

  // 1. Check Database Cache first
  if (!forceRefresh) {
    try {
      const cachedRecord = await prisma.atsScoreCache.findUnique({
        where: {
          studentId_jobId_resumeUrl: {
            studentId,
            jobId,
            resumeUrl,
          },
        },
      });

      if (cachedRecord) {
        return {
          score: {
            overallScore: cachedRecord.overallScore,
            categoryScores: (cachedRecord.categoryScores as any) || {
              skillsMatch: cachedRecord.overallScore,
              experienceAndProjects: cachedRecord.overallScore,
              keywordDensity: cachedRecord.overallScore,
              educationAndEligibility: 100,
            },
            matchStatus:
              cachedRecord.overallScore >= 80
                ? 'STRONG_MATCH'
                : cachedRecord.overallScore >= 60
                ? 'MODERATE_MATCH'
                : 'LOW_MATCH',
            matchedSkills: cachedRecord.matchedSkills,
            missingSkills: cachedRecord.missingSkills,
            partialSkills: cachedRecord.partialSkills,
            recommendations: cachedRecord.recommendations,
            summary: cachedRecord.summary || '',
          },
          fromCache: true,
          evaluatedAt: cachedRecord.updatedAt.toISOString(),
          resumeUrl,
          jobId,
        };
      }
    } catch (cacheErr) {
      console.warn('[ATS_CACHE_CHECK_WARNING]', cacheErr);
      // Proceed to live calculation if cache check fails
    }
  }

  // 2. Fetch Job Details from DB
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      company: {
        select: { name: true },
      },
    },
  });

  if (!job) {
    throw new Error('Target job drive not found.');
  }

  // 3. Fetch and Extract Resume Text
  const pdfBuffer = await fetchPdfBufferFromUrl(resumeUrl);
  const resumeText = await extractTextFromPdf(pdfBuffer);

  // 4. Run LangChain Groq AI Pipeline
  const analysisResult = await runAtsAnalysisPipeline(resumeText, {
    title: job.title,
    companyName: job.company.name,
    description: job.description,
    skills: job.skills,
    location: job.location,
    salaryPackage: job.salaryPackage,
    minCgpa: job.minCgpa,
    allowedBranches: job.allowedBranches,
    eligibleBatches: job.eligibleBatches,
  });

  // 5. Persist to PostgreSQL Database Cache (Upsert)
  try {
    await prisma.atsScoreCache.upsert({
      where: {
        studentId_jobId_resumeUrl: {
          studentId,
          jobId,
          resumeUrl,
        },
      },
      create: {
        studentId,
        jobId,
        resumeUrl,
        overallScore: analysisResult.overallScore,
        categoryScores: analysisResult.categoryScores,
        matchedSkills: analysisResult.matchedSkills,
        missingSkills: analysisResult.missingSkills,
        partialSkills: analysisResult.partialSkills,
        recommendations: analysisResult.recommendations,
        summary: analysisResult.summary,
      },
      update: {
        overallScore: analysisResult.overallScore,
        categoryScores: analysisResult.categoryScores,
        matchedSkills: analysisResult.matchedSkills,
        missingSkills: analysisResult.missingSkills,
        partialSkills: analysisResult.partialSkills,
        recommendations: analysisResult.recommendations,
        summary: analysisResult.summary,
        updatedAt: new Date(),
      },
    });
  } catch (persistErr) {
    console.error('[ATS_CACHE_PERSIST_ERROR]', persistErr);
    // Don't fail the request if cache write fails
  }

  return {
    score: analysisResult,
    fromCache: false,
    evaluatedAt: new Date().toISOString(),
    resumeUrl,
    jobId,
  };
}
