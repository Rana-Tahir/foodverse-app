<!--
SYNC IMPACT REPORT
==================
Version change: 1.2.0 → 1.2.1
Modified principles: N/A
Added sections:
  - XII. Mobile-First and Responsive Design (with Responsive Verification Targets subsection)
Removed sections: N/A
Templates requiring updates:
  ✅ .specify/memory/constitution.md (this file)
  ⚠ .specify/templates/spec-template.md (review for alignment)
  ⚠ .specify/templates/plan-template.md (review for alignment)
  ⚠ .specify/templates/tasks-template.md (review for alignment)
Deferred TODOs: None
-->

# Foodverse Constitution

## I. Product Vision

Build Foodverse, a modern, responsive food delivery platform inspired by Foodpanda. The application MUST provide a simple, fast, and intuitive experience for customers, restaurant owners, delivery riders, and administrators.

## II. UI/UX Principles

- Designs MUST follow a clean, minimal, modern, and mobile-first approach.
- Typography, spacing, colors, and components MUST be consistent and reusable.
- Layouts MUST be responsive for mobile, tablet, and desktop.
- Interfaces MUST include loading, empty, success, and error states for all important interactions.
- Unnecessary animations, visual clutter, excessive gradients, and decorative elements are prohibited.
- Accessibility and intuitive navigation MUST be prioritized.
- Original Foodverse branding MUST be used; copying proprietary Foodpanda assets is prohibited.

## III. Free-Tier Technology and Deployment

- Free and open-source technologies MUST be used wherever practical.
- Frontend and application deployment MUST use Vercel's free tier (Hobby plan), subject to its current usage limits and eligibility requirements.
- Supabase's free tier MUST be used with PostgreSQL as the primary database and authentication provider.
- Supabase Storage MUST be used for food and restaurant images within available free-tier limits.
- The application stack MUST use Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
- GitHub MUST be used for version control; the repository MUST be connected to Vercel for deployment and CI.
- Environment variables MUST be stored securely in local environment files and Vercel project settings. Secrets MUST NOT be committed to Git.
- Paid services, paid APIs, or paid infrastructure MUST NOT be introduced without explicit approval.
- Free-tier quotas, inactivity policies, bandwidth, storage, database limits, and deployment restrictions MUST be checked before relying on a service.
- Local development and sample-data options MUST be provided if a free service reaches its limits.
- Deployment configuration, environment variables, database migrations, and troubleshooting steps MUST be documented in `README.md`.

## IV. Spec-Driven Development

- The workflow MUST follow: Constitution → Specification → Clarification → Plan → Tasks → Analysis → Implementation → Verification.
- No feature MUST be implemented before its specification, plan, and tasks have been reviewed and approved.
- Implementation MUST work in small, testable increments.
- Completion MUST NOT be claimed until acceptance criteria and relevant tests pass.
- Requirements, design decisions, implementation plans, and task history MUST be kept in version control.
- Unrelated changes and unnecessary complexity are prohibited.

## V. Architecture and Code Quality

- TypeScript with strict type checking MUST be used throughout.
- Modular architecture, separation of concerns, and reusable components MUST be followed.
- Business logic MUST be kept separate from UI components.
- Naming MUST be clear, formatting consistent, and code maintainable.
- User input MUST be validated and errors handled gracefully.
- Duplicated logic, unnecessary dependencies, and premature optimization are prohibited.
- Setup instructions, environment variables, database migrations, and deployment steps MUST be documented.

## VI. Core Product Features

The following features constitute the MVP scope:

- Customer registration, authentication, and profile management.
- Restaurant discovery, search, categories, menus, and food details.
- Shopping cart, delivery addresses, checkout, and order history.
- Restaurant dashboard for menu and order management.
- Rider dashboard for assigned deliveries and status updates.
- Admin dashboard for managing users, restaurants, riders, and orders.
- Order status tracking and basic notifications.
- Cash on delivery for the initial release.
- Responsive interfaces for all user roles.

## VII. Security and Data Integrity

- Role-based authorization MUST be enforced for customers, restaurant owners, riders, and administrators.
- Database access policies and server-side permission checks MUST be applied.
- Secret keys, service-role credentials, and private environment variables MUST NOT be exposed to the browser.
- Prices, fees, and order totals MUST be calculated on the trusted server.
- Unauthorized access to orders, addresses, restaurant data, and administrative actions MUST be prevented.
- All important state transitions MUST be validated; invalid or duplicate order submissions MUST be protected against.
- Only necessary personal information MUST be stored and appropriately protected.

## VIII. Testing and Verification

- Core business logic MUST be tested with unit tests.
- Database interactions, permissions, and workflows MUST be tested with integration tests.
- Critical customer journeys MUST be tested with end-to-end tests.
- Responsive layouts, accessibility, error handling, and empty states MUST be verified.
- Linting, type checking, and relevant tests MUST be run before completing any task.
- Regressions MUST be fixed before moving to the next implementation phase.

## IX. Scope and Simplicity

- A functional MVP MUST be built before adding advanced features.
- Reliable ordering, accurate totals, and correct order management MUST be prioritized.
- Online payments, live GPS tracking, AI recommendations, and automated rider dispatch are deferred until separately specified.
- Microservices or unnecessary infrastructure MUST NOT be introduced without a demonstrated need.
- Every feature MUST provide clear user value and fit the approved specification.

## X. Definition of Done

A feature is complete only when ALL of the following are satisfied:

- [ ] Acceptance criteria are satisfied.
- [ ] Implementation follows the approved plan.
- [ ] Relevant tests pass.
- [ ] Authorization and data integrity are verified where applicable.
- [ ] UI is responsive and consistent with design principles.
- [ ] Errors and edge cases are handled.
- [ ] Documentation is updated when necessary.
- [ ] Changes are reviewed and ready for version control.

## XI. Deployment and Production Readiness

- The application MUST be deployable to Vercel using a connected Git repository.
- Separate development and production environments MUST be configured where practical.
- Supabase PostgreSQL MUST be used as the persistent database; in-memory data MUST NOT be relied on for production orders.
- Database migrations and Row Level Security (RLS) policies MUST be applied before enabling production access.
- All required environment variables MUST be configured in Vercel and Supabase.
- Authentication, restaurant listings, cart calculations, checkout, order persistence, and role-based permissions MUST be verified after deployment.
- The production build MUST pass linting, type checking, and relevant automated tests.
- A working deployment URL and clear setup instructions MUST be provided.
- Database credentials and privileged API keys MUST NOT be exposed in client-side code.
- Deployment MUST be treated as complete only after the deployed application has been smoke-tested successfully.
- Only features and resource limits available under the selected free plans MUST be used; approval MUST be obtained before any upgrade or paid integration.

## XII. Mobile-First and Responsive Design

- Every page and user interface MUST follow a mobile-first design approach.
- The application MUST work smoothly on mobile phones, tablets, laptops, and desktop screens.
- Responsive layouts, flexible grids, scalable images, and appropriate breakpoints MUST be used.
- Touch-friendly buttons, inputs, menus, and navigation with comfortable spacing MUST be provided.
- Horizontal scrolling, overlapping elements, clipped text, and broken layouts are prohibited.
- Restaurant cards, food menus, shopping carts, checkout forms, and dashboards MUST adapt to different screen sizes.
- Mobile-friendly navigation (e.g., collapsible menu or bottom navigation) MUST be used where appropriate.
- Text MUST be readable, images optimized, and important actions easy to reach on smaller screens.
- Consistent visual design, accessibility, and usability MUST be maintained across all supported screen sizes.
- Critical user journeys MUST be tested on mobile, tablet, and desktop viewport sizes.
- Responsive UI checks MUST be included in the definition of done for every feature.
- A feature MUST NOT be considered complete until its responsive layout has been verified.

### Responsive Verification Targets

| Viewport | Width Range |
|---|---|
| Small mobile | 320px–375px |
| Standard mobile | 376px–767px |
| Tablet | 768px–1023px |
| Desktop | 1024px and above |

These are testing targets, not rigid layout boundaries. Components MUST adapt naturally to intermediate screen sizes.

## Governance

- This constitution supersedes all other practices and guidelines within the project.
- Amendments require documentation of the change, rationale, and a version bump.
- All implementation work MUST verify compliance with this constitution.
- MAJOR version: backward-incompatible principle removals or redefinitions.
- MINOR version: new principle or section added or materially expanded.
- PATCH version: clarifications, wording fixes, non-semantic refinements.
- Use `CLAUDE.md` for runtime agent development guidance.

**Version**: 1.2.1 | **Ratified**: 2026-10-23 | **Last Amended**: 2026-10-23
