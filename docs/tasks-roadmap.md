# **TASKS.md: Atomic Agent Execution Roadmap**

### **Task 001: Tailwind Swiss Style System & Root Setup**

* **Target Files:** tailwind.config.js, src/styles/globals.css, index.html  
* **Spec Reference:** PLAN.md Section 5 | CONSTITUTION.md Section 1.1  
* **Objective:** Configure Tailwind CSS with the monochromatic Swiss color palette, typography styles, sharp border utilities, and the initial zero-FOUC theme inline script in index.html.  
* **TDD Requirement:**  
  1. Write styling check/DOM test verifying that document.documentElement receives the .dark class when localStorage has portfolio-theme=dark.  
  2. Run npx vitest run tests/setup.ts \-\> Verify failure/missing classes.  
  3. Configure tailwind.config.js with Swiss tokens and add the inline theme detection script to index.html.  
  4. Run npx vitest run tests/setup.ts \-\> Verify pass.  
* **Verification Command:** npm run build  
* **Completion Definition:** Tailwind CSS compiles without errors and index.html includes inline FOUC prevention script and font imports.

### **Task 002: Theme Context Engine & Switcher Hook**

* **Target Files:** src/types/theme.ts, src/context/ThemeContext.tsx, src/hooks/useTheme.ts  
* **Spec Reference:** SPEC.md Section 2 (US-3) | CONSTITUTION.md Rule 1.1 & 3.2  
* **Objective:** Build the React Theme Context and custom useTheme hook supporting light, dark, and system modes, persisting selections to localStorage.  
* **TDD Requirement:**  
  1. Write failing test in tests/hooks/useTheme.test.tsx verifying theme state toggling and localStorage persistence.  
  2. Run npx vitest run tests/hooks/useTheme.test.tsx \-\> Verify failure.  
  3. Implement ThemeContext.tsx and useTheme.ts.  
  4. Run npx vitest run tests/hooks/useTheme.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/hooks/useTheme.test.tsx  
* **Completion Definition:** Theme context correctly reads, toggles, and updates local storage and DOM root classes.

### **Task 003: Theme Switcher UI Component**

* **Target Files:** src/components/ui/ThemeToggle.tsx, tests/components/ThemeToggle.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-3) | CONSTITUTION.md Section 1.1  
* **Objective:** Build an accessible, high-contrast Swiss-style theme toggle button displaying current theme status.  
* **TDD Requirement:**  
  1. Write failing component test in tests/components/ThemeToggle.test.tsx simulating user click and checking state updates.  
  2. Run npx vitest run tests/components/ThemeToggle.test.tsx \-\> Verify failure.  
  3. Implement ThemeToggle.tsx using Lucide icons and high-contrast monospaced labels.  
  4. Run npx vitest run tests/components/ThemeToggle.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/components/ThemeToggle.test.tsx  
* **Completion Definition:** Toggle button renders cleanly, triggers context theme switch, and passes accessibility checks.

### **Task 004: MDX Project Schema & Content Loader Engine**

* **Target Files:** src/types/project.ts, src/content/loader.ts, tests/content/loader.test.ts  
* **Spec Reference:** PLAN.md Section 3.1 & 4.2 | CONSTITUTION.md Section 3.2  
* **Objective:** Create the Zod validation schema for project frontmatter and implement the MDX dynamic loader with error handling and date sorting.  
* **TDD Requirement:**  
  1. Write failing unit test in tests/content/loader.test.ts testing valid frontmatter parsing, date sorting, and fallback behavior for invalid YAML.  
  2. Run npx vitest run tests/content/loader.test.ts \-\> Verify failure.  
  3. Implement Zod schema in src/types/project.ts and loader module in src/content/loader.ts.  
  4. Run npx vitest run tests/content/loader.test.ts \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/content/loader.test.ts  
* **Completion Definition:** Loader extracts MDX modules, validates frontmatter with Zod, skips malformed files gracefully, and sorts by publication date.

### **Task 005: Primitive Swiss UI Components (Button, Badge, Input)**

* **Target Files:** src/components/ui/Button.tsx, src/components/ui/Badge.tsx, src/components/ui/Input.tsx  
* **Spec Reference:** PLAN.md Section 2 | CONSTITUTION.md Rule 1.1  
* **Objective:** Create accessible atomic visual components adhering strictly to Swiss Typographic design (1px crisp borders, sharp edges, high contrast).  
* **TDD Requirement:**  
  1. Write failing component test in tests/components/Primitives.test.tsx testing render props, active states, and focus indicators.  
  2. Run npx vitest run tests/components/Primitives.test.tsx \-\> Verify failure.  
  3. Implement Button.tsx, Badge.tsx, and Input.tsx using clsx and tailwind-merge.  
  4. Run npx vitest run tests/components/Primitives.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/components/Primitives.test.tsx  
* **Completion Definition:** All three primitive UI components render with sharp monochromatic styling and full keyboard accessibility.

### **Task 006: Web3Forms Contact Form Logic & Hook**

* **Target Files:** src/types/contact.ts, src/hooks/useContactForm.ts, tests/hooks/useContactForm.test.ts  
* **Spec Reference:** PLAN.md Section 3.2 & 4.1 | SPEC.md Section 2 (US-4)  
* **Objective:** Build the Zod form validation schema and custom hook handling Web3Forms API dispatch, loading states, and 8-second timeout safety.  
* **TDD Requirement:**  
  1. Write failing hook test in tests/hooks/useContactForm.test.ts mocking successful and failed ![][image1] API responses.  
  2. Run npx vitest run tests/hooks/useContactForm.test.ts \-\> Verify failure.  
  3. Implement Zod schema in contact.ts and submission hook in useContactForm.ts.  
  4. Run npx vitest run tests/hooks/useContactForm.test.ts \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/hooks/useContactForm.test.ts  
* **Completion Definition:** Hook correctly validates form inputs, posts to Web3Forms endpoint, handles network timeouts, and exposes reactive status states.

### **Task 007: Contact Form Component UI**

* **Target Files:** src/components/forms/ContactForm.tsx, tests/components/ContactForm.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-4) | CONSTITUTION.md Section 3.2  
* **Objective:** Build the high-contrast contact form UI with inline Zod validation errors, submission status banners, and honeypot spam protection.  
* **TDD Requirement:**  
  1. Write component integration test in tests/components/ContactForm.test.tsx testing invalid field error displays and form reset upon success.  
  2. Run npx vitest run tests/components/ContactForm.test.tsx \-\> Verify failure.  
  3. Implement ContactForm.tsx integrating react-hook-form and useContactForm.  
  4. Run npx vitest run tests/components/ContactForm.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/components/ContactForm.test.tsx  
* **Completion Definition:** Form renders with clean monospaced input labels, prevents double submission, and shows clear success/failure alert banners.

### **Task 008: Header, Footer, and Main Layout Wrapper**

* **Target Files:** src/components/layout/Header.tsx, src/components/layout/Footer.tsx, src/components/layout/Layout.tsx  
* **Spec Reference:** PLAN.md Section 2 | CONSTITUTION.md Section 1.1  
* **Objective:** Construct the outer grid layout frame, sticky monospace navigation header, and monochromatic footer featuring a live UTC clock.  
* **TDD Requirement:**  
  1. Write layout render test verifying navigation links (/, /projects, /about) and accessibility landmark tags (\<header\>, \<main\>, \<footer\>).  
  2. Run npx vitest run tests/components/Layout.test.tsx \-\> Verify failure.  
  3. Implement Header.tsx, Footer.tsx, and Layout.tsx.  
  4. Run npx vitest run tests/components/Layout.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/components/Layout.test.tsx  
* **Completion Definition:** Persistent layout frame wraps child routes with crisp 1px borders, navigation links, theme toggle, and live UTC clock.

### **Task 009: Project Card & Homepage Hero Section**

* **Target Files:** src/components/ui/ProjectCard.tsx, src/pages/Home.tsx, tests/pages/Home.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-1) | CONSTITUTION.md Section 1.1  
* **Objective:** Construct the homepage featuring the primary hero biography, tech stack tags, and featured project grid powered by ProjectCard.  
* **TDD Requirement:**  
  1. Write page test in tests/pages/Home.test.tsx verifying that only projects with featured: true are displayed in the homepage grid.  
  2. Run npx vitest run tests/pages/Home.test.tsx \-\> Verify failure.  
  3. Implement ProjectCard.tsx and Home.tsx.  
  4. Run npx vitest run tests/pages/Home.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/pages/Home.test.tsx  
* **Completion Definition:** Homepage renders clean Swiss hero layout and filters featured projects in descending date order.

### **Task 010: Project Gallery & Dynamic Tag Filtering Page**

* **Target Files:** src/pages/Projects.tsx, tests/pages/Projects.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-1) | PLAN.md Section 2  
* **Objective:** Build the /projects gallery page listing all project posts with an interactive monospaced tag filter bar.  
* **TDD Requirement:**  
  1. Write integration test in tests/pages/Projects.test.tsx simulating tag selection and verifying grid filtering behavior.  
  2. Run npx vitest run tests/pages/Projects.test.tsx \-\> Verify failure.  
  3. Implement Projects.tsx with dynamic tag extraction and state-driven post filtering.  
  4. Run npx vitest run tests/pages/Projects.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/pages/Projects.test.tsx  
* **Completion Definition:** Filter buttons dynamically update displayed project cards based on selected technology tags.

### **Task 011: MDX Project Detail Viewer & NotFound Page**

* **Target Files:** src/pages/ProjectDetail.tsx, src/pages/NotFound.tsx, tests/pages/ProjectDetail.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-2) | CONSTITUTION.md Section 1.1  
* **Objective:** Implement the /projects/:slug detail page to render dynamic MDX content with @tailwindcss/typography styles, GitHub/Live links, and fallback 404 route handling.  
* **TDD Requirement:**  
  1. Write routing test in tests/pages/ProjectDetail.test.tsx verifying valid MDX render for valid slug and 404 state for invalid slug.  
  2. Run npx vitest run tests/pages/ProjectDetail.test.tsx \-\> Verify failure.  
  3. Implement ProjectDetail.tsx and NotFound.tsx.  
  4. Run npx vitest run tests/pages/ProjectDetail.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/pages/ProjectDetail.test.tsx  
* **Completion Definition:** Valid slugs render compiled MDX case studies with clear CTAs; invalid slugs render Swiss-styled 404 view.

### **Task 012: About Page with Experience Timeline**

* **Target Files:** src/pages/About.tsx, tests/pages/About.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-1 & US-4) | PLAN.md Section 2  
* **Objective:** Build the /about biography page containing developer bio, career timeline, tech stack matrix, and embedded ContactForm.  
* **TDD Requirement:**  
  1. Write render test in tests/pages/About.test.tsx verifying biography section, experience items, and presence of contact form.  
  2. Run npx vitest run tests/pages/About.test.tsx \-\> Verify failure.  
  3. Implement About.tsx.  
  4. Run npx vitest run tests/pages/About.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/pages/About.test.tsx  
* **Completion Definition:** About page renders full structured biography, timeline, and functional contact form integration.

### **Task 013: SEO Head Injector & JSON-LD Structured Data**

* **Target Files:** src/components/seo/SEOHead.tsx, tests/components/SEOHead.test.tsx  
* **Spec Reference:** SPEC.md Section 2 (US-5) | PLAN.md Section 3.4  
* **Objective:** Construct the SEOHead meta tags injector component for canonical URLs, OpenGraph previews, and Person/Article JSON-LD structured data.  
* **TDD Requirement:**  
  1. Write unit test in tests/components/SEOHead.test.tsx asserting correct meta tag and script tag insertion in document \<head\>.  
  2. Run npx vitest run tests/components/SEOHead.test.tsx \-\> Verify failure.  
  3. Implement SEOHead.tsx using react-helmet-async.  
  4. Run npx vitest run tests/components/SEOHead.test.tsx \-\> Verify pass.  
* **Verification Command:** npx vitest run tests/components/SEOHead.test.tsx  
* **Completion Definition:** Head element contains valid title, meta descriptions, OpenGraph parameters, canonical links, and valid JSON-LD payloads.

### **Task 014: SSG Prerender Build Pipeline Integration**

* **Target Files:** vite.config.ts, src/App.tsx, package.json  
* **Spec Reference:** SPEC.md Section 2 (US-5) | CONSTITUTION.md Section 1.2  
* **Objective:** Configure vite-plugin-prerender to crawl dynamic client routes during npm run build and generate static pre-computed .html files in /dist.  
* **TDD Requirement:**  
  1. Execute npm run build.  
  2. Verify that static pre-rendered files (dist/index.html, dist/about/index.html, dist/projects/index.html) exist in build output.  
* **Verification Command:** npm run build  
* **Completion Definition:** Full project builds completely without dynamic window/DOM reference errors, outputting static pre-rendered HTML files for all routes.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAZCAYAAACSP2gVAAADlElEQVR4Xu2XyWsUURDGk6C44QoaGTPTk5mB4E0YNAcFFUQ8KIgH/QO8xIMX8eZyyUVQEONyMSooehJxAcUVMYgLCK4xIBLUIG6oaOKO8fsy1UNNdfVkvAXtD4p59Xv1XlW/ft2vp64uUaJ/SrlcbrJliUSZTGZ9EASzLR8RQnELUNw72CDsJlCDjaHQtwX2CfYFttb2U01NTQXMd0vmumT748R4y7TQ3wF7YDkF3snxyPscuzBj+yn0L4b1SF1HbX+sELwbtk/5vHgmy5m4bthF5T+EXdcx2Wx2Iccqf472q6ghqLKYqVRqvFxYZIHAfjc3Ny9V/iDyLjMxGxgX+uhvq7Gu8oStlukJCoXCJG9CGTvF+OtMzI+gtCtjhf7DLS0tEy0PxYuTmioWCH67rQs3drllMrbi8ZVat2kWUWNj4wQZ7E1YZmjftTHCGdfJdj6fn0GfvzoGRVzwxmpV60ffjnQ6PVdy2QUi69Ys5KgjzTbyr/TmB/vu8YgQ1I5Vn28YE+sFqvA9jjm2ejHghzweChefwkXsspzCzh2DsT1sSy5vgSKPpvAOaV/x8oP1erwmSYLyMyt+ZDLNsRAnY2L2ejwUFue+ZaEw7qdqM1dkgTD+tGYhh52T9kcvP9gjjw8rFsyBfDGGTBJGJtMc4655Mdwd5DjdZtk+KlA3Qgt8M8YuUj5z6QXii53shGJDEv5EtSN1gd3zeFWhoFYOwtaernmVJGWO32MxMXuEj7J9PH0C/3OBF/9MA8kV2UHcuZqFHNYl7ZcxdfEUjvBYIdFUDuBzb/skYWQyzePeQWAHPE6B91tGgQ84jLm8BTqvWchh+6Ud9w566vE4DW1XDeAfUe3Ptl84C3nMNl/09P/mFAN/YxkF3uUYcw2wHR4qwtxTDHnXSHuTlz+o9RSjAuc9oBkKWu1NRoa+ovZhq0xMP+y9ZsI38vi2PE4yt91B/HitqAuP7TzL6OMdOM0y2BnNXAWlDzkGR8zE8a60KX+7jZHd8kuhehmXVWxIduxwkpr6NONFy/xjVRx3+x0dB/8VrDf0ET+T44rF4mgdFxFPFkns2VcTO44ck98OSifAN+B6HUNJHx+F44zHDltiY+pKj/RVCz3JXHzRvoD1wd5izhVhP+eXuk7h9wPshh4fKij913wNOyt1VfyVGlFCgQf598XyRCLeQcsSifg5AdtpeSIRds9lyxIpBeYzIFGiRP+t/gA+YIGJPW6waAAAAABJRU5ErkJggg==>