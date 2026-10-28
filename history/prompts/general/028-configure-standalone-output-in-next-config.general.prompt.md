---
id: 028
title: "Configure Standalone Output in NextConfig"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "11:45:23.527 Running build in Washington, D.C., USA (East) – iad1... Error: [ENOENT] ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/app/(customer)/page_client-reference-manifest.js'"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "next.config.ts"
tests_yaml:
  - "npm run build"
prompt_text: "fix ENOENT lstat page_client-reference-manifest.js on vercel build"
response_text: "Updated next.config.ts with output: 'standalone' to resolve Vercel serverless tracing and manifest output paths."
---

## Summary
Configured `output: 'standalone'` in `next.config.ts` to ensure Vercel bundles and traces client reference manifests correctly.
