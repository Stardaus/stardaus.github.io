---
type: persona-definition
title: Portfolio Site Target Personas
description: Detailed definitions of target personas for the Portfolio & Project Showcase site, detailing their goals, paint points, and architectural impact.
tags: [personas, requirements, target-users]
timestamp: 2026-07-24T15:20:00+08:00
---

# Portfolio Site — Target Personas

This document defines the primary and secondary user personas for the Portfolio & Project Showcase application. Understanding these personas helps ground our software design, performance choices, and accessibility boundaries in real user needs.

---

## 1. Primary Persona: "Sarah" (Recruiter / Hiring Manager)

Sarah represents the key business decision-maker who reviews candidates' portfolios to decide if they should move to the interview phase.

### Profile & Context
- **Age:** 32
- **Background:** Technical recruiter at a high-growth tech company. Reviews dozens of portfolios daily.
- **Tech Literacy:** High-level understanding of tech terms, but doesn't write code herself.
- **Primary Goal:** Wants to quickly verify the candidate's core skills, check project live links, and send a message or download a resume without friction.
- **Pain Points:**
  - Slow-loading portfolios with heavy, flashy animations that lag on her laptop.
  - Portfolios that look exactly the same ("generic bootstrap/tailwind templates").
  - Broken contact forms or mandatory links that lead to 404 pages.
  - Difficulty finding the candidate's actual contributions to projects.

### Architectural & Design Impact on the Codebase
1. **SSG Static Pre-rendering:** To address Sarah's time constraints, the site must load instantly. Using `vite-plugin-prerender` to serve fully pre-rendered HTML yields an LCP under 1.2s.
2. **Distinct Swiss Aesthetic:** The stark typography and grid system ensure the portfolio stands out from cookie-cutter templates immediately, conveying high professionalism and design sensibility.
3. **Robust Form Handlers:** The contact form must use client-side validation (via Zod + React Hook Form) and clear success/error UI banners to prevent lost submissions or silent failures.

---

## 2. Secondary Persona: "Alex" (Tech Lead / Senior Engineer)

Alex represents the technical evaluator who conducts deep-dives into the candidate's actual projects, code style, and engineering discipline.

### Profile & Context
- **Age:** 36
- **Background:** Technical lead evaluating candidates for their software architecture and developer practices.
- **Tech Literacy:** Expert.
- **Primary Goal:** Wants to read structured case studies explaining *why* technical design choices were made, see GitHub source repositories, and check code hygiene.
- **Pain Points:**
  - Case studies that only describe features instead of explaining engineering architecture and trade-offs.
  - Portfolios built on low-quality code repositories with messy commit histories.
  - Lack of accessibility (WCAG violations) or poor responsiveness on mobile/tablet viewports.

### Architectural & Design Impact on the Codebase
1. **Git-Backed MDX Engine:** Case studies are structured as `.mdx` files with explicit frontmatter constraints. This allows Alex to inspect clean, well-formatted Markdown and code blocks rendered with typography plugins.
2. **WCAG AA Accessibility compliance:** Monochromatic high-contrast color choices and accessible semantic tags guarantee that the site passes strict audit standards.
3. **TDD Coverage & Type Safety:** By enforcing Vitest unit/integration tests and strict TypeScript, the codebase serves as a direct demonstration of high software engineering practices.
