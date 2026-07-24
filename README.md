# Portfolio & Project Showcase

A high-performance, SEO-optimized, Swiss Typographic design biography and project portfolio website built with React, Vite, Tailwind CSS, TypeScript, and Git-backed MDX.

---

## 📂 Project Directory Structure

```text
/
├── .agents/
│   └── rules/
│       └── workspace-rules.md     # AI agent behavioral rules and housekeeping triggers
├── .antigravityrules              # Root rules file for context bootstrapping and session wrap-up
├── CONTEXT.md                     # Ubiquitous domain language and terminology glossary
├── README.md                      # Human & AI entry point (this file)
├── ai/
│   ├── personas.md                # Target recruiter and engineer personas & architectural impact
│   └── session-memory.md          # Active session memory tracking, tasks list, and history logs
├── content/
│   └── projects/                  # Case studies stored as Git-backed MDX files (.mdx)
├── docs/                          # Core project requirements and architecture documents
│   ├── project-constitution.md    # Design system rules, tech stack guardrails, testing rules
│   ├── requirements-specification.md # User stories, acceptance criteria, error recovery matrix
│   ├── tasks-roadmap.md           # Step-by-step atomic roadmap (Task 001 to Task 014)
│   └── technical-blueprint.md     # System architecture, file paths, and schemas
├── public/                        # Static assets (favicons, OpenGraph defaults, robots.txt)
├── src/                           # Frontend React application codebase
│   ├── components/                # Modular UI elements (layout, forms, primitive components)
│   │   ├── layout/                # Header, Footer, and Page layout wrappers
│   │   ├── ui/                    # Button, Input, Badge, ThemeToggle
│   │   ├── forms/                 # Zod-validated Web3Forms contact form
│   │   └── seo/                   # SEO Head tag and JSON-LD structured data injector
│   ├── content/                   # MDX loader engine with Zod frontmatter parser
│   ├── context/                   # Theme state provider (Light/Dark/System)
│   ├── hooks/                     # Custom React hooks (useTheme, useContactForm)
│   ├── pages/                     # Routed page views (Home, Projects, ProjectDetail, About, 404)
│   ├── styles/                    # Global stylesheet & Tailwind CSS configurations
│   ├── types/                     # TypeScript type definitions and Zod validation schemas
│   └── utils/                     # Helper utilities (Tailwind class merges, date formats)
├── tests/                         # Vitest test suites (hooks, components, schemas)
├── index.html                     # HTML root template with FOUC inline prevention script
├── package.json                   # Project dependencies and script declarations
├── tailwind.config.js             # Swiss typographic theme configuration & typography plugin
└── tsconfig.json                  # Strict TypeScript compiler options
```

---

## 🧠 Workspace Management & Context Bootstrapping

For a consistent and seamless development cycle, this project implements a structured context loop using the following configurations:

- **Context Bootstrapping**: At the start of a session, AI agents must read [ai/session-memory.md](file:///Users/nina/development/projects/portfolio-site/ai/session-memory.md) to restore development state, and align code changes with files in the [docs/](file:///Users/nina/development/projects/portfolio-site/docs/) directory.
- **Ubiquitous Language**: Refer to [CONTEXT.md](file:///Users/nina/development/projects/portfolio-site/CONTEXT.md) for canonical terms to keep product specifications and code naming conventions unified.
- **Housekeeping Protocol**: Before disconnects, the current status is committed, changes are logged, and next steps are appended to `session-memory.md`. Rules governing this are in [.antigravityrules](file:///Users/nina/development/projects/portfolio-site/.antigravityrules).
