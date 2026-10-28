---
id: 027
title: "Add NextConfig File for Vercel Trace Support"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "11:41:25.720 Running build in Washington, D.C., USA (East) – iad1... [ENOENT] ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/app/(customer)/page_client-reference-manifest.js' deplyment failed again"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "next.config.ts"
tests_yaml:
  - "npm run build"
prompt_text: "deployement failed again with ENOENT lstat page_client-reference-manifest.js"
response_text: "Created next.config.ts to ensure proper Next.js build and manifest tracing on Vercel."
---

## Summary
Added `next.config.ts` to satisfy Next.js and Vercel build manifest tracing requirements.
