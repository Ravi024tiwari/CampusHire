/**
 * CampusHire Academic Branches - Single Source of Truth (SSOT)
 * 
 * TO ADD A NEW BRANCH IN THE FUTURE:
 * Simply add one entry to the `ACADEMIC_BRANCHES` array below.
 * It will automatically reflect across all dropdowns, multi-selectors, 
 * eligibility checks, validation schemas, and filter bars in the entire app!
 */

export interface BranchDefinition {
  code: string;           // Standard unique code (e.g. "CSE", "IT", "AERO")
  name: string;           // Official display name (e.g. "Computer Science & Engineering")
  category: 'Engineering & Technology' | 'Postgraduate' | 'Management' | 'Applied Sciences' | 'Other';
  aliases?: string[];     // Legacy variations or common abbreviations for automatic mapping
}

export const ACADEMIC_BRANCHES: readonly BranchDefinition[] = [
  // --- Engineering & Technology ---
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    category: 'Engineering & Technology',
    aliases: ['computer science', 'cs', 'cse', 'comp sci', 'computer science & engineering (cse)'],
  },
  {
    code: 'IT',
    name: 'Information Technology',
    category: 'Engineering & Technology',
    aliases: ['it', 'information tech', 'information technology (it)'],
  },
  {
    code: 'AIDS',
    name: 'Artificial Intelligence & Data Science',
    category: 'Engineering & Technology',
    aliases: ['ai & ds', 'data science & ai', 'ai', 'data science', 'aiml', 'artificial intelligence'],
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    category: 'Engineering & Technology',
    aliases: ['electronics & communication', 'ece', 'electronics', 'electronics & communication (ece)'],
  },
  {
    code: 'EE',
    name: 'Electrical Engineering',
    category: 'Engineering & Technology',
    aliases: ['electrical', 'ee', 'eee', 'electrical & electronics', 'electrical engineering (ee)'],
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    category: 'Engineering & Technology',
    aliases: ['mechanical', 'me', 'mech', 'mechanical engineering (me)'],
  },
  {
    code: 'CE',
    name: 'Civil Engineering',
    category: 'Engineering & Technology',
    aliases: ['civil', 'ce', 'civil engineering (ce)'],
  },
  {
    code: 'CHE',
    name: 'Chemical Engineering',
    category: 'Engineering & Technology',
    aliases: ['chemical', 'che', 'chem'],
  },
  {
    code: 'BIOTECH',
    name: 'Biotechnology Engineering',
    category: 'Engineering & Technology',
    aliases: ['biotechnology', 'bt', 'biotech'],
  },
  {
    code: 'AERO',
    name: 'Aerospace Engineering',
    category: 'Engineering & Technology',
    aliases: ['aerospace', 'aero', 'aeronautical engineering'],
  },

  // --- Postgraduate & Specialized ---
  {
    code: 'MCA',
    name: 'Master of Computer Applications',
    category: 'Postgraduate',
    aliases: ['mca', 'master of computer applications (mca)'],
  },
  {
    code: 'MTECH_CSE',
    name: 'M.Tech - Computer Science',
    category: 'Postgraduate',
    aliases: ['mtech cse', 'm.tech cs', 'mtech computer science'],
  },

  // --- Management ---
  {
    code: 'MBA',
    name: 'Master of Business Administration',
    category: 'Management',
    aliases: ['mba', 'mba / management', 'management'],
  },
] as const;

/**
 * Valid branch codes list for Zod / validation schemas
 */
export const BRANCH_CODES = ACADEMIC_BRANCHES.map((b) => b.code) as [string, ...string[]];

/**
 * TypeScript Type for strong compile-time type safety
 */
export type BranchCode = (typeof ACADEMIC_BRANCHES)[number]['code'];

/**
 * Fast lookup map from Code -> Full Name
 */
export const BRANCH_NAME_MAP: Record<string, string> = Object.fromEntries(
  ACADEMIC_BRANCHES.map((b) => [b.code, b.name])
);

/**
 * Grouped branches by category for beautiful grouped `<select>` dropdowns
 */
export const BRANCHES_BY_CATEGORY = ACADEMIC_BRANCHES.reduce<Record<string, BranchDefinition[]>>(
  (acc, branch) => {
    if (!acc[branch.category]) {
      acc[branch.category] = [];
    }
    acc[branch.category].push(branch);
    return acc;
  },
  {}
);

/**
 * Canonical Normalizer:
 * Takes ANY string variation (e.g. "Computer Science & Engineering (CSE)", "cs", "CSE", "Information Technology")
 * and converts it to its canonical standard Branch Code (e.g. "CSE", "IT").
 * 
 * If it doesn't match a known alias, it returns the trimmed input cleanly so legacy custom inputs don't crash.
 */
export function normalizeBranchCode(input?: string | null): string {
  if (!input) return '';
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct match on standard code
  const codeMatch = ACADEMIC_BRANCHES.find(
    (b) => b.code.toLowerCase() === lower
  );
  if (codeMatch) return codeMatch.code;

  // 2. Direct match on standard name
  const nameMatch = ACADEMIC_BRANCHES.find(
    (b) => b.name.toLowerCase() === lower
  );
  if (nameMatch) return nameMatch.code;

  // 3. Match within configured aliases
  const aliasMatch = ACADEMIC_BRANCHES.find((b) =>
    b.aliases?.some((alias) => alias.toLowerCase() === lower || lower.includes(alias.toLowerCase()))
  );
  if (aliasMatch) return aliasMatch.code;

  // 4. Fallback to trimmed code
  return trimmed;
}

/**
 * Formats a branch code or name for rich UI display:
 * e.g., "CSE" -> "Computer Science & Engineering (CSE)"
 */
export function formatBranchDisplay(codeOrName?: string | null): string {
  if (!codeOrName) return 'N/A';
  const code = normalizeBranchCode(codeOrName);
  const fullName = BRANCH_NAME_MAP[code];
  if (fullName) {
    return `${fullName} (${code})`;
  }
  return codeOrName;
}

/**
 * Returns short branch badge label:
 * e.g., "Computer Science & Engineering" -> "CSE"
 */
export function formatBranchBadge(codeOrName?: string | null): string {
  if (!codeOrName) return 'N/A';
  return normalizeBranchCode(codeOrName);
}

/**
 * Unified Global Eligibility Checker:
 * Determines if a student's branch matches the job's allowed branches.
 * 
 * Handles:
 * - Empty allowedBranches -> Open to all (true)
 * - "ALL" or "All Engineering Branches" keyword -> Open to all (true)
 * - Alias differences (e.g. Student="Computer Science & Engineering" vs Job=["CSE", "IT"] -> matches TRUE!)
 */
export function isBranchEligible(
  studentBranch?: string | null,
  allowedBranches?: string[] | null
): boolean {
  if (!allowedBranches || allowedBranches.length === 0) return true;
  
  // Check for universal access tokens
  const hasUniversalAccess = allowedBranches.some((b) => {
    const norm = b.trim().toLowerCase();
    return norm === 'all' || norm === 'all branches' || norm === 'all engineering branches';
  });
  if (hasUniversalAccess) return true;

  if (!studentBranch) return false;

  const normalizedStudent = normalizeBranchCode(studentBranch);
  const normalizedAllowed = allowedBranches.map(normalizeBranchCode);

  return normalizedAllowed.includes(normalizedStudent);
}

/**
 * Filter options prepared for TPO / Recruiter tables and dropdowns
 */
export const BRANCH_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All Branches' },
  ...ACADEMIC_BRANCHES.map((b) => ({
    value: b.code,
    label: `${b.name} (${b.code})`,
    shortLabel: b.code,
  })),
];
