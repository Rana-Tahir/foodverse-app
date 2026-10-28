---
id: 021
title: "Fix Vercel Root Directory Path for Deployment"
stage: "general"
date_iso: "2026-10-27"
surface: "agent"
model: "omniroute_test"
feature: "none"
branch: "main"
user: "Rana-Tahir"
command: "deploy the app"
labels: ["deployment", "vercel", "git"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "package.json"
  - "src/features/restaurants/restaurant-orders-service.ts"
  - "src/features/restaurants/restaurant-menu-service.ts"
tests_yaml:
  - "npm test"
  - "npm run test:e2e"
prompt_text: "deploy the app"
response_text: "Resolved Vercel deployment root directory path issue by correctly identifying the repository root structure and instructing Vercel to use OneDrive/Desktop/Foodverse as the Root Directory."
---

## Summary
Successfully identified why Vercel encountered `[NEXT_NO_VERSION]` and `[ENOENT]` errors during production deployment. Because the git repository was initialized higher up in the user profile directory (`C:\Users\kkt`), Vercel required the **Root Directory** setting in the Vercel dashboard to be set explicitly to `OneDrive/Desktop/Foodverse` so it can find `package.json` and build successfully.
