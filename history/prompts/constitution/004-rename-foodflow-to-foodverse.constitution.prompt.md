---
id: 004
title: Rename FoodFlow to Foodverse
stage: constitution
date: 2026-10-23
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: kkt
command: /sp.constitution
labels: ["constitution","amendment","rename","branding","foodverse"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/004-rename-foodflow-to-foodverse.constitution.prompt.md
tests:
  - none
---

## Prompt

Update the existing specification to use Foodverse as the project name everywhere. Replace all occurrences of FoodFlow with Foodverse, including the product overview, branding requirements, documentation, and any examples. Preserve all existing requirements, architecture constraints, free-tier requirements, mobile responsiveness, acceptance criteria, and SDD workflow. Do not implement features or make unrelated changes.

## Response snapshot

Amended constitution from v1.2.0 → v1.2.1 (PATCH — name correction only). Replaced all 3 occurrences of "FoodFlow" with "Foodverse":
1. Document title: "# FoodFlow Constitution" → "# Foodverse Constitution"
2. Section I product vision sentence: "Build FoodFlow..." → "Build Foodverse..."
3. Section II branding line: "Original FoodFlow branding..." → "Original Foodverse branding..."
No requirements, constraints, or structure were changed.

## Outcome

- ✅ Impact: Project name corrected to Foodverse throughout the constitution; no semantic or requirement changes.
- 🧪 Tests: none (constitution document)
- 📁 Files: .specify/memory/constitution.md, history/prompts/constitution/004-rename-foodflow-to-foodverse.constitution.prompt.md
- 🔁 Next prompts: /sp.specify <feature> to begin first feature specification
- 🧠 Reflection: Clean PATCH bump; all 3 name occurrences updated with no unintended side effects.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Begin first feature spec with /sp.specify
