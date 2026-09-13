<div align="center">

# 🎓 CampusHire

### The Next-Generation Enterprise Campus Recruitment & Placement Operating System

[![Live Deployment](https://img.shields.io/badge/Live%20Platform-campushire--06v8.onrender.com-00C7B7?style=for-the-badge&logo=render&logoColor=white)](https://campushire-06v8.onrender.com/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Ravi024tiwari%2FCampusHire-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ravi024tiwari/CampusHire)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.10-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon%20Serverless-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![LangChain + Groq](https://img.shields.io/badge/AI%20ATS-LangChain%20%2B%20Groq-F55036?style=for-the-badge&logo=langchain&logoColor=white)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

**CampusHire** is an enterprise-grade, multi-tenant campus placement orchestration platform engineered to unify **Students**, **Corporate Recruiters**, **College Training & Placement Cells (TPO)**, and **Platform Super Admins** into a single, high-performance digital ecosystem. Built for university hiring automation, AI-driven ATS resume intelligence, instant PDF offer letter dispatch, and sub-50ms client transitions.

[🚀 Explore Live Platform](https://campushire-06v8.onrender.com/) • [📂 GitHub Repository](https://github.com/Ravi024tiwari/CampusHire) • [🐛 Report Issue](https://github.com/Ravi024tiwari/CampusHire/issues)

</div>

---

## 📌 Executive Summary

Modern university placements often suffer from fragmented manual spreadsheets, communication friction, delayed offer releases, and lack of real-time visibility. **CampusHire** resolves these challenges by providing:
- **Centralized Placement Pipeline**: End-to-end management from drive announcement to interview scheduling and digitally signed offer release.
- **AI-Powered ATS Matcher**: Real-time resume extraction (`unpdf`) and semantic candidate-to-job matching (`LangChain` + `Groq LLMs`).
- **Strict Role-Based Gatekeeping**: Multi-tenant authorization enforcing eligibility cutoffs (CGPA, Branch, 10th/12th Marks, Batch Year) and strict registration rules (10-digit phone verification, age 18–30 DOB validation).
- **Single-Offer Policy Enforcement**: Embedded transaction locks preventing candidate offer-hoarding and ensuring equitable career opportunities.

---

## 🌟 Core System Highlights & Features

### ⚡ 1. Zero-Latency In-Memory Caching & SWR Prefetching
- Integrated **TanStack React Query v5** across all portals.
- Background Stale-While-Revalidate (SWR) cache invalidation ensures instant 0ms client-side route transitions and quick-application modals without screen flicker or full-page layout refetches.

### 🤖 2. AI ATS Resume Parser & Role Match Engine
- Built-in PDF structural text parser (`unpdf`) coupled with **LangChain** and **Groq AI**.
- Computes ATS match scores, highlights missing skills against dynamic job descriptions, and provides actionable improvement suggestions for students.

### 💼 3. Dynamic Job Responsibilities Model & Builders
- Recruiters can dynamically compose structured responsibilities per role during drive creation.
- Includes fallback rendering for historical/legacy job postings ensuring 100% UI consistency across cards and modals.

### 📄 4. Digital PDF Offer Letter Pipeline
- Instant PDF offer letter generation and release pipeline with compensation breakups (CTC, Base, ESOPs, Joining Bonuses).
- Real-time automated email notifications delivered via **Resend API**.
- Interactive student acceptance with celebration micro-interactions (`canvas-confetti`).

### 🛡️ 5. Robust Registration & Validation Rules
- **10-Digit Mobile Number Validation**: Live visual indicators (green check badge vs. red error badge) and backend regex enforcement.
- **Date of Birth & Age Constraints (18–30 Years)**: Strict datepicker bounds (`min` & `max`), forbidding future dates and ensuring students meet institutional age requirements.
- **Academic Normalization**: Standardized branch mapping and verified college affiliation checks.

### 🎨 6. 120 FPS High-Performance Cinematic UI
- Built with **Tailwind CSS v4** and modern glassmorphism.
- Zero-jank parallax scroll engine with RAF throttling and GPU hardware acceleration (`transform: translate3d`) for smooth fast-scrolling without compositor frame drops.

---

## 👥 Multi-Stakeholder Role Architecture

```
                                  ┌──────────────────────────────────┐
                                  │      CampusHire Core Engine      │
                                  │    Next.js 16 • PostgreSQL • RBAC │
                                  └────────────────┬─────────────────┘
             ┌─────────────────────────┬───────────┴───────────┬─────────────────────────┐
             ▼                         ▼                       ▼                         ▼
     ┌───────────────┐         ┌───────────────┐       ┌───────────────┐         ┌───────────────┐
     │  👨‍🎓 Student   │         │  💼 Recruiter │       │  🏛️ TPO Cell  │         │  🛡️ Super     │
     │    Portal     │         │    Suite      │       │    Portal     │         │    Admin      │
     └───────────────┘         └───────────────┘       └───────────────┘         └───────────────┘
     • Drive Exploration       • Drive Creator         • College Profile         • System Telemetry
     • SWR Prefetched Jobs     • Eligibility Filters   • Student Audits          • College Approvals
     • Multi-Resume Repo       • Pipeline Reviewer     • Recruiter Approvals     • Global Placements
     • Real-Time Tracker       • Offer Dispatcher      • NIRF Report Export      • Audit Logs
     • 1-Click Offer Accept    • Funnel Analytics      • Campus Photo Gallery    • Security Settings
```

### 1. 👨‍🎓 Student Portal
* **Telemetry Dashboard**: Key metrics on active applications, upcoming drive deadlines, eligibility status, and profile readiness score.
* **Campus Drive Explorer**: Filter by On-Campus/Off-Campus, CTC range, eligibility by CGPA, branch, and work mode.
* **Multi-Resume Repository**: Upload, preview, and manage tailored resumes for distinct roles (Frontend, Backend, SDE, Data Analyst).
* **Live Application Pipeline**: Visual status tracking: `Applied` ➔ `Under Review` ➔ `Shortlisted` ➔ `Interview Scheduled` ➔ `Offered`.
* **Digital Offer Acceptance**: Review compensation details, download signed PDF contract, and complete one-click digital acceptance.

### 2. 💼 Corporate Recruiter Suite
* **Placement Drive Orchestration**: Post drives, define job responsibilities, and set strict eligibility criteria (CGPA, allowed branches, passing batch).
* **Candidate Pipeline & Kanban Evaluation**: Filter applicants, view ATS match scores, change statuses in bulk, and leave internal interview notes.
* **Instant Digital Offer Release**: Formulate custom CTC packages and trigger automated digital offer letters with email notifications.
* **Hiring Analytics Dashboard**: Track applicant conversion funnels, top colleges, and hiring velocity.

### 3. 🏛️ College Placement Cell (TPO)
* **Institutional Verification**: Verify candidate credentials, CGPA records, and departmental eligibility.
* **Company Engagement Hub**: Invite and approve corporate recruiters for on-campus drives.
* **Campus Showcase**: Manage university logos and infrastructure galleries.
* **NIRF & NAAC Audit Reports**: Export placement spreadsheets and statistical compliance reports.

### 4. 🛡️ Platform Super Admin
* **Ecosystem Governance**: Global overview of registered universities, verified recruiters, and overall placement volume.
* **Institution Onboarding**: Review and approve incoming college registration requests.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technologies | Engineering Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16.3 (App Router)**, **React 19.2** | Server Components, Streaming SSR, Edge Route Handlers |
| **Language** | **TypeScript 5 (Strict Mode)** | End-to-end type safety across client, server, and DB |
| **State & Caching** | **TanStack React Query v5**, **Zustand** | In-memory SWR caching, optimistic mutations, global state |
| **Database & ORM** | **PostgreSQL (Neon Serverless)**, **Prisma 7.10** | Relational data persistence, indexed queries, connection pooling |
| **AI / ATS Pipeline** | **LangChain**, **@langchain/groq**, **unpdf** | PDF text extraction, structured resume parsing, ATS scoring |
| **Styling & Motion** | **Tailwind CSS v4**, **Lucide Icons**, **Canvas Confetti** | Design tokens, responsive grid layouts, micro-interactions |
| **Validation & Security** | **Zod**, **jose (JWT)**, **bcryptjs** | API input validation, password hashing, secure auth cookies |
| **Communications & Media** | **Resend API**, **Cloudinary** | Transactional emails, CDN asset storage (resumes & logos) |
| **Deployment** | **Render**, **GitHub Actions** | Automated CI/CD, production containerization |

---

## 📂 Project Structure

```
campushire/
├── app/                              # Next.js 16 App Router
│   ├── api/                          # REST API Endpoints
│   │   ├── admin/                    # Platform administration routes
│   │   ├── auth/                     # Authentication & registration routes
│   │   ├── colleges/                 # College listing and onboarding
│   │   ├── recruiter/                # Recruiter drives, pipeline, and offers API
│   │   ├── student/                  # Student applications, resumes, and jobs API
│   │   ├── tpo/                      # College placement cell management API
│   │   └── upload/                   # Cloudinary media upload handler
│   ├── recruiter/                    # Recruiter Portal pages & components
│   ├── student/                      # Student Portal pages & components
│   ├── tpo/                          # TPO Admin Portal pages & components
│   ├── admin/                        # Super Admin Portal pages & components
│   ├── login/                        # Unified authentication interface
│   ├── register/                     # Multi-role verified onboarding
│   ├── layout.tsx                    # Root layout with TanStack Query provider
│   └── page.tsx                      # High-performance landing page
├── components/                       # Shared UI & design system components
├── hooks/
│   └── queries/                      # TanStack React Query custom hooks
├── lib/                              # Core utilities & singleton clients
│   ├── ai/                           # AI ATS analysis & prompt engineering
│   ├── email/                        # Resend email templates & delivery
│   ├── validations/                  # Zod validation schemas
│   ├── axios.ts                      # Configured Axios client with interceptors
│   └── prisma.ts                     # Prisma Database Client singleton
├── prisma/
│   ├── schema.prisma                 # Relational PostgreSQL database schema
│   └── seed.ts                       # Database seed script for test datasets
├── providers/
│   └── QueryProvider.tsx             # TanStack Query client configuration
├── store/                            # Zustand client UI stores
└── public/                           # Static assets, branding & hero media
```

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
* **Node.js** 18.18.0 or later
* **npm**, **pnpm**, or **yarn**
* **PostgreSQL** database instance (e.g. Neon, Supabase, Railway, or local PostgreSQL)

### 1. Clone the Repository
```bash
git clone https://github.com/Ravi024tiwari/CampusHire.git
cd CampusHire
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Database Connection (PostgreSQL / Neon)
DATABASE_URL="postgresql://username:password@ep-sample-pool.neon.tech/campushire?sslmode=require"

# Authentication Secrets
JWT_SECRET="your-super-secure-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Resume Scanner (Groq / LangChain)
GROQ_API_KEY="your-groq-api-key"

# Transactional Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="CampusHire <noreply@yourdomain.com>"

# Cloud Asset Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Database Setup & Prisma Client Generation
```bash
# Generate Prisma Client
npx prisma generate

# Push schema directly to database
npx prisma db push

# (Optional) Seed initial demo data (Colleges, Companies, Jobs, Students)
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Quality & Type Safety Verification

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Build production bundle
npm run build
```

---

## 🔮 Future Roadmap

- [ ] **AI Video Mock Interview Simulator**: Automated interview scoring with speech-to-text behavioral analysis.
- [ ] **In-Browser Collaborative Coding IDE**: Integrated real-time sandbox for technical rounds supporting 25+ languages.
- [ ] **WhatsApp & SMS Webhook Notifications**: Real-time drive alerts and interview reminders sent directly to mobile.
- [ ] **Multi-College Pool Drives**: Enable tier-1 companies to host joint placement drives spanning regional college clusters.
- [ ] **Cryptographic NIRF Audit Exports**: Verified digital signatures on institutional placement compliance reports.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve CampusHire:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

<div align="center">

**Built with ❤️ for ambitious students, modern universities, and forward-thinking recruiters.**

[![Live Platform](https://img.shields.io/badge/Live%20Platform-campushire--06v8.onrender.com-00C7B7?style=flat-square)](https://campushire-06v8.onrender.com/) • [![GitHub](https://img.shields.io/badge/GitHub-Ravi024tiwari%2FCampusHire-black?style=flat-square&logo=github)](https://github.com/Ravi024tiwari/CampusHire)

</div>
