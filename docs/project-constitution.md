# **Project Constitution: Portfolio & Project Showcase**

## **1\. Core Engineering Principles**

### **1.1 Swiss Typographic Design Integrity**

* **Grid Discipline & High Contrast**: All layouts must adhere to a strict CSS grid alignment with monochromatic high contrast (pure dark \#0A0A0A, pure light \#FAFAFA, crisp neutral borders \#262626 / \#E5E5E5).  
* **Anti-"Generic AI" Aesthetics**: Banned elements include arbitrary glowing radial gradients, pastel glassmorphism overlays, generic hero badges, floating AI sparkles, and unstructured card grids. Focus on bold typography, monospace metadata tags, asymmetric alignment, and crisp micro-interactions.  
* **Accessibility Mandate**: Minimum WCAG 2.1 AA compliance across light and dark modes. Color contrast ratio must be ![][image1] for normal text and ![][image2] for large headings.

### **1.2 Performance & Zero-Jank Standards**

* **Prerendered SSG Execution**: All routes (/, /about, /projects, /projects/:slug) must be static HTML files generated at build time using vite-plugin-prerender or Vite SSG. Zero dynamic client-side layout shifts (CLS \< 0.05).  
* **Core Web Vitals Target**:  
  * Largest Contentful Paint (LCP): ![][image3]  
  * First Input Delay (FID) / Interaction to Next Paint (INP): ![][image4]  
  * Cumulative Layout Shift (CLS): ![][image5]  
* **Asset Optimization**: All project imagery must be converted to WebP/AVIF formats with explicit width, height, and loading="lazy" attributes (except hero image which must be loading="eager").

### **1.3 Code Quality & Type Safety**

* **Strict TypeScript**: noImplicitAny, strictNullChecks, and exactOptionalPropertyTypes enabled in tsconfig.json. Explicit types required for all frontmatter props, components, and utility functions.  
* **Zero Unhandled Promises**: All async operations (MDX compilation, Web3Forms submissions) must use explicit try/catch blocks or type-safe result wrappers.

## **2\. Tech Stack Guardrails**

### **2.1 Approved Stack & Package Versions**

* **Core**: react (^18.3.0), react-dom (^18.3.0), vite (^5.4.0)  
* **Routing & SSG**: react-router-dom (^6.26.0), vite-plugin-prerender (^5.0.0) or @shikijs/vite  
* **Styling**: tailwindcss (^3.4.0), @tailwindcss/typography (^0.5.10), clsx (^2.1.0), tailwind-merge (^2.5.0)  
* **Content Engine**: @mdx-js/rollup (^3.0.0), remark-gfm (^4.0.0), gray-matter (^4.0.3), zod (^3.23.0) for schema validation  
* **Icons**: lucide-react (^0.430.0)  
* **Forms**: react-hook-form (^7.53.0), zod (^3.23.0)  
* **Testing**: vitest (^2.0.0), @testing-library/react (^16.0.0), @testing-library/user-event (^14.5.0), jsdom (^24.1.0)

### **2.2 Explicitly Banned Libraries & Anti-Patterns**

* **Banned UI Libraries**: MUI, Ant Design, Bootstrap, Chakra UI, Flowbite (Tailwind utility classes and primitive accessible controls only).  
* **Banned Heavy Script Libraries**: jQuery, Lodash (use native ES2024 methods), Moment.js (use native Intl.DateTimeFormat).  
* **Banned Styles**: Inline style={} attributes (except for dynamic CSS variables like dynamic positioning calculations).

## **3\. Testing & TDD Mandate**

### **3.1 Test-Driven Development (TDD) Workflow**

AI agents MUST follow strict Red-Green-Refactor cycle for all functional units:

1. **Red**: Write a failing unit or integration test defining the expected behavior.  
2. **Green**: Write the minimal code necessary to pass the test.  
3. **Refactor**: Clean up the implementation without breaking tests.

### **3.2 Coverage Targets & Scenarios**

* **Global Coverage Target**: ![][image6] line and branch coverage across components and utility modules.  
* **Mandatory Test Suite Requirement**:  
  * **MDX Content Loader**: Validate schema parsing, fallback handling for missing images, invalid dates, or malformed YAML frontmatter.  
  * **Theme Switcher**: Validate local storage persistence, DOM root class toggle (.dark), and system media query listener (prefers-color-scheme).  
  * **Contact Form**: Validate Zod schema validation errors, network success states, network error handling, and rate-limiting prevention UI.

## **4\. Agent Execution Constraints**

### **4.1 Modularity & File Scope Rules**

* **Atomic Modifications**: An AI agent run MUST NOT modify more than **3 files per single prompt execution**.  
* **Single Component per File**: Every React component must reside in its own dedicated file. No multi-component mega-files.

### **4.2 Git & Commit Conventions**

Commits must strictly conform to Conventional Commits:

* feat(content): New MDX schema or project post  
* feat(ui): New accessible Swiss-style component  
* fix(form): Contact form submission error handling fix  
* test(theme): Add Vitest coverage for theme toggler  
* refactor(ssg): Optimize static generation scripts

### **4.3 Safety Boundaries**

* AI agents must never execute arbitrary script commands that write outside the project root directory.  
* Secret keys (e.g., Web3Forms Access Key) must be loaded exclusively via import.meta.env.VITE\_WEB3FORMS\_ACCESS\_KEY and never hardcoded in source code or specs.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAZCAYAAAB5CNMWAAACZ0lEQVR4Xu2XLW8UURSGCxgEAsFCWHZ39gsITRCtAVJCDRhIQCAIBlCQQOAHoAqipqY/AIMABAZDgkAQKltRVRQQPsOH6KYCQg08p5xJLoeZ3Ts7t6LpfZKTmXvue+6c+87s7uzISCQSiUT+I0mSFeK8zVvQjBHPiXGGWxuNRrvZbM5yfGK1oWD9nVzvt81nQiOnRExct3MhoJlruv5As+jlpGrd+GZ1Zel2uxWu9d69jtX0heIJLZyxc2Vgve+67kCzMHYS3VPiHnG3UqnssJrQDGVWSq1W20/xL+KhnSsKa/T06GUWN+w4ht2x+fWklFkp1Wp1F4ss0/xLO+cDG79E7RU5L2DWRBmzkr/fdYUIYlYKzW9nsbfEEsNtdj4P9CvOuZdZaI4RD1T/iPjhe7PQvpY69BftXD/0WmHMEjqdzm4W7HHnn9m5LNB+5bDFGfuaNU68MzmpnXNzWWDSBd209w0VgpnVarUOstAqjdy3c3mgP42pt0zOy6wsqPsSZDM5lDYLk07IAmx62s4NgrqfGbkyZr2QenraY+dCMLRZ8nnX4qHfuaidM7Gga76SsdW7ZDWe1st3p5sPRdY1+8ITdFMK6vX6WTtXlna7fUAb+ufJ0h+OG25OdY9NbtV3M+hu29wgCplF01PJED+5vqQvuxyvuvm0SfKjTm5R9M54r2jo8XKaywPdsq5Z6FNRyKz1RDfwifhAfJRxOocB5xjPu3qB3JJuYO2Jkr9AVpMFL9OH0b+x+TzQ9ojP2puEnK+9REdCwB3Zh6NnfIKn4ait31TI3xpMOOITGHbI1kcikUgksqH5A3PR0llzJDKCAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAZCAYAAACPQVaOAAAB/0lEQVR4Xu2WzytEURTHR4SVlSzG/GxGmKxYUCQbNkq2LKyslFIWFjZWFvwB1iwsLCgrGxv+BckKJcaPjBERyfjeOrdu3xnz3n1eSu6nTvPe95x77jn33nnvRSIOh8MhpFKprWQyWYK9JRKJBfaHCebqwDw3rJeBQoalqBn2BUXly2azTeY97N2M+SnpdHoEOe8kt7JbjvkWNN0vg1bZZwOKGJQ8+1rD9YPS4Gs3Y8PCullNLBZrw8A32Cb7fFInk69oAdcvSjN3O0wCN6uJRqPNakfwfzhgny1STIn1SuCE9bDmxY+b1aDZRiQ6gx3jtpb9HqhdPoJ94rqGnQwanZLCT9hXjdCaVWQymRYkK6KYPfZ9B+InEb+G3xss2C77K5HL5epV4YgfZ181pNk71q1QDxQkecfk6+yzATmuVUERH7sbBGn2nnVf6CcqdmaZfUFArnkpKM++MJDcBdargh2ckIGB37kYuwH7MDUs2oDk9fWQskVyF1mvCIqZVQPi8fgY+2zRTWHhhgxtWvQrI7QiiFlkzQvJ/ch6GShqCYHdrAcFuXZgh6Q9q4Lwnm0wdQa1zEnh3p9+BjLmlfVfARNvSwHnuhCvRjWIPYV1ss7gFHYhrgC7hF2I5WFPHPs/wedhK1Zj1I/hmPXx+D+F+ixEE71+LOnjeDkcDofDki/f5p+bWBd7qgAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAZCAYAAABkdu2NAAAB8UlEQVR4Xu2UzUrDUBCFW+1CUUSQ2EXaJG0K/jyAS19ApAsRdK2C4mv4Cor4FrrVvaJCQVHc1b8iIggqSq1CPVMTGadJbBJFlPvBIblnZm7u5OYmkVAoFP+dlGmaNWkGkc/nDdScQnXosFAo9MicXwcLO3EW2JCM+4HcCWibjctUb1lWkef9GHjYmPSCQP59yAbrhmFMSi/MHJHAA9agF7zJQRkLIkqDMh/jG8cf4v63gEm3oDvbtvtlrBXCNogXuABNcQ/1zzQHP4vImYYO4G/mcrlR3O/ymq+gH8MxdJbJZDplMAxhG/TC2b2POXC/A82y8Qp07Y59oTdEidA+hm0yHoW4DaJ2meqxSwPM+zR2PP8GsUs6Eh6xzRsyFpc4Deq63uc0M8J9Wiv5UIk+VR7zhH4cSH7F32tVxuISo8Ek1eHsZ2WAQOzBabIhrH1c5jTBdnJdxqIStUGqSafTXWw8k81mbbrHUdJcH2u1EKuFeoamad0oqDh/pqSMhyGoQczfgdii9OFVcUkJ74jdN83n5bVCOwpLUJkWI4OtgNonv4eTT8LnNex6uD93fSlRt+SOsbZeHo8EfbaY5JYOvox5Yb6fkSvowlGF6t3PjMCcRXh7oq7RjJdYThW18yx2mRA7Hhm84TnpKRQKhULxR3kDvxOv+ODKJd0AAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAZCAYAAACIA4ibAAAC60lEQVR4Xu2WTYiNYRTH73zkIyIf19Tc697bnbuYxsaesqAoWfhYCTsLHylFsTAkZSlCGmTFQhZmFhaalRBSGjFKNDEmHzVjJiYyU/yOOQ9nTu/cd4ZbBu+/Ts89//PxnPO8533em0olSJAgwSREPp/vz+Vym5E5xWJxNusGuPfeL5vNlrDdxfYVaff2fwba4CjJZDJZ61MoFJYJb/TFVv8rQMGrPRcFaYwnf5T1NOtybxeID4ewzXFfkDuWm5SgyBZkiAYavS0KcU+6oaFhgfjIannyX4+L/aOguHZkwBceh7immJrmKB/4C4Gvr6+fLxMEdyxMEutK7BfhFoUY9LXwl+F2Bc6gGvs5pBs5guzxDuNBLYGdyAsuveneOB5IUxT5lPUxchsZhq4Ndoq/GnUgcKcCj0+R32dFR1rQXwovB6XcXmSorq5uRmqkceH6Tboat4fXy6NUKs0i4C1yH7Xa2ycC2Zh8U41+zRbDYd2IKg7+uPA8iEzgtNFRvugDwjU1NU0JHLH7rR+/d/g4fFqtHgnZnMBBnNu8rVIgd6M2dkB01ku+WOVPKv9jmjSuy7gJJw/ON7vbcvQ1V2NFTvD5z1n/MaHFDjOSZ7ztN1Dj9DDST0QZ6w6BO+95jet03KsIv52eY59NGh/EvlLlYSYlfqzKgBzPZHPyTAtcOp2eqQXdFJ1Cl4juL+tCxFdGcz10nFyS3m+75ewrq/bDmuuQ5WOhxfcQeA+1ytvjIJefHKzlyLVKD2Rj4FRfZ/3QPyJ9jhO/R46LmpBRdwZ1HGTffc6nQw7dchOB3MoPkC77tOPAU19IzHPLoX9GPllOp0G+PgFV0hB8wXDhQLod1x9xIN8nIKWvq0xChM8bDmqF5X4JJG8lWR9/v+d5WxTYdIs20qPrLe8jgO9ABpEr4meL5fea/MjlKa+HTESvxvSqLvw7/JayfsiP7CXca+pt0wNZLz6SWwTfrT93rwAqnjBBggQJEiRI8L/iG7SzClNTyZPBAAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAZCAYAAABggz2wAAACP0lEQVR4Xu2WPUhcQRDH76IhKiIJ8QTvznv3RQhWgevEytZCsEhjGYSAICGFEtDKMqlSSEgkvVhpGzu1uQT8QLQMokIOJKCiEaOY/+gsDOOu+t4dadwfDOf+/7OzO+9jn7GYx+O5twRBMI44QBwjXmn/JpA/g7hAbCSTySbtS5BT0dp/gzaI+CbG64glmWOjVCo9pAbz+XyGpTpuuF3mYbzC+mVIryagaK/WNMViscW2OGnZbPax1iXIWUDsKO2DrR6BenMuLxIo9hnxF4Wfa09jrrZFp6s/pXUJ50wqrctWj6hZoygyj9gvFApt2nPBm722uEsXmMd0TIq5XC5gvV/qRLWN1gdX79hWOp1u1OZtuBpy6QZs+gXnvJU6XoUE6ZlMZlTqRKRG+d2qIH5g+ED7d8XVkEs3wOvhhoaljvETnvtF6kSoRnHXUkg+oknai4KrIZduwEn7jHzs443U8Xlp5bkTUidCNUoHDJLPcOU+aS8KroZcuiDOjb6TIs6HDp47IHUiVKMGcWdntRcG1Di0Lc6b3dS6hHOsp26gvqVEpEYNiUSiGZN3UaSMYVz7t4En46VtcdLglcwY9RugDamcc+hrUsOcEVs9oqpGBXTcLyN+0qa0eRO0OOa8FuP3ekN8l6j5TqPh725H3kepGaAvko+D9JH2IkGPMwr+TqVST7Vngz5L3GwZv6uIk5h6OuD1Qf8uNcLcQfjT+D1FfNU50P4gfiF2ENuIXcReEPJ/aifYxKDWPB6Px+O5p/wDzC/JYD6PeEgAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAZCAYAAACPQVaOAAAC/klEQVR4Xu2WW4hNYRTHZ5gklxTG0Zwzs8+FTnNEKA0RcsmDktzKo/JCeVTKJQ/Di1KKJ0nEPKnxRiI1SaSm5BYpDx4QGTTzYBrGb835vmlZs2fO3scJU/tfq/Ot/7p8a323ferqEiT4p2hpaSml0+mM5TWy2excy407BEHwCWlHTiPPrF0An0MGLf/XwEoflwKQH8gRaxdkMpl57NpD53fb2uG2S7zSPyL95O5CNiFb0Xsknp2fpWNDwWQb3WT7ra1akOsOsk7ph5Gv2odC18i8Sl+sdQH6e+SR0g8Wi8XpMm5qaprCTwP1L4DvGA6KAoJWuqZPWVtMTCDHB0tKbnYyrXUa3Gd8+pEH2ge563X811Lneq97H63HAgXNJ8H32Kvl4I7WiAJcc1kZFwqFOaLLr/bBfEvHMr4RqHvK+AQ+k5XeHen4VgLHZDbJekjeZW1jIZVKTXU7Mtjc3FwQTl5T3QT6sbAFgb+oeeZuM83bY3/V6zWBrCRJ3yDPUSdaexjw7fQNI91Ir7bT1PWwZuHOWZ75zwTlR+hbLpdbpHxHxNcE7th9ocib1jYa8H+qGpb7utDb5LSEFesa++1uhwGfJ/jM9Lo7EXLfl2i/WGAli5KEIi5Z21ggpo8CdsqY2Fe+4cbGxmnO3hHWLNxZxzdYmwdXYxk+l73O+B1zHHLjt/zUDztHAU2ulkkp+KS1VQJxV5B7miPPKtfw0GMz2p2FuxDGaxh7vfVH79T6qGCFdruiqv7mSrx/mAx/1BfmP3OVXmMLbC/y+fwMpa+w/uh9Wh8BJj/gitxibXEheci3I4Tfi7xWuizqNuPTi3zWnIdr7LzhWmM1my3/rVtq+WpBo7tsAQLhSqXSJK+7XRxQLkNHEj6ruGFg+2k5gZ0riHqMawXq3SNFBOWdGpCxfLetH/xj2QnkmviwUBusjwDbS/l+W16A7X7grl1QzQP1v4Em2i2nIbsZlP/1jX1C5ZuG0+Yowo4tt/HjCnK8aKItitBwq41PkCBBggR/iF9rE/ZZS3DvsgAAAABJRU5ErkJggg==>