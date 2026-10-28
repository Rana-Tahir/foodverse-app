---
id: 029
title: "Analyze Vercel Trace ENOENT Manifest Issue"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "11:48:31.324 Running build in Washington, D.C., USA (East) – iad1... Error: [ENOENT] ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/app/(customer)/page_client-reference-manifest.js'"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "next.config.ts"
tests_yaml:
  - "npm run build"
prompt_text: "ENOENT page_client-reference-manifest.js on vercel build"
response_text: "Analyzed Vercel CLI version mismatch causing manifest tracing errors in Next.js 14 App Router."
---

## Summary
Investigated Vercel build trace error regarding `page_client-reference-manifest.js`.
