# **SPEC.md: Requirements & Domain Specifications**

## **1\. Executive Overview & Ubiquitous Language**

### **1.1 Overview**

This document specifies the functional and domain requirements for a high-performance, SEO-optimized portfolio and biography web application built with React, Vite, Tailwind CSS, and Git-backed MDX. The site adheres strictly to Swiss Typographic design principles—focusing on grid alignment, high contrast, typography hierarchy, and zero "generic AI" visual tropes.

### **1.2 Ubiquitous Language Glossary**

| Term | Definition |
| :---- | :---- |
| **Project Post** | A Git-backed file (.mdx) located in /content/projects/ containing YAML frontmatter metadata and structured Markdown body content describing a showcase item. |
| **Frontmatter** | Structured YAML metadata at the header of an MDX file containing validated fields: title, description, date, tags, featured, coverImage, githubUrl, and liveUrl. |
| **Swiss Grid System** | A design layout system using sharp monochromatic borders (\#262626/\#E5E5E5), stark dark/light contrast (\#0A0A0A/\#FAFAFA), uppercase monospace metadata tags, and strict flex/grid alignment. |
| **Prerender Pipeline** | The build-time process using vite-plugin-prerender that converts dynamic client-side React routes into static pre-rendered HTML files for instant loading and 100% SEO indexability. |
| **Theme Mode** | The active color scheme state, which can be explicitly set to dark, light, or derived from system via media queries. |
| **Contact Payload** | Validated client-side data (name, email, subject, message) dispatched via HTTPS POST to the Web3Forms endpoint. |

## **2\. User Stories & Acceptance Criteria**

### **US-1: Portfolio Homepage & Project Grid**

**As a** site visitor,

**I want to** view a clear biography summary, key tech stack badges, and a curated list of featured projects,

**So that** I can quickly gauge the author's expertise and explore their work.

#### **Acceptance Criteria**

1. **Given** the user navigates to /,  
   **When** the page renders,  
   **Then** the hero section displays the author's name, primary role title, concise bio summary, and social links (GitHub, LinkedIn, Email).  
2. **Given** project posts exist in /content/projects/,  
   **When** the homepage loads,  
   **Then** only projects with featured: true in their frontmatter are rendered in the primary grid, ordered descending by date.  
3. **Given** project cards are displayed,  
   **When** hovered or focused,  
   **Then** micro-interaction styles (border color transition, high-contrast shift) trigger without layout jitter.  
4. **Given** the user clicks "View All Projects",  
   **When** clicked,  
   **Then** the browser transitions to /projects without a full page reload.

### **US-2: Project Detail View (MDX Article)**

**As a** recruiter or fellow engineer,

**I want to** read detailed case studies for individual projects,

**So that** I can understand the architectural decisions, tech stack, and live outcomes.

#### **Acceptance Criteria**

1. **Given** a project with slug my-cool-app,  
   **When** the user navigates to /projects/my-cool-app,  
   **Then** the router loads and renders /content/projects/my-cool-app.mdx.  
2. **Given** the MDX file contains frontmatter links (githubUrl or liveUrl),  
   **When** the project header renders,  
   **Then** persistent CTA buttons opening external links in a new tab (target="\_blank" rel="noopener noreferrer") are clearly visible.  
3. **Given** the MDX body contains code blocks, images, or headings,  
   **When** rendered,  
   **Then** Tailwind @tailwindcss/typography styles apply Swiss grid formatting with high-contrast code highlighting.  
4. **Given** the user navigates to an invalid project slug /projects/non-existent,  
   **When** rendered,  
   **Then** a custom 404 state displays with a clear "Return to Projects" navigation CTA.

### **US-3: Dark/Light Mode Theme Switcher**

**As a** user with specific visual accessibility needs,

**I want to** toggle between light and dark modes or mirror my OS system setting,

**So that** I can comfortably read the content in any lighting environment.

#### **Acceptance Criteria**

1. **Given** a first-time visitor opens the site with system theme set to dark,  
   **When** the root component mounts,  
   **Then** the HTML tag receives the .dark class automatically, matching prefers-color-scheme: dark.  
2. **Given** the user clicks the theme toggle button,  
   **When** clicked,  
   **Then** the theme toggles (dark ![][image1] light), saved to localStorage under key portfolio-theme, and applied instantly without visual flicker or page refresh.  
3. **Given** a returning visitor with portfolio-theme: "light" stored in localStorage,  
   **When** re-visiting the page,  
   **Then** the stored preference overrides the OS system setting.

### **US-4: Direct Contact Form**

**As a** prospective client or hiring manager,

**I want to** submit a message directly through the site,

**So that** I can reach out without opening my default mail client.

#### **Acceptance Criteria**

1. **Given** the user fills out the contact form on /about or the contact section,  
   **When** fields fail Zod validation (e.g., invalid email, message ![][image2] characters),  
   **Then** inline error messages highlight the offending fields, and the submit button remains disabled or prevents submission.  
2. **Given** valid input,  
   **When** the user clicks "Send Message",  
   **Then** the form enters a loading state (submitting), disables input fields, and dispatches an HTTP POST request to Web3Forms.  
3. **Given** a successful API response (![][image3]),  
   **When** completed,  
   **Then** the form clears, and a high-contrast success notification banner appears.  
4. **Given** a network error or non-200 response from Web3Forms,  
   **When** submission fails,  
   **Then** an error banner appears allowing the user to retry, without wiping their typed message.

### **US-5: SEO Indexing & Dynamic Head Metadata**

**As a** search engine crawler or social platform bot,

**I want to** read static HTML metadata (title, canonical URL, OpenGraph tags, Twitter cards),

**So that** shared links render rich previews and pages index properly on search engines.

#### **Acceptance Criteria**

1. **Given** build execution (npm run build),  
   **When** prerendering runs,  
   **Then** static .html files are produced for /, /about, /projects, and all /projects/:slug static paths.  
2. **Given** any route,  
   **When** inspected,  
   **Then** the \<head\> contains valid \<title\>, \<meta name="description"\>, \<meta property="og:title"\>, \<meta property="og:image"\>, \<link rel="canonical"\>, and dynamic JSON-LD structured data.

## **3\. Edge Cases & Failure Recovery Matrix**

| Edge Case / Scenario | Potential Failure Mode | Expected UI/UX Behavior | Technical Mechanism |
| :---- | :---- | :---- | :---- |
| **Malformed Frontmatter in .mdx** | Build failure or dynamic runtime breakdown. | Skip rendering malformed file; log validation error during dev/build. Fallback empty state in production. | Zod schema validation on frontmatter with safe fallback parser. |
| **Missing Project Cover Image** | Image request returns 404, causing layout break. | Display default high-contrast Swiss typography pattern placeholder image. | onError image handler \+ local asset fallback module. |
| **Web3Forms Rate Limit / API Outage** | Form hangs indefinitely or throws uncaught promise rejection. | Display error banner: "Message delivery delayed. Click here to email directly." | AbortController timeout (8s) \+ explicit try/catch wrapper. |
| **Rapid Double Click on Form Submit** | Duplicate emails dispatched to inbox. | Submit button immediately disabled upon first click; submit state toggled synchronously. | react-hook-form isSubmitting reactive flag lock. |
| **Invalid Route Parameter (/projects/invalid-id)** | Blank screen or unhandled exception. | Swiss-styled 404 Not Found page with high-contrast "Back to Safety" CTA. | React Router catch-all route (\*) and MDX lookup validation. |
| **Prerender Failure on SSG Build** | Build process halts due to window/DOM references at build time. | Prerender pipeline fails fast with detailed build log pointing to non-SSG compliant module. | Guard window DOM usage behind typeof window \!== 'undefined' checks. |

## **4\. Explicit Non-Goals (Out of Scope)**

The following capabilities are explicitly **OUT OF SCOPE** for this iteration:

1. **Dynamic Backend & Database**: No active Node server, PostgreSQL/MongoDB database, or user authentication system. Content is strictly Git-backed static MDX.  
2. **In-Browser Search Indexing**: No heavy full-text client-side search engine (e.g., FlexSearch/Algolia) across project posts in this iteration. Simple tag filtering is sufficient.  
3. **Dynamic CMS Admin Interface**: No hosted GUI on the production URL for editing MDX files. Content updates are submitted via standard Git commits/pull requests.  
4. **Real-time Chat or WebSocket Widgets**: No live chat bubbles or real-time online presence tracking widgets.  
5. **Multi-language i18n**: The initial release is published exclusively in English (en-US).

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAtklEQVR4Xu2SywnCQBRFExCsYn4w4NaFYgvubUCbsAP3Yg26sQctwxIswU0UvYKEeEhGXGQ3B2Zz3p2bvJCiyGR6Z+Cc21E20fxEl8R7f6QjKr3RpSh14UpJQggja+2avhUVPui6UPagrWb0NRouFXoaYyb/HN256JzZV6PhXuUr+hSfzUr6LxTaqHhO38Z7M7pOFL7TET14G2Mc0nei0oW+15S+iTIV3U/0yzi6JnrTMV0m0yMvxqQhT/s/RaUAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAZCAYAAABHLbxYAAABg0lEQVR4Xu2UvUoDQRSFE02hIDYSm002C7tFSnsLGzs738HCl/AdBAURxM7KQi0llZWKIDZiJyJBbAR/YhED+l1ZYXLZu2YTrJwPDmHOuTNzd3cmpZLH46k0Go2uNn+o1WpJGIZn1Hyils7/HDa9STf/ls6FKIoW3IzxnFVbGBZa0l4e1L9Ym4tPc6vK66JT1ysEk7fRBws3dZaH1Wgcx7Piy6/rs/5xVv2vMKmFnvWCg2I1yrlcM/zdLN9CLsA1uuOwT+qwCDmNHmT5eJtZfh9JkkxT9IguGI7pfBisRvnEJ4a/Lj4vKNCZ/EUEhB2KjnQ2KlajeHuGv5H6FZ3JUzQJe3yOLZ2NitWodUbxdrL8Ppw3e6izYclpdF58fUkL3fpqtTpFcZtJ5wzLOi+C1aggPlpW3ht6cr1BGGfSJbql6QkdDgJz361G07fXc6yy1OJHjlcMOQ7ypEEQzOgsC2pf0QO6T9WW+fV6PVZ1V6iD9qVJjsSimw8NC61oz+PxeP4xXwPQg499aroBAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAZCAYAAACIA4ibAAADAklEQVR4Xu1XO2uUQRTdJKJEUWJhFtbd/fYFC9uoiFgoWOgvULSw1UIrGx+VolgqSIim8QWKFiJoIQhGEARFxSKK+Ci08YGoiPgmhsRzd+/A3bMzH8uKIDIHLt8355y59858w2STyURERPwPyOfzg6VSaX+SJIeLxeJy1v86UHQ1in9AzCDugOpnjwDaXsRnxHfEFtYFWEwN+e5qruusp6Fer8/HnF+IZ4hljUZjNp47JRdy7ma/6dnFNOK9sQyQPmM0P2AaRYyZsSxWGqiQ7zFi3IwfIW5ZD77qGlsU46VdNQFUKpWiNj3KmkC1+8wLVPPWQQ8XoF1iPghJhEkrmbMFarXaAl9BnTtE4+3kmUxapy4VXJOBD7RRdDzXshaaC+4Y4hTzQWSz2Xm+ZMzhfYI9yovvhLxXq9VhGcvTerBB13xzLWQTNdcu1iy4rzQe4+PYvCOW6wqYeBATVxHXVoDHPh459vk84E/7eAuXR+4M1ixMvbY7jvvD+zls8gHr+SNogWkadyzK8lj45YBHjm0HbxHKz4BnSnyotYP4jj4QV62nZ2BnH0rCXC4313Ghhi2PeTd9HvAjwuOvz2LWHEL5Gc7HX9/xiHHEVjdOq9kV5HKVRLhEF1k+1LDl8Twf8BxVfhZrDiZP0CNwPpyCTT4esUHGWMeQydkbUGShJMBmzGEtlNzyoTsE3EkfbwH9uebazJpFN30Y7ozyVyzfLfo9Cc+a9y+sKy8Fn8i7XMwy7uWvTKFQWKG5XrDmUC6Xl6jnB2vKd9RwPPLnWEtFYi5QHydHNFSwaH5aawPryfMV8dFyPsDzVGsMsCZIWr9g5V4Y9GjNhTOPTcyGtCCS1g+n5iQO8sllts2MD7FHT8OUofp0XslwQcD7TnO23SXgbggvp8TyimYN7sXBaYgJ1jogt7CZwNF2NOXLCI+13cPzAeIn6D7rEaj2DXFR/DhB69iTBvj3aH05Ebf1/XXG8/9V0jp9bxAvNd4iJo0uOYR7pb5PCZ3giIiIiIiIiIh/Ab8ByHhksVdMfhIAAAAASUVORK5CYII=>