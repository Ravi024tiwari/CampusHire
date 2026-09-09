export type ResourceCategory = 
  | 'ALL'
  | 'COMPANY_KITS'
  | 'CORE_CS'
  | 'APTITUDE'
  | 'HR_BEHAVIORAL'
  | 'RESUME_TEMPLATES';

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  categoryLabel: string;
  badgeColor: string;
  summary: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tags: string[];
  featured?: boolean;
  downloadsCount?: string;
  content: {
    overview: string;
    sections: Array<{
      heading: string;
      description?: string;
      bulletPoints?: string[];
      codeSnippet?: {
        language: string;
        code: string;
      };
      qnaList?: Array<{
        question: string;
        answer: string;
      }>;
    }>;
    keyTakeaways?: string[];
    downloadUrl?: string;
  };
}

export const RESOURCES_DATA: ResourceItem[] = [
  // ================= COMPANY PREP KITS =================
  {
    id: 'comp-google-prep',
    title: 'Google SDE Placement Kit: DSA Patterns & System Scaling',
    category: 'COMPANY_KITS',
    categoryLabel: 'Company Kit',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    summary: 'Detailed round-by-round breakdown of Google SWE & Intern hiring, top graph & DP algorithms, and Googleyness behavioral rubric.',
    readTime: '12 min read',
    difficulty: 'Advanced',
    tags: ['Google', 'Graphs', 'Dynamic Programming', 'Googleyness', 'System Design'],
    featured: true,
    downloadsCount: '4.2k reads',
    content: {
      overview: 'Google on-campus hiring for Software Engineer and STEP intern roles emphasizes algorithmic problem solving, clean code, edge-case analysis, and team collaboration (Googleyness).',
      sections: [
        {
          heading: 'Round 1: Online Assessment (Coding & Graph/Trie)',
          description: '2 Complex algorithmic problems on HackerEarth or Google Internal testing portal (90 Minutes).',
          bulletPoints: [
            'Question 1 typically tests Graph Traversal (BFS/DFS, Dijkstra, Union-Find) or Tree DP.',
            'Question 2 tests Advanced Sliding Window, Two Pointers, or Segment Trees.',
            'Time & Space Complexity constraints are strict: O(N log N) or O(N) required.',
          ],
        },
        {
          heading: 'Round 2 & 3: Technical Interviews (Live Problem Solving)',
          description: '45-minute live pair coding sessions on Google Meet using a collaborative Google Doc or coderPad without auto-complete.',
          bulletPoints: [
            'Clarify requirements and edge cases before writing a single line of code.',
            'State your brute force approach (O(N²)), then optimize to O(N log N) or O(N).',
            'Dry run your code with test cases (including empty array, negative values, duplicates).',
          ],
        },
        {
          heading: 'Round 4: Googleyness & Cultural Alignment',
          description: 'Evaluates intellectual humility, navigation of ambiguity, and collaborative leadership.',
          qnaList: [
            {
              question: 'How do you handle a teammate who disagrees with your technical design?',
              answer: 'I focus on objective data and benchmark tests rather than personal opinions. I schedule a 1-on-1 walkthrough, listen to their concerns, evaluate trade-offs (latency vs memory vs dev velocity), and reach a shared consensus or consult technical documentation.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'Master Trie, Segment Trees, Topological Sort, and 2D Dynamic Programming.',
        'Never code in silence: verbalize your thinking process continuously.',
        'Always calculate and state Time Complexity (O) and Space Complexity (Auxiliary memory).',
      ],
    },
  },
  {
    id: 'comp-tcs-nqt-kit',
    title: 'TCS NQT & Digital Placement Master Guide (Ninja & Prime)',
    category: 'COMPANY_KITS',
    categoryLabel: 'Company Kit',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    summary: 'Comprehensive guide to clearing TCS National Qualifier Test (NQT) for Ninja (₹3.6 LPA), Digital (₹7.2 LPA), and Prime (₹9.0 LPA) bands.',
    readTime: '10 min read',
    difficulty: 'Intermediate',
    tags: ['TCS', 'NQT', 'Prime Band', 'Aptitude', 'Java', 'Python'],
    featured: true,
    downloadsCount: '8.9k reads',
    content: {
      overview: 'The TCS NQT is one of India\'s largest national campus assessment drives. High scores unlock direct interviews for high-paying Digital and Prime software engineering roles.',
      sections: [
        {
          heading: 'Section 1: Cognitive Assessment (Aptitude, Reasoning, Verbal)',
          description: '65 Minutes timed section covering Numerical Ability, Reasoning Ability, and Verbal Ability.',
          bulletPoints: [
            'Numerical Ability: Time & Work, Speed & Distance, Geometry, Permutations & Combinations, Data Interpretation.',
            'Reasoning Ability: Syllogisms, Blood Relations, Coding-Decoding, Seating Arrangements, Data Sufficiency.',
            'Verbal: Paragraph completion, Sentence correction, Vocabulary in context.',
          ],
        },
        {
          heading: 'Section 2: Advanced Coding Round (Hands-on Programming)',
          description: '2 Coding problems in C, C++, Java, or Python (45 Minutes).',
          bulletPoints: [
            'Problem 1 (Easy-Medium): Array manipulation, String parsing, Math series generation (Ninja Level).',
            'Problem 2 (Medium-Hard): Hashing, Matrix traversal, Recursion, Stack/Queue evaluation (Digital/Prime Level).',
          ],
          codeSnippet: {
            language: 'python',
            code: `# Common TCS NQT Pattern: Longest Subarray with Sum K
def max_subarray_len(arr, k):
    prefix_map = {}
    curr_sum = 0
    max_len = 0
    for i, num in enumerate(arr):
        curr_sum += num
        if curr_sum == k:
            max_len = i + 1
        if (curr_sum - k) in prefix_map:
            max_len = max(max_len, i - prefix_map[curr_sum - k])
        if curr_sum not in prefix_map:
            prefix_map[curr_sum] = i
    return max_len`,
          },
        },
      ],
      keyTakeaways: [
        'No negative marking: attempt every single question.',
        'Speed is critical in the cognitive section—practice shortcut formulas.',
        'Write clean modular code with descriptive variable names in the coding round.',
      ],
    },
  },
  {
    id: 'comp-microsoft-prep',
    title: 'Microsoft SDE Campus Drive: Arrays, Trees & Low-Level Design',
    category: 'COMPANY_KITS',
    categoryLabel: 'Company Kit',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    summary: 'Complete strategy for Microsoft on-campus rounds: Codility assessment, Tree/BST recursion, LLD object-oriented design, and Azure fundamentals.',
    readTime: '11 min read',
    difficulty: 'Advanced',
    tags: ['Microsoft', 'Trees', 'Recursion', 'LLD', 'OOPs', 'System Design'],
    downloadsCount: '3.8k reads',
    content: {
      overview: 'Microsoft campus hiring focuses heavily on writing bug-free, modular, production-grade code, binary trees, recursion, and object-oriented low-level architecture.',
      sections: [
        {
          heading: 'Assessment Format on Codility (3 Questions / 90 Mins)',
          bulletPoints: [
            'Tests string manipulation, array sliding window, and greedy optimization.',
            'Codility checks performance on large inputs ($N = 10^5$), requiring $O(N)$ or $O(N \\log N)$ solutions.',
          ],
        },
        {
          heading: 'Technical Interview Focus Areas',
          bulletPoints: [
            'Binary Trees & BST: Lowest Common Ancestor (LCA), Vertical Order Traversal, Serialize/Deserialize Tree.',
            'Linked Lists: Reverse in K-groups, Detect and Remove Loop, Flatten Multilevel Linked List.',
            'Object-Oriented Design (LLD): Design Parking Lot, LRU Cache, or Elevator System.',
          ],
        },
      ],
      keyTakeaways: [
        'Write clean helper functions and adhere to OOP principles.',
        'Prepare your resume projects in depth: discuss scaling bottlenecks, database choices, and CI/CD pipelines.',
      ],
    },
  },
  {
    id: 'comp-zoho-kit',
    title: 'Zoho Software Developer 5-Round Selection Blueprint',
    category: 'COMPANY_KITS',
    categoryLabel: 'Company Kit',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    summary: 'Crack Zoho\'s unique 5-round recruitment process: C Aptitude, Basic Programming, Advanced Application Design, and HR rounds.',
    readTime: '9 min read',
    difficulty: 'Intermediate',
    tags: ['Zoho', 'C Pointers', 'Application Design', 'Console Apps', 'OOPs'],
    downloadsCount: '5.1k reads',
    content: {
      overview: 'Zoho values practical coding ability over theoretical memorization. In Round 3, you are asked to build a full working console application (like Railway Booking or Snakes & Ladders) from scratch.',
      sections: [
        {
          heading: 'Round 1: C Programming Aptitude (MCQs)',
          bulletPoints: [
            'Pointers arithmetic, double pointers, `void*`, and pointer arrays.',
            'Pre-processor directives, bitwise operators, and recursion call stack evaluation.',
          ],
        },
        {
          heading: 'Round 3: Advanced Programming (2.5 Hours Console App)',
          description: 'Build a fully functioning command-line application handling complex business rules and state.',
          bulletPoints: [
            'Popular problem statements: Railway Reservation System, Taxi Booking Application, ATM System, Maze Solver.',
            'Focus on modular class hierarchy, encapsulation, and proper data validation.',
          ],
        },
      ],
      keyTakeaways: [
        'Master C/Java arrays and strings without relying on external libraries.',
        'Focus on working modular code that handles multiple test cases.',
      ],
    },
  },

  // ================= CORE CS CHEAT SHEETS =================
  {
    id: 'core-dbms-top-sql',
    title: 'DBMS & Top 50 SQL Interview Queries Master Sheet',
    category: 'CORE_CS',
    categoryLabel: 'Core CS Cheat Sheet',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    summary: 'ACID properties, Normalization (1NF to BCNF), Indexing mechanics, Transactions, and the 50 most frequently asked SQL interview questions.',
    readTime: '15 min read',
    difficulty: 'Intermediate',
    tags: ['DBMS', 'SQL', 'ACID', 'Indexing', 'Normalization', 'Joins'],
    featured: true,
    downloadsCount: '12.4k reads',
    content: {
      overview: 'Database Management Systems (DBMS) and SQL query writing are mandatory technical assessment topics for almost every software engineering campus drive.',
      sections: [
        {
          heading: '1. ACID Properties Explained',
          bulletPoints: [
            'Atomicity: All operations in a transaction succeed, or none do (All-or-Nothing).',
            'Consistency: The database remains in a valid state before and after transaction execution.',
            'Isolation: Concurrent transactions execute without interfering with each other (Read Committed, Serializable).',
            'Durability: Committed data is permanently stored even during power outages or system crashes.',
          ],
        },
        {
          heading: '2. High-Yield SQL Interview Queries',
          codeSnippet: {
            language: 'sql',
            code: `-- 1. Find the 2nd Highest Salary in Employee Table
SELECT MAX(salary) AS second_highest_salary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- 2. Find N-th Highest Salary using DENSE_RANK()
WITH RankedSalaries AS (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank_pos
  FROM Employee
)
SELECT salary FROM RankedSalaries WHERE rank_pos = 2 LIMIT 1;

-- 3. Find Duplicate Emails in a Table
SELECT email, COUNT(email) as duplicate_count
FROM Users
GROUP BY email
HAVING COUNT(email) > 1;

-- 4. Delete Duplicate Rows keeping only the lowest ID
DELETE FROM Employee 
WHERE id NOT IN (
  SELECT MIN(id) FROM Employee GROUP BY email
);`,
          },
        },
        {
          heading: '3. Database Normalization Quick Guide',
          bulletPoints: [
            '1NF: Eliminate repeating groups; ensure atomic values in columns.',
            '2NF: Satisfy 1NF and eliminate partial functional dependency (all non-key attributes depend on whole primary key).',
            '3NF: Satisfy 2NF and eliminate transitive functional dependency (no non-key attribute depends on another non-key).',
            'BCNF: A stricter version of 3NF where for every functional dependency $X \\rightarrow Y$, $X$ must be a super key.',
          ],
        },
      ],
      keyTakeaways: [
        'Know how B-Trees and Hash Indexes reduce disk I/O from O(N) to O(log N).',
        'Be ready to write subqueries, window functions (`ROW_NUMBER`, `DENSE_RANK`), and `LEFT JOIN` vs `INNER JOIN`.',
      ],
    },
  },
  {
    id: 'core-os-cheat-sheet',
    title: 'Operating Systems Revision Notes: Paging, Deadlocks & Threads',
    category: 'CORE_CS',
    categoryLabel: 'Core CS Cheat Sheet',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    summary: 'Process vs Thread, CPU Scheduling algorithms, Banker\'s Deadlock Algorithm, Virtual Memory, and Critical Section Synchronization.',
    readTime: '10 min read',
    difficulty: 'Intermediate',
    tags: ['Operating Systems', 'Paging', 'Threads', 'Deadlock', 'Semaphores', 'Virtual Memory'],
    downloadsCount: '7.6k reads',
    content: {
      overview: 'A high-impact revision sheet covering essential operating system concepts asked in Round 1 online assessments and Technical Interview rounds.',
      sections: [
        {
          heading: '1. Process vs Thread',
          bulletPoints: [
            'Process: An executing program with its own dedicated memory space (Code, Data, Heap, Stack). Heavyweight.',
            'Thread: A lightweight unit of execution within a process that shares Code, Data, and Heap with peer threads, but maintains its own Stack and Program Counter.',
          ],
        },
        {
          heading: '2. The 4 Necessary Conditions for Deadlock',
          bulletPoints: [
            '1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.',
            '2. Hold and Wait: A process holds at least one resource and is waiting for others.',
            '3. No Preemption: Resources cannot be forcibly confiscated from a process.',
            '4. Circular Wait: A closed chain of processes exists, where each process holds resources needed by the next.',
          ],
        },
        {
          heading: '3. Semaphores vs Mutex',
          bulletPoints: [
            'Mutex (Mutual Exclusion Object): Locking mechanism owned by the thread that locked it. Binary (0 or 1).',
            'Semaphore: Signalling mechanism using integer counters. Counting semaphores allow $N$ threads to access limited pool resources.',
          ],
        },
      ],
      keyTakeaways: [
        'Know the difference between Context Switching at the process level vs thread level.',
        'Understand Thrashing and how increasing page frames can cause Belady\'s Anomaly in FIFO replacement.',
      ],
    },
  },
  {
    id: 'core-cn-cheat-sheet',
    title: 'Computer Networks Quick Guide: OSI, TCP Handshake & DNS',
    category: 'CORE_CS',
    categoryLabel: 'Core CS Cheat Sheet',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    summary: 'OSI 7 Layers, 3-Way TCP Handshake, TCP vs UDP, HTTPS SSL/TLS Handshake, DNS Resolution Flow, and Subnetting.',
    readTime: '11 min read',
    difficulty: 'Intermediate',
    tags: ['Computer Networks', 'TCP/IP', 'DNS', 'HTTPS', 'OSI Model', 'Sockets'],
    downloadsCount: '6.2k reads',
    content: {
      overview: 'Everything you need to answer core Computer Networking questions confidently during technical interviews.',
      sections: [
        {
          heading: '1. What happens when you type `https://google.com` in your browser?',
          bulletPoints: [
            '1. Browser checks local cache -> OS cache -> Router cache -> Resolving Name Server for IP.',
            '2. DNS Lookup recursively resolves domain name to target IP address.',
            '3. TCP 3-Way Handshake established (SYN -> SYN-ACK -> ACK).',
            '4. TLS/SSL Handshake takes place for cryptographic HTTPS encryption.',
            '5. Browser issues HTTP GET request -> Server responds with HTML/CSS/JS payload -> DOM rendering occurs.',
          ],
        },
        {
          heading: '2. TCP vs UDP Protocol Comparison',
          bulletPoints: [
            'TCP (Transmission Control Protocol): Connection-oriented, reliable, guarantees in-order packet delivery with error detection & retransmission. Used in HTTP, FTP, Email (SMTP).',
            'UDP (User Datagram Protocol): Connectionless, lightweight, low-latency, no packet delivery guarantee. Used in Live Video Streaming, DNS, Online Gaming (VoIP).',
          ],
        },
      ],
      keyTakeaways: [
        'Understand port numbers: HTTP (80), HTTPS (443), SSH (22), DNS (53), MySQL (3306).',
        'Know how NAT (Network Address Translation) allows multiple devices on a private network to share one public IP.',
      ],
    },
  },

  // ================= APTITUDE & QUANT =================
  {
    id: 'apt-quant-formulas',
    title: 'Quantitative Aptitude Formula Sheet & Speed Math Shortcuts',
    category: 'APTITUDE',
    categoryLabel: 'Aptitude & Quant',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    summary: 'Essential formulas and shortcut techniques for Speed-Time-Distance, Work-Time, Percentages, Profit-Loss, and Permutations.',
    readTime: '8 min read',
    difficulty: 'All Levels',
    tags: ['Aptitude', 'Quant', 'Formulas', 'Speed Math', 'TCS', 'Infosys', 'Capgemini'],
    downloadsCount: '9.5k reads',
    content: {
      overview: 'Round 1 screening for service companies (TCS, Infosys, Wipro, Capgemini, Accenture) filters over 70% of candidates based on Quantitative Aptitude.',
      sections: [
        {
          heading: '1. Time, Speed & Distance Golden Formulas',
          bulletPoints: [
            'Average Speed for equal distances at speeds $a$ and $b$: $\\text{Avg Speed} = \\frac{2ab}{a+b}$',
            'Relative Speed (Same Direction): $S_{\\text{rel}} = S_1 - S_2$',
            'Relative Speed (Opposite Direction): $S_{\\text{rel}} = S_1 + S_2$',
            'Train passing a pole: $\\text{Time} = \\frac{\\text{Length of Train}}{\\text{Speed}}$',
          ],
        },
        {
          heading: '2. Time & Work Shortcuts',
          bulletPoints: [
            'If A takes $x$ days and B takes $y$ days, together they take: $\\frac{xy}{x+y}$ days.',
            'Men-Days-Hours Formula: $\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}$',
          ],
        },
      ],
      keyTakeaways: [
        'Memorize squares up to 30 and cubes up to 15 to solve arithmetic questions under 40 seconds.',
        'Use the options-elimination strategy when direct calculation takes more than 1 minute.',
      ],
    },
  },

  // ================= HR & BEHAVIORAL =================
  {
    id: 'hr-star-interview-guide',
    title: 'Top 30 HR Questions & Winning STAR Method Answers',
    category: 'HR_BEHAVIORAL',
    categoryLabel: 'HR & Behavioral',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    summary: 'Master behavioral questions using the STAR framework: Tell me about yourself, Strengths/Weaknesses, Conflict resolution, and Why our company.',
    readTime: '14 min read',
    difficulty: 'All Levels',
    tags: ['HR Round', 'STAR Method', 'Behavioral', 'Communication', 'Placement Tips'],
    featured: true,
    downloadsCount: '11.1k reads',
    content: {
      overview: 'The HR and managerial round evaluates cultural alignment, resilience, workplace communication, and long-term career intent.',
      sections: [
        {
          heading: 'The STAR Method Explained',
          bulletPoints: [
            'Situation: Set the scene and provide context (Company, College project, or Hackathon).',
            'Task: What was your specific goal, responsibility, or obstacle?',
            'Action: What concrete steps and technical initiatives did YOU take?',
            'Result: Quantify the outcome (e.g., Reduced latency by 35%, won 1st prize among 50 teams).',
          ],
        },
        {
          heading: 'Key Behavioral Q&A Walkthroughs',
          qnaList: [
            {
              question: 'Tell me about yourself (The 90-Second Formula)',
              answer: 'Start with your present academic degree and core technical passion -> Highlight 1-2 major impactful projects/internships -> Mention hackathons or leadership achievements -> Conclude with why you are excited about this specific role at this company.',
            },
            {
              question: 'What is your greatest weakness and how are you addressing it?',
              answer: 'I used to find it challenging to delegate tasks in team projects because I wanted everything done perfectly. During our final year capstone project, I realized this was causing a bottleneck. I started using GitHub Projects and Trello to divide tasks transparently, which improved our sprint delivery by 30%.',
            },
            {
              question: 'Why should we hire you over other candidates?',
              answer: 'Beyond strong foundational knowledge in DSA and full-stack development, I have proven execution experience shipping end-to-end applications. In my previous internship, I proactively optimized database indexing to handle 10k daily requests. I bring a combination of rapid learning ability, clean engineering practices, and high ownership.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'Always research the company\'s products, recent news, and mission statement before the interview.',
        'Have 2-3 thoughtful questions ready to ask the interviewer at the end of the round.',
      ],
    },
  },

  // ================= RESUME TEMPLATES & ATS =================
  {
    id: 'res-ats-single-column-template',
    title: 'ATS-Compliant Single Column LaTeX & Docs Resume Template',
    category: 'RESUME_TEMPLATES',
    categoryLabel: 'Resume Templates',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    summary: 'Standard single-column ATS resume template formatted to achieve a 95%+ parse rate on Workday, Greenhouse, Taleo, and CampusHire AI.',
    readTime: '6 min read',
    difficulty: 'All Levels',
    tags: ['LaTeX', 'ATS Template', 'Overleaf', 'Google Docs', 'Resume Tips', 'Action Verbs'],
    featured: true,
    downloadsCount: '15.8k downloads',
    content: {
      overview: 'Most placement applicant tracking systems fail on multi-column or graphic-heavy resumes. This clean, single-column LaTeX/Docs structure guarantees 100% text readability and high keyword ranking.',
      sections: [
        {
          heading: '1. Why Single-Column Outperforms Two-Column',
          bulletPoints: [
            'Two-column resumes often cause ATS parsers to merge left and right columns horizontally, resulting in jumbled text.',
            'Clear standard section headings (`Education`, `Technical Skills`, `Experience`, `Projects`) allow parsers to categorize your qualifications effortlessly.',
            'Standard fonts (Inter, Helvetica, Calibri) ensure flawless rendering across operating systems.',
          ],
        },
        {
          heading: '2. High-Impact Action Verbs to Power Your Bullet Points',
          bulletPoints: [
            'Architecture & Dev: Architected, Engineered, Developed, Deployed, Integrated, Implemented.',
            'Optimization: Accelerated, Optimized, Streamlined, Reduced, Scaled, Enhanced.',
            'Leadership: Spearheaded, Coordinated, Mentored, Directed, Orchestrated.',
          ],
        },
        {
          heading: '3. LaTeX Source Code Snippet',
          codeSnippet: {
            language: 'latex',
            code: `% Standard CampusHire ATS Single-Column Template
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}

\\begin{document}
\\begin{center}
    \\textbf{\\Huge \\scshape Ravi Tiwari} \\\\ \\vspace{1pt}
    \\small +91 98765 43210 $|$ \\href{mailto:ravi@campus.edu}{\\underline{ravi@campus.edu}} $|$ 
    \\href{https://linkedin.com/in/ravi}{\\underline{linkedin.com/in/ravi}} $|$
    \\href{https://github.com/ravi}{\\underline{github.com/ravi}}
\\end{center}

\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: C++, Java, Python, TypeScript, SQL} \\\\
     \\textbf{Frameworks}{: Next.js, React, Node.js, Express, TailwindCSS} \\\\
     \\textbf{Developer Tools}{: Git, Docker, Postman, Vercel, PostgreSQL}
    }}
\\end{itemize}
\\end{document}`,
          },
        },
      ],
      keyTakeaways: [
        'Use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].',
        'Save your resume as `FirstName_LastName_Resume.pdf` without special characters.',
      ],
    },
  },
];
