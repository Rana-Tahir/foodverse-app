---
id: 002
title: Amend Free-Tier and Deployment Readiness
stage: constitution
date: 2026-10-23
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: kkt
command: /sp.constitution
labels: ["constitution","amendment","deployment","vercel","supabase","free-tier"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/002-amend-free-tier-deployment-readiness.constitution.prompt.md
tests:
  - none
---

## Prompt

## 3. Free-Tier Technology and Deployment
- Use free-tier services and open-source tools wherever practical.
- Frontend and application deployment must use Vercel's free tier (Hobby plan), subject to its current usage limits and eligibility requirements.
- Use Supabase's free tier with PostgreSQL as the primary database and authentication provider.
- Use Supabase Storage for food and restaurant images within available free-tier limits.
- Use Next.js, TypeScript, Tailwind CSS, and shadcn/ui for the application.
- Use GitHub for version control and connect the repository to Vercel for deployment and continuous integration.
- Store environment variables securely in local environment files and Vercel project settings. Never commit secrets to Git.
- Do not introduce paid services, paid APIs, or paid infrastructure without explicit approval.
- Check free-tier quotas, inactivity policies, bandwidth, storage, database limits, and deployment restrictions before relying on a service.
- Provide local development and sample-data options if a free service reaches its limits.
- Document deployment configuration, environment variables, database migrations, and troubleshooting steps in README.md.

## 11. Deployment and Production Readiness
- The application must be deployable to Vercel using a connected Git repository.
- Configure separate development and production environments where practical.
- Use Supabase PostgreSQL as the persistent database; do not rely on in-memory data for production orders.
- Apply database migrations and Row Level Security (RLS) policies before enabling production access.
- Configure all required environment variables in Vercel and Supabase.
- Verify authentication, restaurant listings, cart calculations, checkout, order persistence, and role-based permissions after deployment.
- Ensure the production build passes linting, type checking, and relevant automated tests.
- Provide a working deployment URL and clear setup instructions.
- Do not expose database credentials or privileged API keys in client-side code.
- Treat deployment as complete only after the deployed application has been smoke-tested successfully.
- Use only features and resource limits available under the selected free plans; obtain approval before any upgrade or paid integration.

## Response snapshot

Amended constitution from v1.0.0 → v1.1.0. Section III renamed from "Free-Tier First" to "Free-Tier Technology and Deployment" and materially expanded with specific services (Vercel Hobby, Supabase PostgreSQL/Storage, GitHub), env var handling, CI integration, and README documentation requirement. Added new Section XI "Deployment and Production Readiness" covering Vercel deployment, RLS policies, smoke-testing, and production verification checklist.

## Outcome

- ✅ Impact: Constitution amended to v1.1.0; deployment strategy and free-tier stack made explicit and binding.
- 🧪 Tests: none (constitution document)
- 📁 Files: .specify/memory/constitution.md, history/prompts/constitution/002-amend-free-tier-deployment-readiness.constitution.prompt.md
- 🔁 Next prompts: /sp.specify <feature> to begin first feature specification
- 🧠 Reflection: Section III is now concrete and actionable; Section XI closes the gap between implementation and production readiness.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Begin first feature spec with /sp.specify
