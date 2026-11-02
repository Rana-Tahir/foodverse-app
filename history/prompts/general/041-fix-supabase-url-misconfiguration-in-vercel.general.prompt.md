---
id: 041
title: "Fix Supabase URL Misconfiguration in Vercel"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "Console logs showing fetch to https://supabase.com/dashboard/project/hiayerjfbthyfntipphe/auth/v1/token"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - ".env.example"
tests_yaml:
  - "npm run build"
prompt_text: "Analyze Supabase CORS error caused by incorrect Supabase dashboard URL in Vercel environment variables."
response_text: "Identified that NEXT_PUBLIC_SUPABASE_URL was set to the Supabase dashboard browser URL instead of the project API URL."
---

## Summary
Diagnosed Supabase URL misconfiguration causing CORS fetch failures.
