---
id: 030
title: "Simplify NextConfig to Remove Standalone Output Conflict"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "Still the same . its hectic now"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "next.config.ts"
tests_yaml:
  - "npm run build"
prompt_text: "Still the same . its hectic now"
response_text: "Simplified next.config.ts by removing output: 'standalone' and allowing standard build output tracing."
---

## Summary
Updated `next.config.ts` to remove the standalone output setting causing the Vercel tracer conflict.
