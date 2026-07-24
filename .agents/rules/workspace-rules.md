# Workspace Rules: Portfolio & Project Showcase

This document governs the behavior and context loading behavior of AI agents working in this workspace.

---

## 1. Automatic Context Retrieval
- **Rule:** Before proposing or editing any files, read [ai/session-memory.md](file:///Users/nina/development/projects/portfolio-site/ai/session-memory.md) to understand the current milestone, pending specs, and recent development history.
- **Rule:** Maintain alignment with the specifications found in [project-constitution.md](file:///Users/nina/development/projects/portfolio-site/docs/project-constitution.md), [requirements-specification.md](file:///Users/nina/development/projects/portfolio-site/docs/requirements-specification.md), [technical-blueprint.md](file:///Users/nina/development/projects/portfolio-site/docs/technical-blueprint.md), and [tasks-roadmap.md](file:///Users/nina/development/projects/portfolio-site/docs/tasks-roadmap.md).

---

## 2. Session Close & Housekeeping Trigger
- **Trigger:** Any variation of the user indicating they are closing, disconnecting, or wrapping up the session (e.g., "it is almost time to disconnect", "wrap up", "closing soon").
- **Procedure:**
  1. Compile a session summary of files changed, decisions made, and goals accomplished.
  2. Perform housekeeping (e.g., compile the current git status of modified files).
  3. Append the session details to [ai/session-memory.md](file:///Users/nina/development/projects/portfolio-site/ai/session-memory.md) under the "Session Logs" section.
  4. List the precise next actions for the next session.
