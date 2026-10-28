---
id: 022
title: "Create Clean Repository for Vercel Deployment"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "Rana-Tahir"
command: "deploy the app"
labels: ["deployment", "vercel", "github", "cleanup"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "package.json"
tests_yaml:
  - "npm run build"
prompt_text: "deploy the app"
response_text: "Identified that Vercel requires package.json at the root of the GitHub repository. Recommended creating a clean GitHub repository dedicated solely to the Foodverse project root."
---

## Summary
To resolve the persistent `[NEXT_NO_VERSION]` error once and for all, the underlying cause is that the current GitHub repository (`Rana-Tahir/foodverse`) was initialized at the user profile level, meaning `package.json` resides inside `OneDrive/Desktop/Foodverse/` rather than the repository root. Creating a clean GitHub repository where the contents of `Foodverse` are directly at the root will allow Vercel to build instantly without any path configuration issues.
