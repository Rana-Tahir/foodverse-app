---
id: 001
title: FoodFlow Project Constitution
stage: constitution
date: 2026-10-23
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: kkt
command: /sp.constitution
labels: ["constitution","foodflow","spec-driven-development","setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/001-foodflow-project-constitution.constitution.prompt.md
tests:
  - none
---

## Prompt

/sp.constitution

# FoodFlow Project Constitution

## 1. Product Vision
Build FoodFlow, a modern, responsive food delivery platform inspired by Foodpanda. The application must provide a simple, fast, and intuitive experience for customers, restaurant owners, delivery riders, and administrators.

## 2. UI/UX Principles
- Follow a clean, minimal, modern, and mobile-first design.
- Use consistent typography, spacing, colors, and reusable components.
- Prioritize readability, accessibility, and intuitive navigation.
- Use clear food cards, simple forms, recognizable icons, and visible order statuses.
- Avoid unnecessary animations, visual clutter, excessive gradients, and decorative elements.
- Ensure responsive layouts for mobile, tablet, and desktop.
- Include loading, empty, success, and error states for important interactions.
- Use original FoodFlow branding rather than copying proprietary Foodpanda assets.

## 3. Free-Tier First
- Prefer free and open-source technologies and services.
- Use free-tier hosting, database, authentication, and storage services where suitable.
- Recommended stack: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Git, and Claude Code.
- Avoid paid APIs, subscriptions, and infrastructure unless explicitly approved.
- Check free-tier quotas, storage limits, rate limits, and service restrictions before integration.
- Use local development, sample data, and mock integrations when external services are unavailable.
- Never assume that a free tier provides unlimited usage or production-grade availability.

## 4. Spec-Driven Development
- Follow the workflow: Constitution → Specification → Clarification → Plan → Tasks → Analysis → Implementation → Verification.
- Do not implement a feature before its specification, plan, and tasks have been reviewed.
- Use Claude Code to implement approved specifications and generate tests.
- Keep requirements, design decisions, implementation plans, and task history in version control.
- Work in small, testable increments.
- Do not claim completion until acceptance criteria and relevant tests pass.
- Avoid unrelated changes and unnecessary complexity.

## 5. Architecture and Code Quality
- Use TypeScript with strict type checking.
- Follow modular architecture, separation of concerns, and reusable components.
- Keep business logic separate from UI components.
- Use clear naming, consistent formatting, and maintainable code.
- Validate user input and handle errors gracefully.
- Avoid duplicated logic, unnecessary dependencies, and premature optimization.
- Document setup instructions, environment variables, database migrations, and deployment steps.

## 6. Core Product Features
- Customer registration, authentication, and profile management.
- Restaurant discovery, search, categories, menus, and food details.
- Shopping cart, delivery addresses, checkout, and order history.
- Restaurant dashboard for menu and order management.
- Rider dashboard for assigned deliveries and status updates.
- Admin dashboard for managing users, restaurants, riders, and orders.
- Order status tracking and basic notifications.
- Cash on delivery for the initial release.
- Responsive interfaces for all user roles.

## 7. Security and Data Integrity
- Enforce role-based authorization for customers, restaurant owners, riders, and administrators.
- Apply database access policies and server-side permission checks.
- Never expose secret keys, service-role credentials, or private environment variables to the browser.
- Calculate prices, fees, and order totals on the trusted server.
- Prevent unauthorized access to orders, addresses, restaurant data, and administrative actions.
- Validate all important state transitions and protect against invalid or duplicate order submissions.
- Store only necessary personal information and protect it appropriately.

## 8. Testing and Verification
- Test core business logic with unit tests.
- Test database interactions, permissions, and workflows with integration tests.
- Test critical customer journeys with end-to-end tests.
- Verify responsive layouts, accessibility, error handling, and empty states.
- Run linting, type checking, and relevant tests before completing a task.
- Fix regressions before moving to the next implementation phase.

## 9. Scope and Simplicity
- Build a functional MVP before adding advanced features.
- Prioritize reliable ordering, accurate totals, and correct order management.
- Defer online payments, live GPS tracking, AI recommendations, and automated rider dispatch until separately specified.
- Do not introduce microservices or unnecessary infrastructure without a demonstrated need.
- Every feature must provide clear user value and fit the approved specification.

## 10. Definition of Done
A feature is complete only when:
- Its acceptance criteria are satisfied.
- Its implementation follows the approved plan.
- Relevant tests pass.
- Authorization and data integrity are verified where applicable.
- The UI is responsive and consistent with the design principles.
- Errors and edge cases are handled.
- Documentation is updated when necessary.
- Changes are reviewed and ready for version control.

## Guiding Principle
Build a reliable, secure, and visually polished food delivery platform with the simplest practical architecture, a minimal user interface, free-tier-first infrastructure, and disciplined Spec-Driven Development.

## Response snapshot

Ratified FoodFlow Constitution v1.0.0 at `.specify/memory/constitution.md`. Filled all template placeholders with project-specific content across 10 sections (I–X) covering product vision, UI/UX, free-tier-first, spec-driven development, architecture, core features, security, testing, scope, and definition of done. All principles converted to declarative MUST/MUST NOT language.

## Outcome

- ✅ Impact: Project constitution ratified at v1.0.0; governs all future FoodFlow development.
- 🧪 Tests: none (constitution document, no tests applicable)
- 📁 Files: .specify/memory/constitution.md, history/prompts/constitution/001-foodflow-project-constitution.constitution.prompt.md
- 🔁 Next prompts: /sp.specify <feature> to write the first feature specification
- 🧠 Reflection: Constitution covers all 10 sections from user input cleanly; principles expressed as MUST/MUST NOT for testability.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Begin first feature spec with /sp.specify
