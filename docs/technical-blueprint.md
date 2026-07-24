# **PLAN.md: Technical & Architectural Blueprint**

## **1\. High-Level Architecture & System Data Flow**

                                  \+------------------------------+  
                                  |   Git Content Store          |  
                                  |   (/content/projects/\*.mdx)  |  
                                  \+--------------+---------------+  
                                                 |  
                                                 v  
\+-----------------------+         \+--------------+---------------+  
| Web3Forms API         |         | MDX Engine & Zod Validator    |  
| (HTTPS POST Endpoint) |         | (@mdx-js/rollup \+ Zod)        |  
\+-----------^-----------+         \+--------------+---------------+  
            |                                    |  
            | POST payload                       v Build Step  
\+-----------+-----------+         \+--------------+---------------+  
| Client Browser App    |\<--------| SSG / Prerender Pipeline     |  
| (React 18 \+ Vite)     | HTML    | (vite-plugin-prerender)      |  
\+-----------------------+         \+------------------------------+

### **1.1 Content Compilation Lifecycle (Build-Time SSG)**

1. Vite build process scans /content/projects/\*.mdx.  
2. Frontmatter parsed via gray-matter / MDX compiler and validated synchronously against the Zod ProjectFrontmatterSchema.  
3. Valid posts are stored in a typed content array and passed into dynamic route resolvers (/projects/:slug).  
4. vite-plugin-prerender launches a headless Chrome instance during npm run build, crawls client routes (/, /about, /projects, /projects/\*), and renders static pre-computed .html files containing SEO metadata and JSON-LD structured data into /dist.

### **1.2 Theme State Lifecycle**

1. Inline \<script\> in index.html executes synchronously before layout mount to detect stored portfolio-theme in localStorage or prefers-color-scheme.  
2. Adds .dark or removes .dark from document.documentElement to eradicate Flash of Unstyled Content (FOUC).  
3. ThemeProvider context initializes state, subscribing to window.matchMedia('(prefers-color-scheme: dark)') for dynamic OS-level theme updates unless overridden by explicit user selection.

### **1.3 Contact Submission Lifecycle**

1. User inputs text into ContactForm component (/about or contact section).  
2. react-hook-form executes client-side Zod validation on field blur / submission.  
3. On valid input, useContactForm hook dispatches an HTTPS POST payload to https://api.web3forms.com/submit using fetch with an explicit AbortController (8-second timeout).  
4. UI transitions state to submitting ![][image1] success or error banner, preserving form field values if an API failure occurs.

## **2\. Directory Layout Architecture**

/  
├── .github/  
│   └── workflows/  
│       └── deploy.yml              \# Cloudflare Pages / GitHub CI workflow  
├── content/  
│   └── projects/                   \# Git-backed project MDX files  
│       ├── swiss-grid-design.mdx  
│       ├── real-time-telemetry.mdx  
│       └── spec-driven-engine.mdx  
├── public/  
│   ├── favicon.ico  
│   ├── og-image.png                \# Default OpenGraph preview image  
│   └── robots.txt  
├── src/  
│   ├── components/                 \# Atomic Swiss Typographic UI  
│   │   ├── layout/  
│   │   │   ├── Header.tsx          \# Nav header with monospace links & theme toggle  
│   │   │   ├── Footer.tsx          \# Monochromatic footer with UTC clock & links  
│   │   │   └── Layout.tsx          \# Grid container & frame layout wrapper  
│   │   ├── ui/  
│   │   │   ├── Button.tsx          \# High-contrast border button component  
│   │   │   ├── ProjectCard.tsx     \# Swiss grid project post card  
│   │   │   ├── Badge.tsx           \# Monospace tech stack badge  
│   │   │   ├── ThemeToggle.tsx     \# Accessible theme mode toggle button  
│   │   │   └── Input.tsx           \# High-contrast form input & textarea fields  
│   │   ├── forms/  
│   │   │   └── ContactForm.tsx     \# Zod-validated Web3Forms contact form  
│   │   └── seo/  
│   │       └── SEOHead.tsx         \# Helmet meta tags, OG, and JSON-LD injectors  
│   ├── content/  
│   │   └── loader.ts               \# MDX content import & Zod validation module  
│   ├── context/  
│   │   └── ThemeContext.tsx        \# React Theme Provider & switch context  
│   ├── hooks/  
│   │   ├── useTheme.ts             \# Theme state consumption hook  
│   │   └── useContactForm.ts       \# Web3Forms submission logic hook  
│   ├── pages/  
│   │   ├── Home.tsx                \# Homepage hero & featured projects grid  
│   │   ├── Projects.tsx            \# Project listing page with tag filter  
│   │   ├── ProjectDetail.tsx       \# MDX article rendering page with dynamic slug  
│   │   ├── About.tsx               \# Biography, experience timeline & contact form  
│   │   └── NotFound.tsx            \# Custom Swiss-style 404 page  
│   ├── styles/  
│   │   └── globals.css             \# Tailwind CSS import & Swiss grid utilities  
│   ├── types/  
│   │   ├── project.ts              \# Project frontmatter & content type specs  
│   │   ├── contact.ts              \# Contact form payload & API response types  
│   │   └── theme.ts                \# Theme mode union types  
│   ├── utils/  
│   │   ├── cn.ts                   \# Tailwind class merge utility (clsx \+ tailwind-merge)  
│   │   └── date.ts                 \# ISO date formatting utilities (Intl.DateTimeFormat)  
│   ├── App.tsx                     \# React Router definition & routes structure  
│   ├── main.tsx                    \# React client entry point  
│   └── vite-env.d.ts               \# Environment variable typings  
├── tests/                          \# Vitest test suite  
│   ├── components/  
│   │   ├── ContactForm.test.tsx  
│   │   └── ThemeToggle.test.tsx  
│   ├── content/  
│   │   └── loader.test.ts  
│   └── setup.ts                    \# Testing library setup & jsdom polyfills  
├── index.html                      \# Core HTML root template with FOUC theme script  
├── package.json  
├── postcss.config.js  
├── tailwind.config.js              \# Custom Swiss color palette & typography plugin  
├── tsconfig.json                   \# Strict TypeScript compiler options  
└── vite.config.ts                  \# Vite build, MDX rollup plugin & SSG prerender setup

## **3\. Data Models & Type Contracts**

### **3.1 Project Frontmatter Schema (src/types/project.ts)**

import { z } from 'zod';

export const ProjectFrontmatterSchema \= z.object({  
  title: z.string().min(3, 'Title must be at least 3 characters long'),  
  description: z.string().min(10, 'Description must be at least 10 characters long'),  
  date: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, 'Date must be formatted as YYYY-MM-DD'),  
  tags: z.array(z.string()).min(1, 'At least one tag is required'),  
  featured: z.boolean().default(false),  
  coverImage: z.string().default('/og-image.png'),  
  githubUrl: z.string().url('Invalid GitHub URL').optional(),  
  liveUrl: z.string().url('Invalid Live URL').optional(),  
});

export type ProjectFrontmatter \= z.infer\<typeof ProjectFrontmatterSchema\>;

export interface ProjectPost {  
  slug: string;  
  frontmatter: ProjectFrontmatter;  
  content: string; // Compiled MDX React component module  
}

### **3.2 Contact Payload & Web3Forms Schema (src/types/contact.ts)**

import { z } from 'zod';

export const ContactFormSchema \= z.object({  
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),  
  email: z.string().trim().email('Please enter a valid email address'),  
  subject: z.string().trim().min(5, 'Subject must be at least 5 characters'),  
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),  
});

export type ContactFormInput \= z.infer\<typeof ContactFormSchema\>;

export interface Web3FormsPayload extends ContactFormInput {  
  access\_key: string;  
  botcheck: boolean; // Honeypot spam protection  
}

export interface Web3FormsResponse {  
  success: boolean;  
  message: string;  
  data?: Record\<string, unknown\>;  
}

### **3.3 Theme Context Contract (src/types/theme.ts)**

export type ThemeMode \= 'light' | 'dark' | 'system';

export interface ThemeContextType {  
  theme: ThemeMode;  
  resolvedTheme: 'light' | 'dark';  
  setTheme: (theme: ThemeMode) \=\> void;  
}

### **3.4 SEO Metadata Contract (src/components/seo/SEOHead.tsx)**

export interface SEOProps {  
  title: string;  
  description: string;  
  canonicalUrl?: string;  
  ogImage?: string;  
  type?: 'website' | 'article';  
  publishDate?: string;  
  tags?: string\[\];  
}

## **4\. API Interfaces & Data Contracts**

### **4.1 Web3Forms HTTP API Integration**

* **Endpoint**: POST https://api.web3forms.com/submit  
* **Headers**: Content-Type: application/json, Accept: application/json  
* **Request Payload**:

{  
  "access\_key": "VITE\_WEB3FORMS\_ACCESS\_KEY\_ENV\_VALUE",  
  "name": "Jane Doe",  
  "email": "jane@example.com",  
  "subject": "Project Inquiry",  
  "message": "Hello, I would like to discuss a project collaboration.",  
  "botcheck": false  
}

* **Success Response Schema (![][image2])**:

{  
  "success": true,  
  "message": "Form submitted successfully",  
  "data": {  
    "id": "sub\_123456789"  
  }  
}

* **Error Response Schema (![][image3])**:

{  
  "success": false,  
  "message": "Invalid access key provided"  
}

### **4.2 Local Content Engine Contract (src/content/loader.ts)**

import { ProjectPost, ProjectFrontmatterSchema } from '../types/project';

export async function getAllProjects(): Promise\<ProjectPost\[\]\> {  
  // Uses Vite's import.meta.glob to synchronously or dynamically load all project MDX files  
  const modules \= import.meta.glob\<{ default: React.ComponentType; frontmatter: unknown }\>(  
    '/content/projects/\*.mdx',  
    { eager: true }  
  );

  const posts: ProjectPost\[\] \= \[\];

  for (const path in modules) {  
    const slug \= path.split('/').pop()?.replace('.mdx', '') || '';  
    const rawModule \= modules\[path\];  
      
    // Validate frontmatter at build/runtime  
    const parseResult \= ProjectFrontmatterSchema.safeParse(rawModule.frontmatter);  
    if (\!parseResult.success) {  
      console.error(\`Invalid frontmatter in ${path}:\`, parseResult.error.format());  
      continue; // Skip malformed project post  
    }

    posts.push({  
      slug,  
      frontmatter: parseResult.data,  
      content: rawModule.default as unknown as string,  
    });  
  }

  // Return posts sorted descending by publication date  
  return posts.sort(  
    (a, b) \=\> new Date(b.frontmatter.date).getTime() \- new Date(a.frontmatter.date).getTime()  
  );  
}

## **5\. Tailored Swiss Style Configuration (tailwind.config.js)**

/\*\* @type {import('tailwindcss').Config} \*/  
export default {  
  content: \['./index.html', './src/\*\*/\*.{js,ts,jsx,tsx}', './content/\*\*/\*.mdx'\],  
  darkMode: 'class',  
  theme: {  
    extend: {  
      colors: {  
        swiss: {  
          black: '\#0A0A0A',  
          white: '\#FAFAFA',  
          gray: {  
            100: '\#F5F5F5',  
            200: '\#E5E5E5',  
            300: '\#D4D4D4',  
            800: '\#262626',  
            900: '\#171717',  
          },  
          accent: '\#FF3300', // Classic Swiss International Red accent tag  
        },  
      },  
      fontFamily: {  
        sans: \['Inter', 'system-ui', 'sans-serif'\],  
        mono: \['JetBrains Mono', 'Menlo', 'monospace'\],  
      },  
      borderWidth: {  
        1: '1px',  
      },  
    },  
  },  
  plugins: \[require('@tailwindcss/typography')\],  
};

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAcklEQVR4XmNgGAWjYOCBvLz8XnQxigHQ0H/oYhQDOTk5GyAuQxenGABde05BQcEcXRwOZGVlTcjBQENvAQ3fh24eRQBo4F8gxYguTjYAGvgfXYwiAPT2BBUVFXZ0cYoA0JW/0cUoBkCXGqCLjYJRQEMAAMSsFY9fiDqtAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAZCAYAAACIA4ibAAADAklEQVR4Xu1XO2uUQRTdJKJEUWJhFtbd/fYFC9uoiFgoWOgvULSw1UIrGx+VolgqSIim8QWKFiJoIQhGEARFxSKK+Ci08YGoiPgmhsRzd+/A3bMzH8uKIDIHLt8355y59858w2STyURERPwPyOfzg6VSaX+SJIeLxeJy1v86UHQ1in9AzCDugOpnjwDaXsRnxHfEFtYFWEwN+e5qruusp6Fer8/HnF+IZ4hljUZjNp47JRdy7ma/6dnFNOK9sQyQPmM0P2AaRYyZsSxWGqiQ7zFi3IwfIW5ZD77qGlsU46VdNQFUKpWiNj3KmkC1+8wLVPPWQQ8XoF1iPghJhEkrmbMFarXaAl9BnTtE4+3kmUxapy4VXJOBD7RRdDzXshaaC+4Y4hTzQWSz2Xm+ZMzhfYI9yovvhLxXq9VhGcvTerBB13xzLWQTNdcu1iy4rzQe4+PYvCOW6wqYeBATVxHXVoDHPh459vk84E/7eAuXR+4M1ixMvbY7jvvD+zls8gHr+SNogWkadyzK8lj45YBHjm0HbxHKz4BnSnyotYP4jj4QV62nZ2BnH0rCXC4313Ghhi2PeTd9HvAjwuOvz2LWHEL5Gc7HX9/xiHHEVjdOq9kV5HKVRLhEF1k+1LDl8Twf8BxVfhZrDiZP0CNwPpyCTT4esUHGWMeQydkbUGShJMBmzGEtlNzyoTsE3EkfbwH9uebazJpFN30Y7ozyVyzfLfo9Cc+a9y+sKy8Fn8i7XMwy7uWvTKFQWKG5XrDmUC6Xl6jnB2vKd9RwPPLnWEtFYi5QHydHNFSwaH5aawPryfMV8dFyPsDzVGsMsCZIWr9g5V4Y9GjNhTOPTcyGtCCS1g+n5iQO8sllts2MD7FHT8OUofp0XslwQcD7TnO23SXgbggvp8TyimYN7sXBaYgJ1jogt7CZwNF2NOXLCI+13cPzAeIn6D7rEaj2DXFR/DhB69iTBvj3aH05Ebf1/XXG8/9V0jp9bxAvNd4iJo0uOYR7pb5PCZ3giIiIiIiIiIh/Ab8ByHhksVdMfhIAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAZCAYAAAAG2cHnAAAFM0lEQVR4Xu1YWYhcVRDtBEVU3JeBnpm+PYuM/khwXHDBBYN/EuL6IeKHKPohjiB+iBHxNwE1GCQyUYgYERUUghGjEgyKRhE3NKC4JYoxKqiZKNFMPKenblt9+t7Xy880+A4U79WpulX17vLufa9SKVGiRIk2jI+PH6fcYmNycvII5UpkUKvV7gghnKH8YgM17VFu4DE2Noa6wyHlCfCrIL9D9kNuVjsxMjIyiQF5lzEgr6k9h1zOCNjXQj5RvlqtHgX+U8v3JXKPqw8xOjp6Duy7zW+V2nOA7y+iH6jX6zPopyE865HItxzcN96HGBoaOhp+r1q+90AtUR+CtYQOfdozLGlbh4L7DLLV6ey4t7wPir7Et4W+LBUrgaWhYMBtoFhXyyBC54xrrhTGML814ve0rwP3s5C93icFDNCtkIs8Z/FVLvM+GNxh8hxk6sPDwydZ/qXeL3TRpz3DZs6cJWwC+8KxyhHk0OZ40W8XnwOQdzyngH3j1NTUMcpHwD7P2KF9EJnvLuV8rdhna8atTPhd7TmFj+M55HwA11lcr1c7AdscbM8K9z7kr6h326c9AbNlBI1fQpCfNTj0D5Uznh0xy/uJiYlTqfPqfeIrxXOKIjtsa+xVyFxtg6htoT9HLk4m3K+jjhhV8WPb3zynQIwdymm+FOiDFXydcPf6tqGLPu0ZMWBIDyID5xI2eBR9f8oH/JMpPoKdi856RHmCJ0O03cl7y9UyiGi3IrESt9EXea80/WvqOrt97Smg/WPIf4ryRW0I7JUXW/6W1zDy30Qer9gTqefy5/iOQKMXsIJG7b7fQXwx49NYCcpH4OE+Vi4C7f5298zVdrBRaK1xEmVWYraunM3abYV8D3mZOg850Y7nmTGfs3w71HEtedjPo57Ln+MLYZvuG1EPfQ4iinsz5cNVRp6bvdoI2OaVI8Dfh7aXOp25CgfRdVRzr4qHCshV3tfXruBqgW2D8gTb8AQfdeS8x8fB/YPmc2bkjF9pOW8wPZk/xxdCG4Q+BxHXTRmfR40/TG140CtC+ljN0+q3nrBcRYO4hD7o1FvUAH6zrw0+3/naFeDfrmQ+CVKwWK/znida6phIy7wP+Gusvstdm7b8OT4LJFoPOd1zoc9BzO2J4DakeAL8PuUI8HMJjrmyg2j2lqO+B55zBew7IZsrC5OkWbsixxPT09OHK+djxT0Rcr73Qf/cSD6+kXL5c3wWcN4C2S7SCGL3jVMSrn+kApvf57xHkRdS7+V0Cv4n5QhXi9bFz5/tzCX++9E5p0Ud+99ESK/wJizepgR/AeLfqTwRbELytCw8YzX2bzuMdXM67dinfcOCtARnQcoRVuy010P73rMP8qvnjL9bO6MIFrttJYL7SicOuHX+ZGltt0Sdr7rU8xCpWiNg2wg5WHGvWn7fWvzHnR/1tVE3rnEIinq3fdoXrIBkcDz8bU5frX626v5xVGOfAl93XAPathOsrt2ew8O+EutV8X7GPeX0eZT0sPeJCMXfjnwN/+mJYJ8wwrWsOuNYg07wjn3aE9D4A8iPkF0mvOc/vwb4C8mS7sD1o7Dw96Ft8zcbX3vP0x8dvVx9KgudsU3JFCzWD1YT/33urf33DXgoJz4Gal5v/Be81uXbMoKHkro7EaeAt8fZFmuPXXepDwH+GchBuzLnjPp026cDCRT7BH87Kb/YCJnPnRIJcPYpNwjgilCuRAJ4ZZ0AeUj5xQYm1upqtXqy8iUSCPZRPGgY1LfDQCLICW1QgI/0c5UrUaJEiRL/G/wL2pJOfqvBBpkAAAAASUVORK5CYII=>