<div align="center">

# 🎓 CampusHire

### The Next-Generation Enterprise Campus Recruitment & Placement Operating System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-campushire--06v8.onrender.com-blue?style=for-the-badge&logo=render&logoColor=white)](https://campushire-06v8.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ravi024tiwari/CampusHire)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

**CampusHire** is a high-performance, full-stack campus recruitment platform engineered to unify **Students**, **Corporate Recruiters**, **College Placement Cells (TPO)**, and **Super Admins** into a single, seamless digital ecosystem. Built for university placement automation, multi-resume ATS intelligence, instant offer generation, and zero-latency SWR caching.

[Explore Live Platform](https://campushire-06v8.onrender.com/) • [Report Bug](https://github.com/Ravi024tiwari/CampusHire/issues) • [Request Feature](https://github.com/Ravi024tiwari/CampusHire/issues)

</div>

---

## 🌟 Key Highlights & Engineering Features

* ⚡ **0ms Instant Client Navigation (TanStack React Query):** Server state is cached in-memory with automatic background Stale-While-Revalidate (SWR) revalidation, eliminating layout shifts and loading spinners during tab switching.
* 🤖 **AI-Powered ATS Resume Scanner:** Built-in AI evaluation pipeline analyzing resume compatibility against job descriptions with actionable keyword and grammar suggestions.
* 🔒 **Single-Offer Locking Protocol:** Strict institutional placement policy enforcement preventing offer-hoarding and ensuring equal career opportunities across all eligible students.
* 📨 **Automated Offer Dispatch via Resend:** Real-time email delivery for interview calls, status progressions, and official digitally-signed PDF offer letters.
* 📊 **Institutional TPO & NIRF Intelligence:** Automated placement telemetry, batch-wise analytics, CTC metrics, and NIRF-ready reporting formats.
* 🎨 **Industrial Aesthetic & Micro-Interactions:** Modern UI crafted with custom HSL palettes, smooth glassmorphism, responsive data grids, and mobile-optimized touch navigation.

---

## 👥 Multi-Stakeholder Portals

```
                                  ┌───────────────────┐
                                  │    CampusHire     │
                                  │ Core Infrastructure│
                                  └─────────┬─────────┘
            ┌───────────────────┬───────────┴───────────┬───────────────────┐
            ▼                   ▼                       ▼                   ▼
    ┌───────────────┐   ┌───────────────┐       ┌───────────────┐   ┌───────────────┐
    │  👨‍🎓 Student   │   │  💼 Recruiter │       │  🏛️ TPO Cell  │   │  🛡️ Platform  │
    │    Portal     │   │    Portal     │       │    Portal     │   │  Super Admin  │
    └───────────────┘   └───────────────┘       └───────────────┘   └───────────────┘
```

### 1. 👨‍🎓 Student Experience
* **Personalized Telemetry Dashboard:** Real-time metrics on submitted applications, upcoming drive deadlines, and placement readiness score.
* **Smart Campus Drive Discovery:** Multi-filter exploration (On-Campus/Off-Campus, CTC range, eligibility by CGPA & branch, work mode).
* **Multi-Resume Repository:** Upload, preview, and manage tailored resumes for distinct roles (Frontend, Backend, SDE, Analytics).
* **Live Application Pipeline Tracker:** Visual multi-stage status progress (Applied ➔ Under Review ➔ Shortlisted ➔ Interview Scheduled ➔ Offered).
* **Digital Offer Acceptance:** Review official compensation breakdown, download signed PDF contract, and complete one-click digital acceptance.

### 2. 💼 Corporate Recruiter Suite
* **Placement Drive Orchestration:** Post campus hiring drives, configure strict eligibility criteria (CGPA, allowed branches, passing batch).
* **Candidate Pipeline & Kanban Evaluation:** Filter applicants, view ATS match scores, change statuses in bulk, and leave internal interview notes.
* **Instant Digital Offer Release:** Formulate custom CTC packages and trigger automated digital offer letters with email notifications.
* **Hiring Analytics Dashboard:** Track applicant conversion funnels, top colleges, and hiring velocity.

### 3. 🏛️ College Placement Cell (TPO)
* **Institutional Verification:** Verify candidate credentials, CGPA records, and departmental eligibility.
* **Company Engagement Hub:** Invite and approve corporate recruiters for campus drives.
* **NIRF & NAAC Audit Reports:** Real-time exportable placement spreadsheets and statistical compliance reports.

### 4. 🛡️ Platform Super Admin
* **Ecosystem Governance:** Global overview of registered universities, verified recruiters, and overall placement volume.
* **Institution Onboarding:** Review and approve incoming college registration requests.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router)** + **React 19** | Server Components, Streaming SSR, Optimized routing |
| **Language** | **TypeScript 5** | Strict end-to-end type safety |
| **State Management** | **TanStack React Query v5** + **Zustand** | SWR in-memory server state caching & reactive UI state |
| **Styling & Design** | **Tailwind CSS v4** + **Lucide React** | Fluid typography, responsive grids, dark/light aesthetics |
| **Database & ORM** | **PostgreSQL** + **Prisma ORM** | Relational schemas, automated migrations, type-safe queries |
| **Authentication** | **JWT** + **Bcrypt.js** | Secure stateless token-based RBAC authentication |
| **AI Intelligence** | **Google Gemini API** | Multi-resume keyword parsing, ATS analysis, recommendations |
| **Communication** | **Resend API** | Transactional emails, drive alerts, and digital offer dispatch |
| **Hosting & CI/CD** | **Render** + **Vercel** + **GitHub Actions** | Automated production builds and continuous deployment |

---

## 📂 Project Structure

```
campushire/
├── app/                              # Next.js 15 App Router
│   ├── api/                          # REST API Endpoints
│   │   ├── admin/                    # Platform administration routes
│   │   ├── auth/                     # Authentication & registration routes
│   │   ├── recruiter/                # Recruiter drives, pipeline, and offers API
│   │   ├── student/                  # Student applications, resumes, and jobs API
│   │   └── tpo/                      # College placement cell management API
│   ├── recruiter/                    # Recruiter Portal pages & components
│   │   ├── applications/             # Candidate evaluation pipeline
│   │   ├── dashboard/                # Recruiter telemetry & hiring metrics
│   │   ├── jobs/                     # Drive management & job postings
│   │   ├── offers/                   # Offer letters & contract release
│   │   └── analytics/                # Recruitment funnel analytics
│   ├── student/                      # Student Portal pages & components
│   │   ├── applications/             # Submitted applications tracking
│   │   ├── dashboard/                # Student telemetry, KPIs, drives
│   │   ├── jobs/                     # Campus drive discovery & application
│   │   ├── offers/                   # Offer review & digital acceptance
│   │   ├── profile/                  # Student academic profile & records
│   │   └── resume/                   # ATS resume manager
│   ├── layout.tsx                    # Global root layout with QueryProvider
│   └── page.tsx                      # Modern cinematic landing page
├── components/                       # Shared UI & layout components
├── hooks/
│   └── queries/                      # TanStack React Query hooks
│       ├── useStudentQueries.ts      # Student cache keys & query hooks
│       └── useRecruiterQueries.ts    # Recruiter cache keys & query hooks
├── lib/                              # Core utilities & singleton clients
│   ├── ai/                           # AI ATS analysis & prompt engineering
│   ├── email/                        # Resend email templates & delivery
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

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
* **Node.js** 18.18.0 or later
* **npm**, **pnpm**, or **yarn**
* **PostgreSQL** database instance (Local or Cloud e.g. Supabase, Neon, Railway)

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
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/campushire?schema=public"

# Authentication Secrets
JWT_SECRET="your-super-secure-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Resume Scanner (Google Gemini)
GEMINI_API_KEY="your-gemini-api-key"

# Transactional Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="CampusHire <noreply@yourdomain.com>"

# Cloud Asset Storage (Cloudinary / S3)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Database Setup & Migrations
```bash
# Push schema to database
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

## 🔮 Future Roadmap & Upcoming Capabilities

- [ ] **AI-Powered Live Video Mock Interviews:** Real-time webcam assessment with speech-to-text transcription and instant scoring on behavioral questions.
- [ ] **Integrated Collaborative Coding Sandbox:** In-browser code execution environment for live technical interviews supporting 20+ programming languages.
- [ ] **WhatsApp & SMS Webhook Notifications:** Automated interview reminders and offer alerts sent directly to candidates' mobile phones.
- [ ] **Multi-College Pool Drive Architecture:** Enable tier-1 companies to host joint placement drives spanning multiple affiliated regional colleges simultaneously.
- [ ] **Smart NIRF & AICTE Compliance Engine:** One-click generation of verified institutional placement audit spreadsheets with cryptographic verification stamps.
- [ ] **Alumni Mentorship & Referral Network:** Connect graduating students with verified college alumni working at top tech firms.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to add a feature:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ for ambitious students and modern universities.**

[![Live Demo](https://img.shields.io/badge/Live%20Website-campushire--06v8.onrender.com-blue?style=flat-square)](https://campushire-06v8.onrender.com/) • [![GitHub](https://img.shields.io/badge/GitHub-Ravi024tiwari%2FCampusHire-black?style=flat-square&logo=github)](https://github.com/Ravi024tiwari/CampusHire)

</div>
