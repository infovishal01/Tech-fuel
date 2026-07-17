# Tech Fuel 🚀

> **The Ultimate Learning Platform for Developers & Computer Engineering Students**

A comprehensive **AI-powered learning platform** built with **Next.js 16**, **Tailwind CSS v4**, and **MongoDB**.

**Master AI, DSA, System Design, Core Computer Engineering, Backend Development, and Job Preparation - all in one place!**

---

## 🌟 What Makes Tech Fuel Unique?

- AI-Powered Learning with chat, code generation, mock interviews, and career roadmaps
- Structured Learning Paths for DSA, System Design, Core CS, and Backend Development
- 1000+ DSA Practice Problems with multi-language solutions
- System Design Case Studies (Twitter, Uber, Netflix, YouTube, etc.)
- Core Computer Engineering Tutorials (OS, DBMS, CN, Compiler, COA)
- Backend Code Examples with live execution
- Vlog & Blog for latest tech updates
- Job & Remote Job Preparation with resume building and interview practice

---

## 🎯 Learning Tracks

### AI & LLM Track
- Introduction to AI/ML
- LLM Fundamentals (Transformers, Attention)
- Prompt Engineering
- Fine-tuning Models
- Building AI Applications
- Ethical AI
- AI in Production

### Data Structures & Algorithms Track
**Data Structures:** Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Hash Tables, DSU, Bloom Filters, LRU Cache

**Algorithms:** Sorting, Searching, Graph Algorithms, Dynamic Programming, Greedy, Backtracking, Divide & Conquer, String Algorithms

**Practice Platform:** 1000+ Problems, Multi-language Support, Company-wise Questions, Contests, Solutions with Complexity Analysis

### System Design Track
**Fundamentals:** Scalability, Availability, CAP Theorem, Load Balancing, Caching, Database Design

**Case Studies:** TinyURL, Pastebin, Twitter, Facebook, Uber, Airbnb, Netflix, YouTube, WhatsApp, Zoom, Reddit, E-commerce, Payment Systems

**Advanced:** Microservices, Event-Driven Architecture, Serverless, Service Mesh, API Gateway, Rate Limiting, Circuit Breakers, Distributed Transactions

### Core Computer Engineering Track
- **Operating Systems:** Processes, Memory Management, File Systems, Synchronization, Deadlocks
- **Database Systems:** Relational Model, SQL, Normalization, Indexing, Transactions, Concurrency Control, NoSQL
- **Computer Networks:** OSI Model, Physical Layer, Data Link Layer, Network Layer, Transport Layer, Application Layer, Security
- **Compiler Design:** Lexical Analysis, Syntax Analysis, Semantic Analysis, Code Generation, Optimization
- **Computer Organization:** Digital Logic, Combinational Circuits, Sequential Circuits, CPU Design, Pipelining, Parallel Processing
- **Theory of Computation:** Finite Automata, Pushdown Automata, Turing Machines, Complexity Theory

### Backend Development Track
**Languages:** Node.js, Python, Java, Go, Rust

**Concepts:** REST API Design, GraphQL, gRPC, WebSockets, Authentication, Rate Limiting, API Versioning

**Code Lab:** Live Code Execution, API Testing, Debugging, Code Templates, Error Explanations

### Job & Remote Job Preparation Track
- Resume & Profile Building
- Interview Preparation (DSA, System Design, Behavioral)
- Remote Job Specifics
- Company-wise Preparation (FAANG, Top Product Companies, Startups)
- Success Stories & Vlog Updates

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4
- **Animations:** Framer Motion
- **Content:** MDX for markdown-based content
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **Components:** Custom Layout, Header, Sidebar, Footer

### Backend
- **API:** Next.js API Routes (RESTful)
- **Database:** MongoDB Atlas (Cloud-based NoSQL)
- **ODM:** Mongoose for MongoDB schema modeling
- **Authentication:** NextAuth.js with JWT and OAuth (Google)
- **Security:** bcryptjs for password hashing, JWT for session management
- **AI Integration:** OpenAI SDK for LLM interactions

### AI & Machine Learning
- **Model:** OpenAI GPT-4o-mini with Streaming
- **Features:** AI Chat, Code Generation, Mock Interviews, Project Generation, Career Roadmaps

### Quality & Developer Experience
- **Validation:** Zod for schema validation
- **Linting:** ESLint for code quality
- **Formatting:** Prettier for consistent code style

### DevOps
- **Deployment:** Vercel (recommended)
- **Containerization:** Docker & Docker Compose support
- **Environment:** Node.js 18+

---

## MongoDB Atlas Setup

This project uses MongoDB Atlas for cloud-based database hosting.

**Connection String:**
```
mongodb+srv://infovishalkumar01_db_user:FACNXr7epX4ZqPsu@cluster0.n1no7sj.mongodb.net/
```

**Steps to connect:**
1. Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (or use existing)
3. Whitelist your IP address in Network Access
4. Create a database user with readWrite permissions
5. Update the `MONGODB_URI` in your `.env.local` file

**Collections Required:**
- `users` - User accounts and profiles
- `dsa-problems` - DSA practice problems
- `dsa-solutions` - Solutions to problems
- `dsa-submissions` - User submissions
- `system-design-cases` - System design case studies
- `system-design-submissions` - Design submissions
- `core-cs-concepts` - Core CS concepts
- `core-cs-quizzes` - Quizzes and answers
- `backend-examples` - Backend code examples
- `vlog-posts` - Vlog/blog posts
- `vlog-comments` - Comments on posts
- `job-prep-resume-templates` - Resume templates
- `job-prep-interview-questions` - Interview questions
- `job-prep-remote-tips` - Remote work tips

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB database
- OpenAI API key

### Installation
```bash
git clone https://github.com/infovishal01/Tech-fuel.git
cd Tech-fuel
npm install
cp .env.local.example .env.local
# Edit .env.local with your values
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://infovishalkumar01_db_user:FACNXr7epX4ZqPsu@cluster0.n1no7sj.mongodb.net/tech-fuel

# Auth
JWT_SECRET=your_jwt_secret_minimum_32_chars
NEXTAUTH_SECRET=your_nextauth_secret_minimum_32_chars
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI
OPENAI_API_KEY=sk-your_openai_key
AI_MODEL=gpt-4o-mini
AI_MAX_TOKENS=4096
AI_TEMPERATURE=0.7

# App
NODE_ENV=development
PORT=3000
```

---

## Project Structure

```
tech-fuel/
├── app/
│   ├── (auth)/              # Login, Signup
│   ├── (main)/              # All main pages
│   │   ├── dashboard/       # User dashboard
│   │   │   └── learning/    # All learning modules
│   │   │       ├── dsa/
│   │   │       ├── system-design/
│   │   │       ├── core-cs/
│   │   │       └── backend-dev/
│   │   ├── ai-tools/        # AI tools
│   │   ├── tutorials/       # Tutorials
│   │   ├── vlog/           # Vlog & Blog
│   │   ├── job-prep/        # Job preparation
│   │   └── admin/          # Admin panel
│   └── api/                # All API routes
│       ├── auth/
│       ├── ai-chat/
│       ├── code-generator/
│       ├── mock-interview/
│       ├── project-generator/
│       ├── roadmap/
│       ├── dsa/            # NEW: DSA APIs
│       ├── system-design/  # NEW: System Design APIs
│       ├── core-cs/        # NEW: Core CS APIs
│       ├── backend-examples/ # NEW: Backend APIs
│       ├── vlog/           # NEW: Vlog APIs
│       └── job-prep/        # NEW: Job Prep APIs
├── components/
│   ├── common/              # Common layout components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Header.tsx       # Responsive header with nav
│   │   ├── Sidebar.tsx      # Collapsible sidebar
│   │   └── Footer.tsx       # Footer component
│   ├── learning/            # Learning components
│   │   ├── DSA/
│   │   ├── SystemDesign/
│   │   ├── CoreCS/
│   │   ├── BackendDev/
│   │   └── AITools/
│   └── vlog/
│       ├── VlogPost.tsx
│       └── CommentSection.tsx
├── models/                  # MongoDB Models
│   ├── User.ts
│   ├── Tutorial.ts
│   ├── DSAProblem.ts       # NEW
│   ├── SystemDesignCase.ts  # NEW
│   ├── CoreCSConcept.ts    # NEW
│   ├── BackendExample.ts   # NEW
│   ├── VlogPost.ts         # NEW
│   └── JobPrepResource.ts  # NEW
├── content/                 # All learning content
│   ├── tutorials/
│   ├── dsa/                # NEW: DSA problems
│   ├── system-design/      # NEW: Case studies
│   ├── core-cs/            # NEW: CS concepts
│   ├── backend-examples/   # NEW: Code examples
│   └── vlog/               # NEW: Vlog posts
├── lib/                    # Utilities
│   ├── ai/
│   │   ├── openai.ts
│   │   └── prompts.ts
│   └── learning/
│       ├── dsa.ts
│       ├── system-design.ts
│       ├── core-cs.ts
│       └── backend-examples.ts
├── types/                  # TypeScript types
│   ├── learning.ts
│   ├── ai.ts
│   └── vlog.ts
└── public/                 # Static assets
```

---

## API Endpoints

### AI Features (Existing)
- POST `/api/ai-chat` - Chat with AI
- POST `/api/code-generator` - Generate code
- POST `/api/mock-interview` - Mock interview
- POST `/api/project-generator` - Generate projects
- POST `/api/roadmap` - Career roadmap

### DSA Practice (NEW)
- GET `/api/dsa/problems` - List all problems
- GET `/api/dsa/problems/[id]` - Get specific problem
- POST `/api/dsa/problems` - Create problem
- PUT `/api/dsa/problems/[id]` - Update problem
- DELETE `/api/dsa/problems/[id]` - Delete problem
- POST `/api/dsa/solutions` - Submit solution
- GET `/api/dsa/solutions/[id]` - Get solution with like/dislike
- GET `/api/dsa/submissions` - List submissions
- GET `/api/dsa/submissions/[id]` - Get specific submission

### System Design (NEW)
- GET `/api/system-design/case-studies` - List all case studies
- GET `/api/system-design/case-studies/[id]` - Get specific case study
- POST `/api/system-design/case-studies` - Create case study
- PUT `/api/system-design/case-studies/[id]` - Update case study
- DELETE `/api/system-design/case-studies/[id]` - Delete case study
- GET `/api/system-design/submissions` - List submissions
- GET `/api/system-design/submissions/[id]` - Get specific submission

### Core CS (NEW)
- GET `/api/core-cs/concepts` - List all concepts
- GET `/api/core-cs/concepts/[id]` - Get specific concept
- POST `/api/core-cs/concepts` - Create concept
- PUT `/api/core-cs/concepts/[id]` - Update concept
- DELETE `/api/core-cs/concepts/[id]` - Delete concept
- GET `/api/core-cs/quizzes` - List all quizzes
- GET `/api/core-cs/quizzes/[id]` - Get quiz with answer submission

### Backend Examples (NEW)
- GET `/api/backend-examples` - List all examples
- GET `/api/backend-examples/[id]` - Get specific example
- POST `/api/backend-examples` - Create example
- PUT `/api/backend-examples/[id]` - Update example
- DELETE `/api/backend-examples/[id]` - Delete example
- POST `/api/backend-examples/run` - Run code execution

### Vlog/Blog (NEW)
- GET `/api/vlog/posts` - List all posts
- GET `/api/vlog/posts/[id]` - Get specific post
- POST `/api/vlog/posts` - Create post
- PUT `/api/vlog/posts/[id]` - Update post
- DELETE `/api/vlog/posts/[id]` - Delete post
- GET `/api/vlog/comments` - List comments
- GET `/api/vlog/comments/[id]` - Get specific comment
- POST `/api/vlog/comments` - Create comment
- PUT `/api/vlog/comments/[id]` - Update comment
- DELETE `/api/vlog/comments/[id]` - Delete comment

### Job Preparation (NEW)
- GET `/api/job-prep/resume-templates` - List resume templates
- GET `/api/job-prep/resume-templates/[id]` - Get single template
- GET `/api/job-prep/interview-questions` - List interview questions
- GET `/api/job-prep/interview-questions/random` - Get random question
- GET `/api/job-prep/interview-questions/[id]` - Get single question
- GET `/api/job-prep/remote-tips` - List remote work tips
- GET `/api/job-prep/remote-tips/[id]` - Get single tip

---

## Learning Paths

### Full Stack Developer (6 months)
1. Core CS Fundamentals (2 weeks)
2. Programming Languages (4 weeks)
3. Data Structures & Algorithms (6 weeks)
4. Backend Development (6 weeks)
5. Frontend Development (4 weeks)
6. System Design (4 weeks)
7. AI & LLM Integration (2 weeks)
8. Job Preparation (2 weeks)

### AI/ML Engineer (6 months)
1. Mathematics for AI (4 weeks)
2. Programming for AI (4 weeks)
3. Machine Learning (6 weeks)
4. Deep Learning (6 weeks)
5. LLM Specialization (6 weeks)
6. AI in Production (4 weeks)

### Backend Engineer (6 months)
1. Core CS (3 weeks)
2. Programming (6 weeks)
3. Databases (4 weeks)
4. API Design (4 weeks)
5. System Design (8 weeks)
6. DevOps (4 weeks)

### Frontend Engineer (6 months)
1. Core CS & Web (4 weeks)
2. HTML/CSS (3 weeks)
3. JavaScript & TypeScript (4 weeks)
4. React Ecosystem (6 weeks)
5. UI/UX (4 weeks)
6. Performance (3 weeks)
7. Advanced Topics (3 weeks)

---

## Deployment

### Vercel (Recommended)
```bash
git push origin main
# Deploy from Vercel Dashboard
```

### Docker
```bash
docker build -t tech-fuel .
docker run -d -p 3000:3000 --env-file .env.local tech-fuel
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
```

---

## Features Implemented ✅

- ✅ DSA Practice Platform with CRUD operations
- ✅ System Design Case Studies with submissions
- ✅ Core CS Tutorials and Quizzes
- ✅ Backend Code Examples with live execution
- ✅ Vlog/Blog System with comments
- ✅ Job Preparation Resources (Resume templates, Interview questions, Remote tips)
- ✅ Common UI Components (Layout, Header, Sidebar, Footer)
- ✅ MongoDB Atlas Integration
- ✅ Production-ready API endpoints

## Features Coming Soon 🚀

- Gamification (Badges, Leaderboards, Achievements)
- Community Features (Forums, Q&A, Discussions)
- User Progress Tracking
- Certificate Generation
- Live Coding Sessions
- Video Tutorials Integration
- Multiplayer DSA Contests
- Advanced Analytics Dashboard

---

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit your changes
4. Push to branch
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with by Tech Fuel Team**

If you find this project helpful, please give it a star! ⭐

[![GitHub Stars](https://img.shields.io/github/stars/infovishal01/Tech-fuel.svg?style=social)](https://github.com/infovishal01/Tech-fuel/stargazers)
