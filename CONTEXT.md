---
type: context-glossary
title: Portfolio & Showcase — Ubiquitous Language Context
description: Core domain terminology and glossary for the Portfolio & Project Showcase application, ensuring unified definitions across layouts, components, and schemas.
tags: [domain-modeling, glossary, ubiquitous-language]
timestamp: 2026-07-24T15:20:00+08:00
---

# Portfolio Site Context

This document defines the canonical domain vocabulary for the Portfolio & Project Showcase application. These terms must be used consistently in conversations, file naming conventions, components, schemas, and markdown files.

---

## Core Domain Language

**Project Post**:
A Git-backed file (`.mdx`) located in `content/projects/` containing YAML frontmatter metadata and structured Markdown body content describing a showcase item.
*_Avoid_*: project page, case card, work item

**Frontmatter**:
Structured YAML metadata at the header of an MDX file containing validated fields: title, description, date, tags, featured, coverImage, githubUrl, and liveUrl.
*_Avoid_*: header metadata, config header, page yaml

**Swiss Grid System**:
A design layout system using sharp monochromatic borders (`#262626` / `#E5E5E5`), stark dark/light contrast (`#0A0A0A` / `#FAFAFA`), uppercase monospace metadata tags, and strict flex/grid alignment.
*_Avoid_*: generic theme, standard design, custom styling

**Prerender Pipeline**:
The build-time process using `vite-plugin-prerender` that converts dynamic client-side React routes into static pre-rendered HTML files for instant loading and 100% SEO indexability.
*_Avoid_*: SSR setup, HTML exporter, build generator

**Theme Mode**:
The active color scheme state, which can be explicitly set to dark, light, or derived from system via media queries.
*_Avoid_*: color scheme, page style, design mode

**Contact Payload**:
Validated client-side data (name, email, subject, message) dispatched via HTTPS POST to the Web3Forms endpoint.
*_Avoid_*: message object, submission form, query data
