---
id: 003
title: Add Mobile-First Responsive Design Principle
stage: constitution
date: 2026-10-23
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: kkt
command: /sp.constitution
labels: ["constitution","amendment","mobile-first","responsive","breakpoints"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/003-add-mobile-first-responsive-design.constitution.prompt.md
tests:
  - none
---

## Prompt

## 12. Mobile-First and Responsive Design
- Follow a mobile-first design approach for every page and user interface.
- Ensure the application works smoothly on mobile phones, tablets, laptops, and desktop screens.
- Use responsive layouts, flexible grids, scalable images, and appropriate breakpoints.
- Provide touch-friendly buttons, inputs, menus, and navigation with comfortable spacing.
- Prevent horizontal scrolling, overlapping elements, clipped text, and broken layouts.
- Ensure restaurant cards, food menus, shopping carts, checkout forms, and dashboards adapt to different screen sizes.
- Use mobile-friendly navigation, such as a collapsible menu or bottom navigation where appropriate.
- Keep text readable, images optimized, and important actions easy to reach on smaller screens.
- Maintain consistent visual design, accessibility, and usability across all supported screen sizes.
- Test critical user journeys on mobile, tablet, and desktop viewport sizes.
- Include responsive UI checks in the definition of done for every feature.
- Do not consider a feature complete until its responsive layout has been verified.

### Responsive Verification Targets
- Small mobile: 320px–375px
- Standard mobile: 376px–767px
- Tablet: 768px–1023px
- Desktop: 1024px and above

These are testing targets, not rigid layout boundaries. Components must adapt naturally to intermediate screen sizes.

## Response snapshot

Amended constitution from v1.1.0 → v1.2.0. Added new Section XII "Mobile-First and Responsive Design" with 12 MUST/MUST NOT principles covering mobile-first approach, touch-friendliness, layout integrity, component adaptability, and a Responsive Verification Targets table (320px–375px / 376px–767px / 768px–1023px / 1024px+). Responsive verification is now an explicit gate in the definition of done.

## Outcome

- ✅ Impact: Constitution amended to v1.2.0; mobile-first design is now a binding, verifiable principle with concrete breakpoint targets.
- 🧪 Tests: none (constitution document)
- 📁 Files: .specify/memory/constitution.md, history/prompts/constitution/003-add-mobile-first-responsive-design.constitution.prompt.md
- 🔁 Next prompts: /sp.specify <feature> to begin first feature specification
- 🧠 Reflection: Breakpoints expressed as a table for clarity; "testing targets, not rigid boundaries" preserved verbatim to avoid over-constraining component design.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Begin first feature spec with /sp.specify
