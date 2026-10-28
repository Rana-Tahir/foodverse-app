# Implementation Tasks: Foodverse Platform MVP

**Feature Branch**: `001-foodverse-platform`
**Created**: 2026-10-25
**Status**: Ready for Implementation
**Specification**: `specs/001-foodverse-platform/spec.md`
**Plan**: `specs/001-foodverse-platform/plan.md`

---

## Task Organization

Tasks are organized into 10 implementation phases with clear dependencies. Each task includes:
- **Task ID**: Unique identifier (P#-T## format: Phase-Task)
- **Title**: Specific, actionable outcome
- **Description**: What needs to be done and why
- **Acceptance Criteria**: Testable success conditions
- **Dependencies**: Other tasks that must complete first
- **Files/Modules**: Specific files created/modified
- **Verification Steps**: How to confirm completion

---

## PHASE 1: Project Foundation

### Phase 1 Overview
Initialize Next.js project with strict TypeScript, configure build tools, establish project structure, and verify basic setup.

**Duration**: 1 week
**Go/No-Go**: Project builds, lints, and runs successfully

---

### P1-T01: Initialize Next.js Project with Strict TypeScript

**Description**:
Create a new Next.js 14+ project using `create-next-app` with the following configuration:
- TypeScript with strict mode enabled
- App Router (not Pages Router)
- ESLint and Prettier configured
- Git repository initialized
- `.gitignore` includes `.env.local`, `node_modules`, `.next`, `dist`

**Acceptance Criteria**:
- [ ] Next.js project created in `/c/Users/kkt/OneDrive/Desktop/Foodverse`
- [ ] `tsconfig.json` has `"strict": true`
- [ ] `npm run dev` starts server on http://localhost:3000
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` runs without errors
- [ ] Git repository initialized with initial commit

**Dependencies**: None (Phase 1 start)

**Files/Modules Created**:
- `next.config.ts`
- `tsconfig.json` (strict mode)
- `package.json` with scripts
- `src/app/page.tsx` (placeholder homepage)
- `.eslintrc.json`
- `.prettierrc.json`
- `.gitignore`

**Verification Steps**:
```bash
cd /c/Users/kkt/OneDrive/Desktop/Foodverse
npm run dev
# Visit http://localhost:3000 → See Next.js welcome page
npm run lint
# No errors
npm run build
# No errors
git log
# Shows initial commit
```

---

### P1-T02: Configure Tailwind CSS and shadcn/ui

**Description**:
Install and configure Tailwind CSS and shadcn/ui component library. Add Lucide icons for UI elements.

**Acceptance Criteria**:
- [ ] Tailwind CSS installed and configured
- [ ] `tailwind.config.ts` includes proper content paths
- [ ] `globals.css` imported in root layout
- [ ] shadcn/ui initialized via `npx shadcn-ui@latest init`
- [ ] First shadcn component (e.g., Button) installed successfully
- [ ] Lucide icons package installed
- [ ] Sample page uses Tailwind classes and shadcn component

**Dependencies**: P1-T01

**Files/Modules Created/Modified**:
- `tailwind.config.ts`
- `postcss.config.js`
- `src/app/globals.css`
- `src/app/layout.tsx` (import globals.css)
- `components/ui/` (created; will contain shadcn components)

**Verification Steps**:
```bash
npm install tailwindcss postcss autoprefixer
npm install @radix-ui/react-slot clsx class-variance-authority
npm install lucide-react
npm install -D @types/node @types/react @types/react-dom

# Test Tailwind
# Update src/app/page.tsx with Tailwind classes
# Visit http://localhost:3000 → See styled content
```

---

### P1-T03: Set Up Project Directory Structure

**Description**:
Create the modular monolithic directory structure as defined in the implementation plan. Initialize empty directories and create placeholder files to establish the structure.

**Acceptance Criteria**:
- [ ] All required directories created (see structure below)
- [ ] `src/app/(customer)/`, `src/app/restaurant/`, `src/app/rider/`, `src/app/admin/` group routes created
- [ ] `src/components/`, `src/features/`, `src/lib/`, `src/types/` directories exist
- [ ] `supabase/migrations/` and `supabase/seed.sql` placeholder files exist
- [ ] `tests/unit/`, `tests/integration/`, `tests/e2e/` directories created
- [ ] README.md exists at project root

**Dependencies**: P1-T01

**Files/Modules Created**:
```
src/
├── app/
│   ├── (customer)/
│   ├── restaurant/
│   ├── rider/
│   ├── admin/
│   ├── api/
│   └── auth/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── restaurants/
│   ├── menu/
│   ├── cart/
│   ├── orders/
│   ├── dashboards/
│   └── chatbot/
├── features/
│   ├── auth/
│   ├── restaurants/
│   ├── ordering/
│   ├── orders/
│   ├── delivery/
│   ├── admin/
│   └── support/
├── lib/
│   ├── supabase/
│   ├── validation/
│   ├── authorization/
│   ├── pricing/
│   └── constants.ts
├── types/
│   └── database.ts (placeholder)
supabase/
├── migrations/
└── seed.sql
tests/
├── unit/
├── integration/
└── e2e/
```

**Verification Steps**:
```bash
# Verify directory structure
ls -R src/app/
ls -R src/components/
ls -R src/features/
ls -R src/lib/
ls -R src/types/
ls -R supabase/
ls -R tests/
```

---

### P1-T04: Create Environment Variables Template

**Description**:
Create `.env.example` file documenting all required environment variables for Supabase, Next.js, and application configuration. Create `.env.local` (git-ignored) for local development.

**Acceptance Criteria**:
- [ ] `.env.example` created with all required variables documented
- [ ] `.env.local` created (git-ignored) for local secrets
- [ ] Environment variable loader utility created at `src/lib/env.ts`
- [ ] All sensitive keys marked as "Never commit"
- [ ] Documentation explains each variable's purpose

**Dependencies**: P1-T01

**Files/Modules Created**:
- `.env.example`
- `.env.local` (git-ignored)
- `src/lib/env.ts` (environment validation)

**Content (.env.example)**:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (Never commit; server-side only)

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Application
NEXT_PUBLIC_DELIVERY_FEE_PKR=100
```

**Verification Steps**:
```bash
# Verify .env.example exists
cat .env.example

# Verify .env.local is in .gitignore
grep ".env.local" .gitignore

# Verify env loader works (after P2 Supabase setup)
npm run dev
# No missing environment variable errors
```

---

### P1-T05: Configure Linting, Formatting, and Pre-commit Hooks

**Description**:
Configure ESLint for TypeScript, Prettier for code formatting, and optional pre-commit hooks using Husky to prevent commits with linting errors.

**Acceptance Criteria**:
- [ ] ESLint configured for TypeScript and React
- [ ] Prettier configured for code formatting (80 char line length, 2 space indent)
- [ ] `.eslintrc.json` excludes `node_modules` and `.next`
- [ ] `npm run lint` command runs ESLint
- [ ] `npm run format` command runs Prettier
- [ ] VSCode `.vscode/settings.json` configured for auto-format on save
- [ ] No linting errors on initial codebase

**Dependencies**: P1-T01, P1-T02

**Files/Modules Created/Modified**:
- `.eslintrc.json` (updated)
- `.prettierrc.json` (updated)
- `.vscode/settings.json` (create)

**Verification Steps**:
```bash
npm run lint
# No errors
npm run format
# Formats code
git diff
# Shows formatting changes (if any)
```

---

### P1-T06: Set Up Testing Infrastructure (Vitest + Playwright)

**Description**:
Install and configure Vitest for unit/integration tests and Playwright for end-to-end tests. Create placeholder test files and scripts.

**Acceptance Criteria**:
- [ ] Vitest installed and configured
- [ ] `vitest.config.ts` created with proper setup
- [ ] `npm run test` runs Vitest in watch mode
- [ ] `npm run test:ui` opens Vitest UI
- [ ] Playwright installed and configured
- [ ] `playwright.config.ts` created with viewport sizes (320px, 375px, 768px, 1024px, 1440px)
- [ ] `npm run test:e2e` runs Playwright tests
- [ ] Sample test file created and passing

**Dependencies**: P1-T01, P1-T02

**Files/Modules Created**:
- `vitest.config.ts`
- `playwright.config.ts`
- `tests/unit/example.test.ts` (sample passing test)
- `tests/e2e/example.spec.ts` (sample passing test)

**Verification Steps**:
```bash
npm install -D vitest @vitest/ui
npm install -D @playwright/test

npm run test
# Watch mode starts; sample test passes

npm run test:e2e
# Playwright tests run
```

---

### P1-T07: Create README with Setup and Deployment Instructions

**Description**:
Document project setup, local development, testing, and deployment instructions. Include database setup prerequisites and known limitations.

**Acceptance Criteria**:
- [ ] README.md created with project overview
- [ ] Setup instructions for local development documented
- [ ] NPM scripts documented (`dev`, `build`, `lint`, `test`, `test:e2e`)
- [ ] Supabase setup prerequisites documented
- [ ] Free-tier limitations noted (500 MB database, 5 GB bandwidth, etc.)
- [ ] Deployment to Vercel documented (high-level; detailed steps in Phase 10)
- [ ] Contributing guidelines included

**Dependencies**: P1-T01 through P1-T06

**Files/Modules Created**:
- `README.md`

**Verification Steps**:
```bash
# Verify README exists and is readable
cat README.md

# Follow setup steps manually to ensure they work
npm install
npm run dev
# Should start successfully
```

---

### P1-T08: Initial Git Commit and Branch Verification

**Description**:
Commit all Phase 1 setup work to the `001-foodverse-platform` branch. Verify branch is correctly named and all changes are committed.

**Acceptance Criteria**:
- [ ] All Phase 1 changes committed with descriptive message
- [ ] Commit message includes "[P1] Project Foundation Setup"
- [ ] Branch is `001-foodverse-platform`
- [ ] No uncommitted changes remain
- [ ] `git log` shows initial commit

**Dependencies**: P1-T01 through P1-T07

**Verification Steps**:
```bash
git status
# No changes

git log --oneline
# Shows commit "[P1] Project Foundation Setup"

git branch
# Shows 001-foodverse-platform (current)
```

---

### P1-T09: Verify Project Builds and Tests Pass

**Description**:
Run full build pipeline to ensure TypeScript compilation, linting, and tests pass. Resolve any issues before proceeding to Phase 2.

**Acceptance Criteria**:
- [ ] `npm run build` completes without errors
- [ ] `npx tsc --noEmit` passes (TypeScript strict check)
- [ ] `npm run lint` passes without errors
- [ ] `npm run test` passes (all sample tests)
- [ ] No console errors or warnings in browser console

**Dependencies**: P1-T01 through P1-T08

**Verification Steps**:
```bash
npm run build
# Build succeeds; .next/ directory created

npx tsc --noEmit
# No TypeScript errors

npm run lint
# No linting errors

npm run test
# All tests pass

npm run dev
# Browser console has no errors
```

---

## PHASE 2: Supabase & Authentication

### Phase 2 Overview
Configure Supabase project, implement authentication via Supabase Auth, create database schema with migrations, set up Row Level Security policies, and implement role-based access control.

**Duration**: 1-2 weeks
**Prerequisite**: Phase 1 complete
**Go/No-Go**: Authentication works; RLS policies enforced; users cannot access others' data

---

### P2-T01: Create and Configure Supabase Project

**Description**:
Create a new Supabase project for Foodverse. Configure environment variables and initialize Supabase client in the Next.js application.

**Acceptance Criteria**:
- [ ] Supabase project created (free tier)
- [ ] Project URL and anon key obtained
- [ ] `.env.local` updated with Supabase credentials
- [ ] `src/lib/supabase/client.ts` created (browser client)
- [ ] `src/lib/supabase/server.ts` created (server client with service role)
- [ ] Supabase client initialization tested
- [ ] Connection verified via browser console

**Dependencies**: P1 complete

**Files/Modules Created**:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `.env.local` (updated with Supabase credentials)

**Verification Steps**:
```bash
# In browser console, after npm run dev
import { createClient } from '@supabase/supabase-js'
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
console.log(client)
# Should output Supabase client object
```

---

### P2-T02: Create Database Migrations (Auth & Profiles)

**Description**:
Create initial database migrations to set up user profiles and role system. Use versioned SQL migrations in `supabase/migrations/` for version control.

**Acceptance Criteria**:
- [ ] Migration file `001_init_profiles.sql` created
- [ ] `profiles` table created with columns: `id`, `email`, `full_name`, `phone_number`, `role`, `avatar_url`, `created_at`, `updated_at`
- [ ] `role` enum created: `customer`, `restaurant_owner`, `rider`, `admin`
- [ ] Foreign key to `auth.users(id)`
- [ ] Indexes created for query performance
- [ ] Migration can be applied and rolled back successfully

**Dependencies**: P2-T01

**Files/Modules Created**:
- `supabase/migrations/001_init_profiles.sql`

**Migration Content (001_init_profiles.sql)**:
```sql
-- Create role enum
CREATE TYPE user_role AS ENUM ('customer', 'restaurant_owner', 'rider', 'admin');

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX profiles_role_idx ON profiles(role);
CREATE INDEX profiles_email_idx ON profiles(email);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

**Verification Steps**:
```bash
# Apply migration via Supabase CLI or dashboard
supabase migration up

# Verify table created
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';
# Should return 1 row
```

---

### P2-T03: Create Database Migrations (Addresses, Restaurants, Riders)

**Description**:
Create migrations for customer addresses, restaurant profiles, and rider profiles tables.

**Acceptance Criteria**:
- [ ] Migration `002_init_addresses.sql` created for customer delivery addresses
- [ ] Migration `003_init_restaurants.sql` created for restaurant data
- [ ] Migration `004_init_rider_profiles.sql` created for riders
- [ ] Foreign keys properly configured
- [ ] Constraints validate data (e.g., prices > 0, opening_hours is JSONB)
- [ ] All migrations apply without errors

**Dependencies**: P2-T02

**Files/Modules Created**:
- `supabase/migrations/002_init_addresses.sql`
- `supabase/migrations/003_init_restaurants.sql`
- `supabase/migrations/004_init_rider_profiles.sql`

**Key Tables**:
- `addresses`: street_address, area, city, postal_code, latitude, longitude, label, is_default, user_id FK
- `restaurants`: name, description, image_url, cuisine_type, phone_number, address, opening_hours (JSONB), owner_id FK, is_approved, is_available, average_rating, created_at, updated_at
- `rider_profiles`: license_number, vehicle_type, is_available, is_verified, average_rating, total_deliveries, earnings_total, user_id FK

**Verification Steps**:
```bash
supabase migration up

# Verify all tables created
\d addresses
\d restaurants
\d rider_profiles
```

---

### P2-T04: Create Database Migrations (Menus & Ordering)

**Description**:
Create migrations for menu categories, menu items, orders, order items, order status history, and delivery assignments.

**Acceptance Criteria**:
- [ ] Migration `005_init_menus.sql` created for categories and menu_items
- [ ] Migration `006_init_ordering.sql` created for orders, order_items, order_status_history
- [ ] Migration `007_init_delivery.sql` created for delivery_assignments
- [ ] Order status enum: `pending_confirmation`, `confirmed`, `preparing`, `ready_for_pickup`, `picked_up`, `delivered`, `rejected`, `cancelled`
- [ ] Price fields store as DECIMAL(10,2) for PKR
- [ ] Order item snapshots preserve name and price at order time
- [ ] Delivery address stored as JSONB in orders table
- [ ] All migrations apply without errors

**Dependencies**: P2-T03

**Files/Modules Created**:
- `supabase/migrations/005_init_menus.sql`
- `supabase/migrations/006_init_ordering.sql`
- `supabase/migrations/007_init_delivery.sql`

**Key Tables**:
- `categories`: restaurant_id FK, name, display_order
- `menu_items`: restaurant_id FK, category_id FK, name, description, price_pkr, image_url, is_available
- `orders`: customer_id FK, restaurant_id FK, rider_id FK (nullable), delivery_address_snapshot JSONB, payment_method, subtotal_pkr, delivery_fee_pkr, total_pkr, current_status, estimated_delivery_minutes, created_at, updated_at
- `order_items`: order_id FK, menu_item_id FK (nullable), item_name, item_price_pkr, quantity, line_total_pkr
- `order_status_history`: order_id FK, from_status, to_status, changed_by_user_id FK, reason, created_at
- `delivery_assignments`: order_id FK, rider_id FK, status, accepted_at, picked_up_at, delivered_at

**Verification Steps**:
```bash
supabase migration up

# Verify all tables
\d categories
\d menu_items
\d orders
\d order_items
\d order_status_history
\d delivery_assignments
```

---

### P2-T05: Create Database Migrations (Platform Admin)

**Description**:
Create migrations for platform settings, support FAQs, and optional support conversation tracking.

**Acceptance Criteria**:
- [ ] Migration `008_init_platform_admin.sql` created
- [ ] `platform_settings` table created (one row per setting)
- [ ] `support_faqs` table created for chatbot knowledge base
- [ ] `support_conversations` and `support_messages` tables created (optional persistence)
- [ ] `reviews` table created for customer reviews

**Dependencies**: P2-T04

**Files/Modules Created**:
- `supabase/migrations/008_init_platform_admin.sql`

**Key Tables**:
- `platform_settings`: delivery_fee_base_pkr, delivery_fee_per_km, min_order_value_pkr, commission_percentage, support_email, support_phone, updated_at
- `support_faqs`: question, answer, intent, keywords (TEXT[]), priority, is_active, created_at, updated_at
- `support_conversations`: user_id FK, started_at, ended_at, is_resolved, created_at
- `support_messages`: conversation_id FK, sender_type, message_text, message_type, created_at
- `reviews`: order_id FK, reviewer_id FK, restaurant_id FK, rating (1-5), comment, created_at

---

### P2-T06: Implement Supabase Auth Integration

**Description**:
Implement Supabase Auth signup and login flows. Create auth pages and middleware for session validation.

**Acceptance Criteria**:
- [ ] `src/app/auth/signup/page.tsx` created with signup form
- [ ] `src/app/auth/login/page.tsx` created with login form
- [ ] Supabase Auth sign-up creates user in `auth.users` table
- [ ] Profile record created automatically on signup (via trigger or application logic)
- [ ] Email verification (Supabase default)
- [ ] JWT session stored in HTTP-only cookie
- [ ] Sign-out clears session
- [ ] Error messages shown for duplicate email, weak password, etc.

**Dependencies**: P2-T05

**Files/Modules Created**:
- `src/app/auth/signup/page.tsx`
- `src/app/auth/login/page.tsx`
- `src/lib/supabase/middleware.ts` (session validation)
- `src/features/auth/auth-context.tsx` (React Context for auth state)
- `src/features/auth/use-auth.ts` (custom hook)

**Verification Steps**:
```bash
npm run dev

# Navigate to http://localhost:3000/auth/signup
# Fill form with test email, password, name
# Click "Sign Up"
# Verify email confirmation message shown
# Check Supabase dashboard: user created in auth.users and profiles table
```

---

### P2-T07: Create Row Level Security (RLS) Policies

**Description**:
Implement RLS policies for all tables to enforce database-level authorization. Customers can only see own data, restaurant owners only manage own restaurant, etc.

**Acceptance Criteria**:
- [ ] RLS enabled on all tables
- [ ] `profiles` table: Users can view/update own profile only
- [ ] `addresses` table: Customers can view/edit/delete own addresses only
- [ ] `restaurants` table: Owners can manage own restaurant; customers can view approved restaurants
- [ ] `menu_items` table: Owners can manage own restaurant items; customers can view approved items
- [ ] `orders` table: Customers see own orders; restaurants see their orders; riders see assigned orders; admins see all
- [ ] `order_items` table: Inherited from orders via RLS
- [ ] `delivery_assignments` table: Riders see own assignments; restaurants/customers see related orders
- [ ] RLS policies tested and verified to prevent unauthorized access
- [ ] Migration file `009_rls_policies.sql` created

**Dependencies**: P2-T05

**Files/Modules Created**:
- `supabase/migrations/009_rls_policies.sql`

**Sample RLS Policies (009_rls_policies.sql)**:
```sql
-- Profiles: Users see own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Addresses: Customers see own addresses
CREATE POLICY "Customers can view own addresses" ON addresses
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Customers can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Customers can update own addresses" ON addresses
  FOR UPDATE USING (user_id = auth.uid());

-- Orders: Multi-role access
CREATE POLICY "Customers see own orders" ON orders
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Restaurants see their orders" ON orders
  FOR SELECT USING (restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  ));

CREATE POLICY "Riders see assigned orders" ON orders
  FOR SELECT USING (rider_id = auth.uid());

CREATE POLICY "Admins see all orders" ON orders
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

**Verification Steps**:
```bash
# Test as customer user
SELECT * FROM orders WHERE customer_id = 'user-uuid';
# Should return only own orders

# Test as another customer
SELECT * FROM orders WHERE customer_id = 'user-uuid-2';
# Should return empty (RLS blocks access)

# Test as admin
SELECT * FROM orders;
# Should return all orders
```

---

### P2-T08: Implement Role-Based Access Control (RBAC) Middleware

**Description**:
Create middleware to validate user role and protect routes. Implement route guards for restaurant, rider, and admin pages.

**Acceptance Criteria**:
- [ ] `src/lib/authorization/check-access.ts` created to verify user role
- [ ] Protected routes redirect unauthenticated users to login
- [ ] Protected routes redirect unauthorized roles to error page
- [ ] Middleware validates session on every request
- [ ] `src/app/restaurant/(route)` requires `restaurant_owner` role
- [ ] `src/app/rider/(route)` requires `rider` role
- [ ] `src/app/admin/(route)` requires `admin` role
- [ ] Customer pages (`/(customer)/(route)`) accessible to all authenticated users
- [ ] Server Actions validate role and user context

**Dependencies**: P2-T06, P2-T07

**Files/Modules Created**:
- `src/lib/authorization/check-access.ts`
- `src/middleware.ts` (Next.js middleware)
- `src/lib/authorization/permissions.ts` (role-permission mapping)

**Verification Steps**:
```bash
npm run dev

# Test 1: Unauthenticated user
Navigate to http://localhost:3000/restaurant/dashboard
# Should redirect to /auth/login

# Test 2: Customer user accessing restaurant dashboard
Sign in as customer
Navigate to http://localhost:3000/restaurant/dashboard
# Should show 403 Unauthorized

# Test 3: Restaurant owner accessing restaurant dashboard
Sign in as restaurant_owner
Navigate to http://localhost:3000/restaurant/dashboard
# Should display restaurant dashboard
```

---

### P2-T09: Prevent Role Self-Escalation

**Description**:
Implement server-side checks to prevent users from modifying their own role or granting themselves elevated privileges.

**Acceptance Criteria**:
- [ ] Users cannot update their own role via API or Server Action
- [ ] `profiles` RLS policy prevents role updates by non-admin users
- [ ] Database constraint or trigger prevents role modification outside admin operations
- [ ] Test confirms customer cannot become admin
- [ ] Test confirms restaurant owner cannot become admin
- [ ] Only admin can assign/modify roles (implemented in Phase 7 Admin tasks)

**Dependencies**: P2-T07, P2-T08

**Verification Steps**:
```sql
-- Test: Customer tries to update own role
UPDATE profiles SET role = 'admin' WHERE id = 'customer-uuid';
-- Should fail: RLS policy denies update
```

---

### P2-T10: Create Auth Utilities and Hooks

**Description**:
Create reusable utilities and hooks for authentication operations: `useAuth()` hook, session validation, and token refresh.

**Acceptance Criteria**:
- [ ] `src/features/auth/use-auth.ts` hook created with `user`, `isLoading`, `login()`, `logout()`, `signup()`
- [ ] `src/lib/supabase/auth-helpers.ts` created with token refresh logic
- [ ] Session persists across page reloads
- [ ] Automatic token refresh on token expiration
- [ ] `useAuth()` available in all components

**Dependencies**: P2-T06

**Files/Modules Created**:
- `src/features/auth/use-auth.ts`
- `src/lib/supabase/auth-helpers.ts`

**Verification Steps**:
```bash
npm run dev

# In browser console, after signup:
const { user, isLoading } = useAuth()
console.log(user)
# Should show logged-in user

# Refresh page
# User should still be logged in (session persisted)
```

---

### P2-T11: Create Seed Data for Development

**Description**:
Create seed data file (`supabase/seed.sql`) with sample users, restaurants, menu items, and test data for local development and testing.

**Acceptance Criteria**:
- [ ] `supabase/seed.sql` created with:
  - 3 test customers
  - 2 test restaurant owners
  - 2 test restaurants with menus
  - 10 sample menu items (biryani, pizza, burgers, etc.) with prices in PKR
  - 1 test rider
  - 1 test admin
- [ ] Seed data includes realistic names and Pakistani cuisine
- [ ] All prices in PKR (Pakistani Rupee)
- [ ] Seed data can be applied without errors
- [ ] Test users have known email/password for manual testing

**Dependencies**: P2-T05

**Files/Modules Created**:
- `supabase/seed.sql`

**Seed Data Includes**:
```sql
-- Insert test users via auth.users (usually done via Auth API)
-- Insert test profiles
INSERT INTO profiles (id, email, full_name, role) VALUES
  ('customer1-uuid', 'customer1@test.com', 'Ali Khan', 'customer'),
  ('owner1-uuid', 'owner1@test.com', 'Restaurant Owner 1', 'restaurant_owner'),
  ('rider1-uuid', 'rider1@test.com', 'Delivery Rider 1', 'rider'),
  ('admin1-uuid', 'admin1@test.com', 'Admin User', 'admin');

-- Insert restaurants
INSERT INTO restaurants (owner_id, name, cuisine_type, phone_number, address, is_approved, is_available) VALUES
  ('owner1-uuid', 'Biryani House', 'Pakistani', '0300-1234567', 'Gulshan, Karachi', true, true),
  ('owner1-uuid', 'Pizza Palace', 'Italian', '0300-1234568', 'DHA, Karachi', true, true);

-- Insert menu items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price_pkr, is_available) VALUES
  ...
```

**Verification Steps**:
```bash
supabase db seed

# Verify data inserted
SELECT * FROM profiles WHERE role = 'customer';
# Should return test customers

SELECT * FROM restaurants;
# Should return test restaurants

SELECT * FROM menu_items;
# Should return test menu items
```

---

### P2-T12: Test Authentication and Authorization

**Description**:
Create comprehensive unit and integration tests for authentication flows and RLS policies. Verify no unauthorized access.

**Acceptance Criteria**:
- [ ] Unit tests for signup/login logic pass
- [ ] Integration tests for RLS policies pass
- [ ] Test: Customer cannot view another customer's addresses
- [ ] Test: Restaurant owner cannot access other restaurants
- [ ] Test: Rider cannot see orders not assigned to them
- [ ] Test: Admin can see all orders
- [ ] Test: User cannot escalate own role
- [ ] All tests pass without errors

**Dependencies**: P2-T06 through P2-T11

**Files/Modules Created**:
- `tests/integration/auth.test.ts`
- `tests/integration/rls-policies.test.ts`

**Test Coverage**:
```typescript
describe("Authentication", () => {
  it("creates user account with signup", async () => { /* ... */ });
  it("authenticates user with login", async () => { /* ... */ });
  it("clears session on logout", async () => { /* ... */ });
});

describe("RLS Policies", () => {
  it("customer cannot view other customer's addresses", async () => { /* ... */ });
  it("restaurant owner cannot access other restaurant", async () => { /* ... */ });
  it("admin can view all orders", async () => { /* ... */ });
});
```

**Verification Steps**:
```bash
npm run test
# All authentication and RLS tests pass
```

---

### P2-T13: Create Protected Homepage Layout

**Description**:
Create a protected homepage that shows different content based on user role: customer sees restaurants, restaurant owner sees dashboard link, rider sees deliveries link, etc.

**Acceptance Criteria**:
- [ ] `src/app/(customer)/page.tsx` (homepage for customers)
- [ ] Navigation bar with Foodverse branding
- [ ] Login/Logout links in header
- [ ] User profile menu with logout option
- [ ] Role-specific navigation (restaurant → dashboard, rider → deliveries, admin → settings)
- [ ] Unauthenticated users see login/signup prompts
- [ ] Responsive on mobile, tablet, desktop

**Dependencies**: P2-T06 through P2-T13

**Files/Modules Created**:
- `src/app/(customer)/layout.tsx`
- `src/app/(customer)/page.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/navigation.tsx`

**Verification Steps**:
```bash
npm run dev

# Unauthenticated
Navigate to http://localhost:3000
# Shows "Sign In" and "Sign Up" buttons

# Signed in as customer
# Shows restaurant list placeholder
# Header shows profile menu and logout

# Signed in as restaurant owner
# Shows "Restaurant Dashboard" link
```

---

## PHASE 3: Restaurant Discovery & Menus

### Phase 3 Overview
Implement homepage with restaurant listing, search, filtering, restaurant details page, and menu display. Includes loading/empty/error states and responsive design.

**Duration**: 1-2 weeks
**Prerequisite**: Phase 2 complete
**Go/No-Go**: Customers can browse restaurants and view menus; search works; responsive on mobile and desktop

---

### P3-T01: Create Restaurant Listing and Filtering Components

**Description**:
Build responsive restaurant listing with filtering by cuisine, category, and availability. Include loading and empty states.

**Acceptance Criteria**:
- [ ] `src/components/restaurants/restaurant-grid.tsx` created
- [ ] Restaurant cards display: image, name, cuisine, rating (if available), availability status
- [ ] Filter controls for cuisine and category
- [ ] Search bar for restaurant name
- [ ] Pagination or lazy loading for large lists
- [ ] Loading skeleton shown while fetching
- [ ] Empty state shown when no restaurants found
- [ ] Responsive on 320px, 375px, 768px, 1024px, 1440px
- [ ] Touch-friendly buttons and spacing on mobile

**Dependencies**: P2 complete

**Files/Modules Created**:
- `src/components/restaurants/restaurant-grid.tsx`
- `src/components/restaurants/restaurant-card.tsx`
- `src/components/restaurants/restaurant-filters.tsx`
- `src/components/ui/skeleton.tsx` (shadcn component for loading)

**Component Props**:
```typescript
interface RestaurantCardProps {
  id: string;
  name: string;
  image_url: string | null;
  cuisine_type: string;
  average_rating?: number;
  is_available: boolean;
  onClick: () => void;
}
```

**Verification Steps**:
```bash
npm run dev

Navigate to http://localhost:3000 (as logged-in customer)
# Should see list of restaurants with filters
# Search for "biryani" → filters results
# Mobile view: cards stack vertically, touch-friendly
# Desktop view: 3-4 cards per row
```

---

### P3-T02: Implement Restaurant Search Logic

**Description**:
Implement server-side restaurant search by name, cuisine, and availability. Create API route or Server Action for search.

**Acceptance Criteria**:
- [ ] `src/features/restaurants/search-restaurants.ts` created (Server Action)
- [ ] Search by restaurant name (case-insensitive, partial match)
- [ ] Filter by cuisine type
- [ ] Filter by category
- [ ] Filter by availability
- [ ] Results paginated (skip/limit parameters)
- [ ] RLS applied (only approved restaurants shown)
- [ ] Performance optimized (indexes used)
- [ ] Returns 50ms on local Supabase

**Dependencies**: P3-T01, P2 complete

**Files/Modules Created**:
- `src/features/restaurants/search-restaurants.ts`

**Server Action Example**:
```typescript
"use server"
export async function searchRestaurants({
  search?: string;
  cuisine?: string;
  skip = 0;
  limit = 10;
}) {
  // Validate user authenticated
  // Query Supabase with RLS
  // Apply filters
  // Return paginated results
}
```

**Verification Steps**:
```bash
# Test search
const results = await searchRestaurants({ search: "biryani" })
console.log(results)
# Should return restaurants with "biryani" in name
```

---

### P3-T03: Create Restaurant Detail Page

**Description**:
Build restaurant detail page showing name, description, image, opening hours, menu categories, and menu items.

**Acceptance Criteria**:
- [ ] `src/app/(customer)/restaurants/[id]/page.tsx` created
- [ ] Restaurant info displayed: name, description, image, cuisine, phone, address
- [ ] Opening hours displayed (formatted from JSONB)
- [ ] Menu organized by categories
- [ ] Menu categories collapsible
- [ ] Menu items display image, name, description, price in PKR
- [ ] "Add to Cart" button visible for available items
- [ ] Unavailable items grayed out with "Sold Out" label
- [ ] Loading state while fetching restaurant/menu
- [ ] Back button to return to restaurant list
- [ ] Responsive on mobile and desktop

**Dependencies**: P3-T01, P3-T02

**Files/Modules Created**:
- `src/app/(customer)/restaurants/[id]/page.tsx`
- `src/components/menu/menu-item.tsx`
- `src/components/menu/category-list.tsx`
- `src/features/restaurants/get-menu.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

Navigate to http://localhost:3000
Click on a restaurant
# Should show restaurant details
# Menu items displayed with prices in PKR
# Categories collapsible
# Mobile view: full-width items
# Desktop view: 2-column layout
```

---

### P3-T04: Implement Menu Item Retrieval

**Description**:
Create Server Action to fetch menu items for a restaurant, respecting RLS and filtering out unavailable items appropriately.

**Acceptance Criteria**:
- [ ] `src/features/restaurants/get-menu.ts` Server Action created
- [ ] Fetches categories and items for a restaurant
- [ ] RLS ensures only approved restaurants' menus visible
- [ ] Available items shown; unavailable items marked but visible
- [ ] Prices fetched fresh from database (prevents client tampering)
- [ ] Images retrieved from Supabase Storage URLs
- [ ] Performance optimized (<100ms local)

**Dependencies**: P3-T03

**Files/Modules Created**:
- `src/features/restaurants/get-menu.ts`

**Verification Steps**:
```bash
const menu = await getMenu(restaurantId)
console.log(menu)
# Should include categories and items with prices
```

---

### P3-T05: Add Food Category Navigation

**Description**:
Add category tabs or sidebar to allow customers to jump to different menu sections (Appetizers, Mains, Desserts, Beverages).

**Acceptance Criteria**:
- [ ] Category navigation component created
- [ ] Click category → scrolls/filters to that category
- [ ] Active category highlighted
- [ ] Mobile: horizontal scrollable tabs
- [ ] Desktop: left sidebar or top tabs
- [ ] Smooth scroll animation

**Dependencies**: P3-T03

**Files/Modules Created**:
- `src/components/menu/category-navigation.tsx`

---

### P3-T06: Implement Responsive Menu Layout

**Description**:
Ensure menu display is fully responsive across all viewport sizes with proper spacing, fonts, and touch targets.

**Acceptance Criteria**:
- [ ] 320px (mobile): Single-column layout, full-width items
- [ ] 375px (mobile): Single-column, optimized spacing
- [ ] 768px (tablet): 2-column layout if appropriate
- [ ] 1024px (desktop): 2-3 column layout
- [ ] 1440px (large desktop): 3-4 column layout
- [ ] Touch targets ≥44px on mobile
- [ ] Text readable without zooming
- [ ] Images scale appropriately
- [ ] No horizontal scrolling

**Dependencies**: P3-T03 through P3-T05

**Verification Steps**:
```bash
npm run dev

# Test each viewport using browser DevTools
# Verify layouts at 320px, 375px, 768px, 1024px, 1440px
# All elements visible, no overflow
```

---

### P3-T07: Create Menu Item Availability Logic

**Description**:
Implement logic to mark items as available/unavailable, with clear visual distinction and appropriate messaging.

**Acceptance Criteria**:
- [ ] Available items show price and "Add to Cart" button (enabled)
- [ ] Unavailable items show "Sold Out" label (grayed out)
- [ ] "Add to Cart" button disabled for unavailable items
- [ ] Hovering on disabled button shows tooltip: "This item is currently unavailable"
- [ ] Owner can toggle item availability in restaurant dashboard
- [ ] Changes reflect immediately in customer view (via re-fetch or real-time if Phase 2+)

**Dependencies**: P3-T03

**Verification Steps**:
```bash
npm run dev

# As customer viewing menu
# Available item: "Add to Cart" button clickable
# Unavailable item: "Sold Out" label shown, button disabled, tooltip on hover
```

---

### P3-T08: Add Loading, Empty, and Error States

**Description**:
Implement loading skeletons, empty states, and error messages for restaurant listing and menu pages.

**Acceptance Criteria**:
- [ ] Loading skeleton shown while fetching restaurants
- [ ] "No restaurants found" message when search yields no results
- [ ] Error message shown if restaurant fetch fails
- [ ] Retry button on error state
- [ ] Loading skeleton for menu items
- [ ] "No menu items" message if restaurant has empty menu
- [ ] Empty states are helpful, not confusing

**Dependencies**: P3-T01 through P3-T07

**Files/Modules Created**:
- `src/components/ui/skeleton.tsx` (if not created in Phase 2)
- `src/components/empty-state.tsx`
- `src/components/error-boundary.tsx`

**Verification Steps**:
```bash
npm run dev

# Search for non-existent restaurant
# "No restaurants found" displayed

# Simulate network error
# "Error loading restaurants" + Retry button shown
```

---

### P3-T09: Test Restaurant Discovery and Menu Features

**Description**:
Create unit and end-to-end tests for restaurant discovery, search, menu display, and responsive layouts.

**Acceptance Criteria**:
- [ ] Unit tests for search logic pass
- [ ] E2E test: Browse restaurants
- [ ] E2E test: Search restaurants by name
- [ ] E2E test: View restaurant details
- [ ] E2E test: View menu items with prices
- [ ] E2E test: Mobile responsive layout
- [ ] All tests pass

**Dependencies**: P3-T01 through P3-T08

**Files/Modules Created**:
- `tests/unit/restaurant-search.test.ts`
- `tests/e2e/restaurant-discovery.spec.ts`

**Verification Steps**:
```bash
npm run test
npm run test:e2e

# All tests pass
```

---

## PHASE 4: Cart & Checkout

### Phase 4 Overview
Implement shopping cart, server-side price validation, checkout flow with address selection, order creation, and persistence.

**Duration**: 1-2 weeks
**Prerequisite**: Phase 3 complete
**Go/No-Go**: Customers can add items, view cart, checkout with server-validated totals, and orders persist

---

### P4-T01: Implement Cart State Management

**Description**:
Create React Context for cart state management, including add, remove, and update quantity operations.

**Acceptance Criteria**:
- [ ] `src/features/ordering/cart-context.tsx` created
- [ ] Cart state includes: items (array), restaurant_id, created_at
- [ ] Cart item: menu_item_id, quantity, price_at_add_time
- [ ] Functions: addItem(), removeItem(), updateQuantity(), clearCart()
- [ ] Cart persisted to browser localStorage
- [ ] Cart restored on page reload
- [ ] `useCart()` hook created for component access
- [ ] Context provides cart state and functions to all child components

**Dependencies**: P3 complete

**Files/Modules Created**:
- `src/features/ordering/cart-context.tsx`
- `src/features/ordering/use-cart.ts`
- `src/features/ordering/cart-storage.ts` (localStorage helpers)

**Context API Example**:
```typescript
interface CartContextType {
  items: CartItem[];
  restaurantId: string | null;
  addItem(menuItemId: string, quantity: number, price: number): void;
  removeItem(menuItemId: string): void;
  updateQuantity(menuItemId: string, quantity: number): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
```

**Verification Steps**:
```bash
npm run dev

# In component:
const { items, addItem } = useCart()
addItem("menu-item-123", 2, 500)
console.log(items) // Should include item

# Refresh page
# Cart persisted
```

---

### P4-T02: Create Cart UI Components

**Description**:
Build cart display components: cart drawer/page, item rows, quantity controls, and summary.

**Acceptance Criteria**:
- [ ] `src/components/cart/cart-drawer.tsx` created (slide-in panel or page)
- [ ] Cart items displayed with image, name, quantity, price
- [ ] Quantity controls (+ / - buttons) with min 1, max 99
- [ ] Remove item button with confirmation
- [ ] Subtotal calculated and displayed
- [ ] Delivery fee displayed
- [ ] Total displayed prominently
- [ ] "Proceed to Checkout" button
- [ ] "Continue Shopping" button returns to restaurant
- [ ] Empty cart message when no items
- [ ] Responsive on mobile and desktop
- [ ] Touch-friendly buttons

**Dependencies**: P4-T01

**Files/Modules Created**:
- `src/components/cart/cart-drawer.tsx`
- `src/components/cart/cart-item.tsx`
- `src/components/cart/cart-summary.tsx`

**Verification Steps**:
```bash
npm run dev

Add items to cart
Click cart icon → Cart drawer opens
View items, quantities, total
Update quantity → Total updates
Remove item → Item disappears
```

---

### P4-T03: Implement One-Restaurant-Per-Order Rule

**Description**:
Add logic to prevent customers from mixing items from different restaurants. Show dialog when user tries to add from another restaurant.

**Acceptance Criteria**:
- [ ] When adding item from restaurant A, cart restricted to restaurant A
- [ ] If customer attempts to add from restaurant B, show modal:
  - "You have items from {Restaurant A}. Start a new order?"
  - Options: "Replace Cart" or "Cancel"
- [ ] "Replace Cart" clears cart and adds new item
- [ ] "Cancel" keeps current cart unchanged
- [ ] User can manually clear cart to switch restaurants
- [ ] Clear cart option with confirmation

**Dependencies**: P4-T01, P4-T02

**Files/Modules Created**:
- `src/features/ordering/validate-cart-item.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

Add item from Restaurant A
Navigate to Restaurant B
Add item → Dialog shown
Click "Replace Cart" → Cart switched to Restaurant B
```

---

### P4-T04: Create Checkout Page and Address Selector

**Description**:
Build checkout page with order summary, address selection, and payment method.

**Acceptance Criteria**:
- [ ] `src/app/(customer)/checkout/page.tsx` created
- [ ] Display order summary: items, quantities, prices, subtotal
- [ ] Address selector: dropdown or list of saved addresses
- [ ] "Add New Address" link for quick address add
- [ ] Payment method selector (cash-on-delivery only for MVP)
- [ ] Order total displayed prominently
- [ ] "Place Order" button prominent
- [ ] "Back to Cart" button
- [ ] Form validation: address selected, items valid
- [ ] Error message if address not selected
- [ ] Loading state while submitting order
- [ ] Responsive on mobile and desktop

**Dependencies**: P4-T02, P4-T03

**Files/Modules Created**:
- `src/app/(customer)/checkout/page.tsx`
- `src/components/checkout/address-selector.tsx`
- `src/components/checkout/order-summary.tsx`
- `src/components/checkout/payment-method.tsx`

**Verification Steps**:
```bash
npm run dev

Add items to cart
Click "Proceed to Checkout"
# Checkout page shown
# Summary displays correct items and total
# Address dropdown shows saved addresses
# "Place Order" button ready
```

---

### P4-T05: Implement Server-Side Checkout Validation

**Description**:
Create comprehensive server-side validation for checkout: verify cart, items, prices, restaurant, availability, and totals.

**Acceptance Criteria**:
- [ ] `src/features/ordering/checkout-service.ts` created
- [ ] Validates user authenticated
- [ ] Validates delivery address belongs to user and is complete
- [ ] Validates restaurant approved and available
- [ ] Validates restaurant is open (opening_hours check)
- [ ] Re-fetches all menu items from DB (don't trust client prices)
- [ ] Validates each item is available
- [ ] Detects price tampering (client price ≠ DB price; reject if different)
- [ ] Calculates totals server-side (subtotal, delivery fee, total)
- [ ] Prevents negative totals
- [ ] Returns detailed error messages for validation failures
- [ ] Performance: <500ms for typical checkout

**Dependencies**: P4-T04, P2 (auth & authorization)

**Files/Modules Created**:
- `src/features/ordering/checkout-service.ts`
- `src/lib/pricing/calculate-total.ts`
- `src/lib/pricing/delivery-fee.ts`

**Checkout Validation Flow**:
```typescript
export async function validateCheckout({
  cartItems,
  deliveryAddressId,
  restaurantId
}) {
  // 1. Authenticate user
  // 2. Validate delivery address
  // 3. Validate restaurant availability
  // 4. Re-fetch items from DB
  // 5. Verify item availability
  // 6. Verify prices match
  // 7. Calculate totals
  // 8. Return validated order data or error
}
```

**Verification Steps**:
```bash
# Test case 1: Valid checkout
const result = await validateCheckout({...})
// Should return validated order

# Test case 2: Price tampered
// Client sends price_pkr: 100, DB has 500
// Should reject with "Price mismatch"

# Test case 3: Item unavailable
// Item set to is_available: false
// Should reject with "Item not available"
```

---

### P4-T06: Implement Order Creation with Duplicate Prevention

**Description**:
Create Server Action to create order in database with idempotency key to prevent duplicate submissions.

**Acceptance Criteria**:
- [ ] `src/features/ordering/create-order.ts` Server Action created
- [ ] Runs `validateCheckout()` first
- [ ] Generates idempotency key: `${userId}-${restaurantId}-${timestamp}`
- [ ] Checks for recent duplicate order (<30 seconds) with same key
- [ ] If duplicate detected: returns existing order reference
- [ ] Creates order atomically (order + order_items + order_status_history)
- [ ] Generates order reference: "FV-" + timestamp + random
- [ ] Order created with status "pending_confirmation"
- [ ] Order items store snapshots: name, price, quantity
- [ ] Delivery address stored as JSONB snapshot
- [ ] Returns order reference and confirmation data
- [ ] Clears cart after successful creation
- [ ] Transaction rolls back on any error

**Dependencies**: P4-T05

**Files/Modules Created**:
- `src/features/ordering/create-order.ts`
- `src/lib/utils/generate-order-reference.ts`

**Order Creation Process**:
```typescript
export async function createOrder({
  cartItems,
  deliveryAddressId,
  restaurantId
}) {
  // 1. Validate checkout
  // 2. Check for duplicate with idempotency key
  // 3. Begin transaction
  // 4. Create order row
  // 5. Create order_items rows (snapshots)
  // 6. Create order_status_history row (initial pending status)
  // 7. Commit transaction
  // 8. Clear cart
  // 9. Return { orderId, orderReference, total }
}
```

**Verification Steps**:
```bash
# Test case 1: Valid order creation
const order = await createOrder({...})
// Should return order reference

# Test case 2: Duplicate rapid resubmission
// Call createOrder twice in rapid succession (same data)
// Second call should return same order reference (not duplicate)
```

---

### P4-T07: Create Order Confirmation Page

**Description**:
Build confirmation page displayed after successful order creation. Show order reference, estimated delivery time, and next steps.

**Acceptance Criteria**:
- [ ] `src/app/(customer)/orders/[orderId]/confirmation.tsx` created
- [ ] Display "Order Confirmed!" message
- [ ] Show order reference prominently (e.g., "FV-20261025-000123")
- [ ] Show order summary: items, total, delivery address
- [ ] Show estimated delivery time (hardcoded estimate for MVP: 30 mins)
- [ ] "View Order Tracking" button
- [ ] "Continue Shopping" button
- [ ] "Back to Home" button
- [ ] Success animation/confetti (optional but nice UX)
- [ ] Responsive on mobile and desktop

**Dependencies**: P4-T06

**Files/Modules Created**:
- `src/app/(customer)/orders/[orderId]/confirmation.tsx`
- `src/components/checkout/order-confirmation.tsx`

**Verification Steps**:
```bash
npm run dev

Complete checkout
# Confirmation page shown
# Order reference displayed
# Can navigate to order tracking or home
```

---

### P4-T08: Implement Cart Persistence and Recovery

**Description**:
Ensure cart survives page refreshes and navigation. Implement recovery if user accidentally leaves checkout.

**Acceptance Criteria**:
- [ ] Cart persisted to localStorage on every change
- [ ] Cart restored on page load
- [ ] Cart cleared after successful order
- [ ] User can recover cart within session
- [ ] Stale items flagged: if menu item no longer exists, warn user on checkout
- [ ] Availability revalidated at checkout (serves as ultimate protection)

**Dependencies**: P4-T01, P4-T05

**Verification Steps**:
```bash
npm run dev

Add items to cart
Refresh page
# Cart items still there

Complete checkout and get confirmation
Refresh page
# Cart cleared
```

---

### P4-T09: Test Cart and Checkout Flows

**Description**:
Create comprehensive tests for cart operations, checkout validation, order creation, and duplicate prevention.

**Acceptance Criteria**:
- [ ] Unit tests for pricing calculations pass
- [ ] Unit tests for idempotency key generation pass
- [ ] Integration test: Add item to cart, update quantity, remove item
- [ ] Integration test: Complete checkout with valid data
- [ ] Integration test: Checkout fails with invalid address
- [ ] Integration test: Checkout fails with unavailable item
- [ ] Integration test: Price tampering detected and rejected
- [ ] Integration test: Duplicate order prevention works
- [ ] E2E test: Customer complete journey from browse → cart → checkout → confirmation
- [ ] All tests pass

**Dependencies**: P4-T01 through P4-T08

**Files/Modules Created**:
- `tests/unit/pricing.test.ts`
- `tests/unit/cart.test.ts`
- `tests/integration/checkout.test.ts`
- `tests/e2e/customer-checkout.spec.ts`

**Verification Steps**:
```bash
npm run test
npm run test:e2e

# All tests pass
```

---

## PHASE 5: Restaurant Dashboard

### Phase 5 Overview
Implement restaurant owner dashboard for menu management, incoming orders, and order status updates.

**Duration**: 1 week
**Prerequisite**: Phase 4 complete
**Go/No-Go**: Restaurant owners can view dashboard, manage menus, accept/reject orders, update order status

---

### P5-T01: Create Restaurant Owner Authentication and Profile

**Description**:
Implement restaurant owner login and profile setup. Allow owners to create restaurant info.

**Acceptance Criteria**:
- [ ] `src/app/restaurant/setup/page.tsx` created for restaurant setup
- [ ] Owner can input restaurant name, description, cuisine, phone, address, opening hours
- [ ] Upload restaurant image to Supabase Storage
- [ ] Restaurant created with owner_id linked to user
- [ ] Restaurant marked as pending approval initially
- [ ] Owner can edit restaurant info after creation
- [ ] Only owner can edit own restaurant

**Dependencies**: Phase 2 (Auth) complete, P3 (Restaurant model)

**Files/Modules Created**:
- `src/app/restaurant/setup/page.tsx`
- `src/app/restaurant/profile/page.tsx`
- `src/features/restaurants/update-restaurant.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

Sign up as restaurant_owner
Navigate to /restaurant/setup
Fill form with restaurant info
Upload image
Submit → Restaurant created in DB
```

---

### P5-T02: Create Restaurant Dashboard Layout

**Description**:
Build restaurant owner dashboard with sidebar navigation, menu management section, and orders section.

**Acceptance Criteria**:
- [ ] `src/app/restaurant/dashboard/page.tsx` created
- [ ] Sidebar with navigation: Menu, Orders, Settings, Profile
- [ ] Dashboard header showing restaurant name and status (pending/approved/available/unavailable)
- [ ] Quick stats: pending orders, total today's orders, total revenue
- [ ] Main content area for different sections
- [ ] Responsive: mobile-friendly sidebar, collapsible on small screens
- [ ] Consistent styling with customer interface

**Dependencies**: P5-T01

**Files/Modules Created**:
- `src/app/restaurant/dashboard/page.tsx`
- `src/app/restaurant/layout.tsx`
- `src/components/dashboards/restaurant-sidebar.tsx`
- `src/components/dashboards/restaurant-header.tsx`

**Verification Steps**:
```bash
npm run dev

Sign in as restaurant owner
Navigate to /restaurant/dashboard
# Dashboard shown with sidebar and content area
```

---

### P5-T03: Implement Menu Management (CRUD)

**Description**:
Create interface for restaurant owners to add, edit, and delete menu categories and items.

**Acceptance Criteria**:
- [ ] `src/app/restaurant/menu/page.tsx` created
- [ ] Display menu categories list
- [ ] "Add Category" button → form to create category
- [ ] Edit category: change name, display order
- [ ] Delete category: confirmation dialog, cascade to items
- [ ] For each category: list menu items
- [ ] "Add Item" button → form with name, description, price, image, availability
- [ ] Edit item: update any field
- [ ] Delete item: confirmation dialog
- [ ] Toggle item availability: quick on/off switch
- [ ] Images uploaded to Supabase Storage
- [ ] Validation: prices > 0, names required, etc.
- [ ] Success/error messages on save

**Dependencies**: P5-T02, P2 (Supabase setup)

**Files/Modules Created**:
- `src/app/restaurant/menu/page.tsx`
- `src/components/dashboards/menu-editor.tsx`
- `src/components/dashboards/category-form.tsx`
- `src/components/dashboards/item-form.tsx`
- `src/features/restaurants/update-menu.ts` (Server Actions: create, update, delete)

**Server Actions**:
```typescript
// Create/update/delete categories and items
export async function createCategory({ restaurantId, name, displayOrder }) { /* ... */ }
export async function updateMenuItem({ menuItemId, name, price, isAvailable }) { /* ... */ }
export async function deleteMenuItem({ menuItemId }) { /* ... */ }
```

**Verification Steps**:
```bash
npm run dev

Sign in as restaurant owner
Navigate to /restaurant/menu
Add category "Appetizers"
Add item "Spring Rolls" (300 PKR)
Edit price to 350 PKR
Toggle availability
Delete category → confirms deletion
```

---

### P5-T04: Implement Incoming Orders Display

**Description**:
Create section showing pending orders for the restaurant with detailed information and action buttons.

**Acceptance Criteria**:
- [ ] `src/app/restaurant/orders/pending/page.tsx` created
- [ ] List all orders in "pending_confirmation" status
- [ ] For each order: reference, customer name, delivery address, items ordered, total
- [ ] Order marked as "NEW" if < 5 minutes old
- [ ] Sound/visual notification for new orders (optional, nice-to-have)
- [ ] Auto-refresh every 5-10 seconds (or use real-time subscription for Phase 2+)
- [ ] Quick accept/reject buttons
- [ ] Empty state if no pending orders

**Dependencies**: P5-T02, P4 (Order creation)

**Files/Modules Created**:
- `src/app/restaurant/orders/page.tsx`
- `src/app/restaurant/orders/pending/page.tsx`
- `src/components/dashboards/order-card.tsx`
- `src/features/restaurants/get-restaurant-orders.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

As customer: Place order from restaurant
As restaurant owner: Navigate to /restaurant/orders
# New order shown in pending list
# Order reference, items, customer info displayed
# Accept/Reject buttons visible
```

---

### P5-T05: Implement Order Acceptance and Rejection

**Description**:
Add functionality for restaurant owners to accept or reject pending orders with optional reason for rejection.

**Acceptance Criteria**:
- [ ] "Accept" button: changes status to "confirmed", notifies customer
- [ ] "Reject" button: shows form for optional rejection reason
- [ ] Rejection reason persisted in order_status_history
- [ ] RLS enforces: owner can only accept/reject own restaurant's orders
- [ ] Order status updates immediately in UI
- [ ] Order removed from pending list after action
- [ ] Success message shown: "Order confirmed" or "Order rejected"
- [ ] Order transitions to appropriate next status

**Dependencies**: P5-T04, P2 (RLS & authorization)

**Files/Modules Created**:
- `src/features/restaurants/accept-order.ts` (Server Action)
- `src/features/restaurants/reject-order.ts` (Server Action)
- `src/components/dashboards/reject-dialog.tsx`

**Server Actions**:
```typescript
export async function acceptOrder({ orderId, restaurantId }) {
  // Validate restaurant owns order
  // Update order status to "confirmed"
  // Insert status history
  // Return success
}

export async function rejectOrder({ orderId, restaurantId, reason }) {
  // Validate restaurant owns order
  // Update order status to "rejected"
  // Insert status history with reason
  // Return success
}
```

**Verification Steps**:
```bash
npm run dev

Place order as customer
As restaurant owner: Accept order
# Order moved to "confirmed" status
# Customer sees order status updated
```

---

### P5-T06: Implement Order Status Updates (Preparing → Ready → Picked Up)

**Description**:
Allow restaurant owners to update order status through the fulfillment workflow: pending → confirmed → preparing → ready for pickup.

**Acceptance Criteria**:
- [ ] Create view showing orders in "confirmed" status
- [ ] "Start Preparing" button → changes to "preparing"
- [ ] "Mark Ready for Pickup" button → changes to "ready_for_pickup" and triggers rider notification
- [ ] All state transitions validated server-side
- [ ] RLS prevents updating unrelated orders
- [ ] Status timeline shows to customer in real-time
- [ ] Order removed from current section after transition
- [ ] Appears in next section (e.g., from "preparing" to "ready")

**Dependencies**: P5-T05, P2 (State machine validation)

**Files/Modules Created**:
- `src/app/restaurant/orders/preparing/page.tsx`
- `src/app/restaurant/orders/ready/page.tsx`
- `src/features/restaurants/update-order-status.ts` (Server Action)
- `src/lib/state-machine/order-transitions.ts` (validation logic)

**Verification Steps**:
```bash
npm run dev

As restaurant owner: Accept order (becomes "confirmed")
Click "Start Preparing" (becomes "preparing")
Click "Mark Ready" (becomes "ready_for_pickup")
# Each transition updates status and timeline
```

---

### P5-T07: Implement Order History View

**Description**:
Create view showing completed, rejected, and cancelled orders for the restaurant with filtering and search.

**Acceptance Criteria**:
- [ ] `src/app/restaurant/orders/history/page.tsx` created
- [ ] Filter by status: completed, rejected, cancelled
- [ ] Filter by date range
- [ ] Search by order reference or customer name
- [ ] Display order info: reference, items, total, completion time, date
- [ ] Show total orders count and revenue for date range
- [ ] Pagination for large order lists

**Dependencies**: P5-T06

**Files/Modules Created**:
- `src/app/restaurant/orders/history/page.tsx`
- `src/components/dashboards/order-history.tsx`

**Verification Steps**:
```bash
npm run dev

As restaurant owner: View order history
# Filter by status, date
# Search for order
# Results displayed with totals
```

---

### P5-T08: Add Restaurant Settings Page

**Description**:
Create settings page for restaurant owners to update restaurant info, opening hours, and availability.

**Acceptance Criteria**:
- [ ] `src/app/restaurant/settings/page.tsx` created
- [ ] Update restaurant name, description, cuisine, phone, address
- [ ] Update opening hours (JSONB editor)
- [ ] Toggle restaurant availability (close/open)
- [ ] Update restaurant image
- [ ] Save button with validation
- [ ] Success/error messages
- [ ] Only owner can access own restaurant settings

**Dependencies**: P5-T02

**Files/Modules Created**:
- `src/app/restaurant/settings/page.tsx`
- `src/components/dashboards/restaurant-settings-form.tsx`

**Verification Steps**:
```bash
npm run dev

As restaurant owner: Navigate to settings
Update restaurant info
Click Save
# Changes persisted in DB
```

---

### P5-T09: Test Restaurant Dashboard Features

**Description**:
Create comprehensive tests for menu management, order acceptance, and status updates.

**Acceptance Criteria**:
- [ ] Unit tests for state machine transitions pass
- [ ] Integration test: Restaurant owner can add menu category
- [ ] Integration test: Restaurant owner can add menu item
- [ ] Integration test: Restaurant owner cannot access other restaurant's data
- [ ] Integration test: Accept order → status changes
- [ ] Integration test: Reject order → reason stored
- [ ] E2E test: Full restaurant order workflow (receive → accept → prepare → ready)
- [ ] All tests pass

**Dependencies**: P5-T01 through P5-T08

**Files/Modules Created**:
- `tests/integration/restaurant-orders.test.ts`
- `tests/e2e/restaurant-workflow.spec.ts`

**Verification Steps**:
```bash
npm run test
npm run test:e2e

# All restaurant tests pass
```

---

## PHASE 6: Rider Workflow

### Phase 6 Overview
Implement rider dashboard for viewing assignments, accepting deliveries, and updating pickup/delivery status.

**Duration**: 1 week
**Prerequisite**: Phase 5 complete
**Go/No-Go**: Riders can view assignments, accept deliveries, update status

---

### P6-T01: Create Rider Profile and Dashboard

**Description**:
Implement rider signup/profile and dashboard showing assignments.

**Acceptance Criteria**:
- [ ] `src/app/rider/profile/page.tsx` created for profile setup
- [ ] Rider can input license, vehicle type, availability status
- [ ] `src/app/rider/dashboard/page.tsx` created
- [ ] Dashboard shows quick stats: total deliveries, earnings, rating
- [ ] Sidebar navigation: Available Assignments, Current Delivery, Earnings, History
- [ ] Only riders can access /rider routes (RLS enforced)

**Dependencies**: Phase 2 (Auth) complete, P5 (Restaurant workflow)

**Files/Modules Created**:
- `src/app/rider/setup/page.tsx`
- `src/app/rider/profile/page.tsx`
- `src/app/rider/dashboard/page.tsx`
- `src/app/rider/layout.tsx`
- `src/components/dashboards/rider-sidebar.tsx`
- `src/features/delivery/update-rider-profile.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

Sign up as rider
Navigate to /rider/setup
Enter profile info
Navigate to /rider/dashboard
# Dashboard shown
```

---

### P6-T02: Implement Available Assignments Display

**Description**:
Create view showing eligible delivery assignments (orders in "ready_for_pickup" status).

**Acceptance Criteria**:
- [ ] `src/app/rider/assignments/available/page.tsx` created
- [ ] Display list of orders in "ready_for_pickup" status
- [ ] For each assignment: restaurant name/address, customer delivery address, items summary, total
- [ ] Estimated delivery distance/time (hardcoded estimate for MVP)
- [ ] Accept button
- [ ] Auto-refresh every 10 seconds (or real-time in Phase 2+)
- [ ] Empty state if no available assignments
- [ ] Only show assignments when rider is online/available

**Dependencies**: P6-T01, P5 (Restaurant order workflow)

**Files/Modules Created**:
- `src/app/rider/assignments/available/page.tsx`
- `src/components/dashboards/assignment-card.tsx`
- `src/features/delivery/get-available-assignments.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

As customer: Place order
As restaurant: Accept and mark ready
As rider: Navigate to /rider/assignments/available
# Order shown as available assignment
```

---

### P6-T03: Implement Assignment Acceptance

**Description**:
Add functionality for riders to accept delivery assignments.

**Acceptance Criteria**:
- [ ] "Accept" button: assigns order to rider, changes status to "ready_for_pickup" with rider_id
- [ ] RLS prevents accepting unrelated assignments
- [ ] Duplicate acceptance prevented (unique constraint or server check)
- [ ] Assignment removed from "available" list
- [ ] Rider navigated to current delivery view
- [ ] Order status history updated with rider assignment
- [ ] Restaurant notified that rider assigned
- [ ] Customer notified that delivery is on the way

**Dependencies**: P6-T02, P2 (RLS & authorization)

**Files/Modules Created**:
- `src/features/delivery/accept-assignment.ts` (Server Action)

**Server Action**:
```typescript
export async function acceptAssignment({ orderId, riderId }) {
  // Validate rider is authenticated and available
  // Check order is in "ready_for_pickup" status
  // Assign rider to order
  // Update delivery_assignments table
  // Insert order_status_history
  // Return success
}
```

**Verification Steps**:
```bash
npm run dev

As rider: View available assignments
Click Accept
# Assignment accepted
# Moved to current delivery
```

---

### P6-T04: Implement Pickup and Delivery Status Updates

**Description**:
Allow riders to mark orders as picked up from restaurant and delivered to customer.

**Acceptance Criteria**:
- [ ] `src/app/rider/deliveries/current/page.tsx` created
- [ ] Show current delivery: restaurant, customer address, items
- [ ] "Mark Picked Up" button → changes status to "picked_up", records timestamp
- [ ] After pickup: shows delivery instructions and customer address
- [ ] "Mark Delivered" button → changes status to "delivered", records timestamp
- [ ] RLS prevents updating unrelated deliveries
- [ ] Status transitions validated server-side
- [ ] Order status timeline updated immediately
- [ ] Customer receives push notification (Phase 2+) or notification in app

**Dependencies**: P6-T03, P2 (State machine)

**Files/Modules Created**:
- `src/app/rider/deliveries/current/page.tsx`
- `src/app/rider/deliveries/[orderId]/page.tsx`
- `src/features/delivery/update-delivery-status.ts` (Server Action)

**Server Actions**:
```typescript
export async function markPickedUp({ orderId, riderId }) { /* ... */ }
export async function markDelivered({ orderId, riderId }) { /* ... */ }
```

**Verification Steps**:
```bash
npm run dev

As rider: Accept assignment
View current delivery
Click "Mark Picked Up"
# Status updates
Click "Mark Delivered"
# Status updates to delivered
```

---

### P6-T05: Implement Delivery History and Earnings

**Description**:
Create views showing completed deliveries and earnings summary.

**Acceptance Criteria**:
- [ ] `src/app/rider/earnings/page.tsx` created
- [ ] Display total earnings
- [ ] Filter by date range
- [ ] List completed deliveries: reference, restaurant, customer, distance, fee, completion time
- [ ] Running total of deliveries and earnings
- [ ] Basic statistics: avg delivery time, total distance

**Dependencies**: P6-T04

**Files/Modules Created**:
- `src/app/rider/earnings/page.tsx`
- `src/app/rider/deliveries/history/page.tsx`
- `src/components/dashboards/earnings-summary.tsx`

**Verification Steps**:
```bash
npm run dev

As rider: Complete several deliveries
View earnings page
# Total earnings displayed
# Delivery history listed
```

---

### P6-T06: Implement Rider Availability Toggle

**Description**:
Allow riders to toggle online/offline status.

**Acceptance Criteria**:
- [ ] Availability toggle in header or dashboard
- [ ] Rider marked as available/unavailable in `rider_profiles.is_available`
- [ ] When offline: no new assignments shown
- [ ] When online: available assignments displayed
- [ ] Changes reflected immediately

**Dependencies**: P6-T01

**Verification Steps**:
```bash
npm run dev

As rider: Toggle online/offline
When online: see available assignments
When offline: no assignments shown
```

---

### P6-T07: Test Rider Workflow Features

**Description**:
Create tests for assignment acceptance, status updates, and delivery tracking.

**Acceptance Criteria**:
- [ ] Integration test: Rider can accept assignment
- [ ] Integration test: Rider cannot accept order they don't own
- [ ] Integration test: Mark picked up → status changes
- [ ] Integration test: Mark delivered → status changes
- [ ] E2E test: Full delivery workflow (accept → pickup → deliver)
- [ ] All tests pass

**Dependencies**: P6-T01 through P6-T06

**Files/Modules Created**:
- `tests/integration/rider-delivery.test.ts`
- `tests/e2e/rider-workflow.spec.ts`

**Verification Steps**:
```bash
npm run test
npm run test:e2e

# All rider tests pass
```

---

## PHASE 7: Administrator Dashboard

### Phase 7 Overview
Implement admin dashboard for restaurant approvals, user management, order monitoring, and platform settings.

**Duration**: 1 week
**Prerequisite**: Phase 6 complete
**Go/No-Go**: Admins can manage restaurants, users, orders, and settings

---

### P7-T01: Create Admin Authentication and Dashboard

**Description**:
Implement admin-only access and dashboard with summary metrics.

**Acceptance Criteria**:
- [ ] `src/app/admin/dashboard/page.tsx` created
- [ ] Only users with role='admin' can access /admin routes
- [ ] Dashboard displays summary metrics:
  - Total customers, active restaurants, active riders, total orders today, total revenue today
- [ ] Sidebar navigation: Restaurants, Users, Orders, Riders, Settings
- [ ] Only admins can access admin routes (RLS enforced)

**Dependencies**: Phase 2 (Auth & RBAC) complete, P6 complete

**Files/Modules Created**:
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/layout.tsx`
- `src/components/dashboards/admin-sidebar.tsx`
- `src/features/admin/get-dashboard-metrics.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

Sign in as admin
Navigate to /admin/dashboard
# Dashboard with metrics shown
# Sidebar available

Sign in as customer
Navigate to /admin/dashboard
# Redirect to 403 Unauthorized
```

---

### P7-T02: Implement Restaurant Approval Workflow

**Description**:
Create interface for admins to review and approve pending restaurant registrations.

**Acceptance Criteria**:
- [ ] `src/app/admin/restaurants/pending/page.tsx` created
- [ ] Display list of restaurants with is_approved=false
- [ ] Show restaurant info: name, owner name, email, address, phone
- [ ] "Approve" button: sets is_approved=true, notifies owner
- [ ] "Reject" button: form for optional rejection reason, deletes restaurant, notifies owner
- [ ] Approval logged with timestamp and admin user

**Dependencies**: P7-T01, P5 (Restaurant creation)

**Files/Modules Created**:
- `src/app/admin/restaurants/pending/page.tsx`
- `src/app/admin/restaurants/page.tsx` (all restaurants)
- `src/features/admin/approve-restaurant.ts` (Server Action)
- `src/features/admin/reject-restaurant.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

Create restaurant as owner
As admin: View pending restaurants
Click Approve
# Restaurant now approved
# Owner notified
```

---

### P7-T03: Implement Restaurant Management

**Description**:
Allow admins to view all restaurants, suspend/activate, and manage status.

**Acceptance Criteria**:
- [ ] `src/app/admin/restaurants/page.tsx` created
- [ ] List all restaurants with status, owner, order count
- [ ] Search restaurants by name or owner
- [ ] Filter by approval status, availability
- [ ] Suspend restaurant: sets is_available=false, notifies owner
- [ ] Activate restaurant: sets is_available=true
- [ ] View restaurant details: orders, menu items, owner info
- [ ] Changes logged and visible to admins

**Dependencies**: P7-T02

**Verification Steps**:
```bash
npm run dev

As admin: View all restaurants
Search for restaurant
Suspend restaurant
# is_available set to false
# Customers cannot order from it
```

---

### P7-T04: Implement User Management

**Description**:
Allow admins to view and manage user accounts (customers, owners, riders).

**Acceptance Criteria**:
- [ ] `src/app/admin/users/page.tsx` created
- [ ] List all users with role, email, name, account status
- [ ] Search users by email or name
- [ ] Filter by role: customer, restaurant_owner, rider
- [ ] View user details: profile, addresses (for customers), associated restaurants (for owners)
- [ ] Suspend user: prevents login
- [ ] Activate user: restores access
- [ ] Admin cannot delete users (data preservation)

**Dependencies**: P7-T01, P2 (Profiles)

**Files/Modules Created**:
- `src/app/admin/users/page.tsx`
- `src/app/admin/users/[userId]/page.tsx`
- `src/features/admin/suspend-user.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

As admin: View users
Search for user
Suspend user
# User cannot log in
```

---

### P7-T05: Implement Order Monitoring

**Description**:
Create view for admins to monitor all platform orders with filtering and search.

**Acceptance Criteria**:
- [ ] `src/app/admin/orders/page.tsx` created
- [ ] Display all orders with: reference, customer, restaurant, status, total, date
- [ ] Filter by status, date range
- [ ] Search by order reference or customer name
- [ ] View order details: full summary, items, delivery address, timeline
- [ ] Admin can view order to resolve customer issues
- [ ] No order modification by admin (audit trail protection)

**Dependencies**: P7-T01, P4 (Orders)

**Files/Modules Created**:
- `src/app/admin/orders/page.tsx`
- `src/app/admin/orders/[orderId]/page.tsx`
- `src/features/admin/get-all-orders.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

As admin: View orders
Filter by date, status
Search for order
View order details
```

---

### P7-T06: Implement Rider Management

**Description**:
Allow admins to view, verify, and manage delivery riders.

**Acceptance Criteria**:
- [ ] `src/app/admin/riders/page.tsx` created
- [ ] List all riders with: name, email, vehicle, status, rating, delivery count
- [ ] View rider profile and verification documents
- [ ] Mark rider as verified/unverified
- [ ] Suspend rider: prevents new assignments
- [ ] Activate rider: restores access
- [ ] View rider delivery history and ratings

**Dependencies**: P7-T01, P6 (Rider profiles)

**Files/Modules Created**:
- `src/app/admin/riders/page.tsx`
- `src/app/admin/riders/[riderId]/page.tsx`
- `src/features/admin/verify-rider.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

As admin: View riders
Verify rider
Suspend rider
```

---

### P7-T07: Implement Platform Settings Management

**Description**:
Allow admins to configure delivery fees, commission rates, and support contact info.

**Acceptance Criteria**:
- [ ] `src/app/admin/settings/page.tsx` created
- [ ] Update delivery fee (base fee for MVP)
- [ ] Update commission percentage per restaurant
- [ ] Update support email and phone
- [ ] Preview impact of changes
- [ ] Changes applied immediately to new orders
- [ ] Confirmation dialog before saving

**Dependencies**: P7-T01, P2 (Platform settings table)

**Files/Modules Created**:
- `src/app/admin/settings/page.tsx`
- `src/features/admin/update-platform-settings.ts` (Server Action)

**Verification Steps**:
```bash
npm run dev

As admin: Navigate to settings
Update delivery fee
Save
# New orders use updated fee
```

---

### P7-T08: Add Admin Audit Logging

**Description**:
Implement logging of admin actions for accountability and troubleshooting.

**Acceptance Criteria**:
- [ ] All admin actions logged: approve/reject restaurant, suspend user, update settings
- [ ] Log includes: admin user, action, target, timestamp, details
- [ ] Admins can view audit log
- [ ] Optional: export logs for compliance

**Dependencies**: P7-T02 through P7-T07

**Files/Modules Created**:
- `src/lib/admin/audit-log.ts`
- `src/app/admin/audit-log/page.tsx` (optional)

**Verification Steps**:
```bash
# Admin actions are logged in database
SELECT * FROM admin_audit_log ORDER BY created_at DESC;
# Recent admin actions shown
```

---

### P7-T09: Test Admin Dashboard Features

**Description**:
Create comprehensive tests for admin operations.

**Acceptance Criteria**:
- [ ] Integration test: Admin can approve restaurant
- [ ] Integration test: Admin can suspend user
- [ ] Integration test: Admin can update settings
- [ ] Integration test: Customer cannot access admin panel
- [ ] E2E test: Admin workflow (approve restaurants, manage users, monitor orders)
- [ ] All tests pass

**Dependencies**: P7-T01 through P7-T08

**Files/Modules Created**:
- `tests/integration/admin-operations.test.ts`
- `tests/e2e/admin-workflow.spec.ts`

**Verification Steps**:
```bash
npm run test
npm run test:e2e

# All admin tests pass
```

---

## PHASE 8: Customer Support Chatbot

### Phase 8 Overview
Implement a deterministic FAQ/intent-based chatbot for customer support without requiring paid AI APIs.

**Duration**: 1 week
**Prerequisite**: Phase 7 complete
**Go/No-Go**: Chatbot functional; handles FAQs, order lookup, and navigation

---

### P8-T01: Create Chatbot UI Components

**Description**:
Build responsive chatbot launcher, chat panel, and message display.

**Acceptance Criteria**:
- [ ] `src/components/chatbot/chat-launcher.tsx` created (floating bubble)
- [ ] `src/components/chatbot/chat-panel.tsx` created (panel/modal for chat)
- [ ] `src/components/chatbot/message.tsx` created (message component)
- [ ] Launcher is floating button in bottom-right corner
- [ ] Click launcher → chat panel opens
- [ ] Panel shows conversation history
- [ ] Input field for user messages
- [ ] Send button or Enter to send
- [ ] Mobile: full-screen layout
- [ ] Desktop: panel overlay
- [ ] Keyboard accessible: arrow keys, Enter, Escape
- [ ] Does not cover important UI elements (checkout, cart)

**Dependencies**: Phase 1 (UI setup) complete, P4 (Checkout layout)

**Files/Modules Created**:
- `src/components/chatbot/chat-launcher.tsx`
- `src/components/chatbot/chat-panel.tsx`
- `src/components/chatbot/message.tsx`
- `src/components/chatbot/quick-actions.tsx`

**Verification Steps**:
```bash
npm run dev

Navigate to any page
Bottom-right: floating chatbot bubble visible
Click bubble → chat panel opens
Type message → message appears
Close panel → no disruption to main UI
```

---

### P8-T02: Implement Chatbot Intent Matching

**Description**:
Create deterministic intent matcher that recognizes customer questions and routes to appropriate responses.

**Acceptance Criteria**:
- [ ] `src/lib/support/chatbot-engine.ts` created
- [ ] Intent matching by keyword in user message
- [ ] Supported intents:
  - "restaurant_search": Show restaurants
  - "order_help": How to place order
  - "delivery_fee": Delivery fee info
  - "payment_help": Payment methods (cash-on-delivery)
  - "order_status": Check order status (authenticated)
  - "cancellation": Cancellation policy
  - "general_faq": General FAQs
  - "escalate": Contact support
- [ ] Fallback for unknown intent: "I don't understand; try..."
- [ ] Case-insensitive matching
- [ ] No hallucination; only return predefined responses

**Dependencies**: P8-T01

**Files/Modules Created**:
- `src/lib/support/chatbot-engine.ts`
- `src/lib/support/intent-matcher.ts`

**Intent Matcher Example**:
```typescript
const intents = {
  restaurant_search: {
    keywords: ["restaurant", "find", "show", "cuisine", "where"],
    response: "You can browse restaurants by cuisine or search by name.",
    action: "navigate_to_restaurants"
  },
  order_help: {
    keywords: ["how", "order", "place", "steps"],
    response: "Steps to order: 1) Browse restaurants 2) Select items 3) Checkout",
    action: "navigate_to_restaurants"
  },
  // ... more intents
};

function matchIntent(message: string): Intent | null {
  const lowerMessage = message.toLowerCase();
  for (const [name, intent] of Object.entries(intents)) {
    if (intent.keywords.some(kw => lowerMessage.includes(kw))) {
      return { name, ...intent };
    }
  }
  return null;
}
```

**Verification Steps**:
```bash
# Test intent matching
const intent = matchIntent("how do I place an order");
console.log(intent.name); // "order_help"

const intent2 = matchIntent("show me biryani");
console.log(intent2.name); // "restaurant_search"

const intent3 = matchIntent("xyzabc");
console.log(intent3); // null (fallback)
```

---

### P8-T03: Create FAQ Knowledge Base

**Description**:
Populate support_faqs table with common questions and answers for the chatbot.

**Acceptance Criteria**:
- [ ] `supabase/migrations/010_seed_faqs.sql` created
- [ ] Insert FAQs for:
  - How to register and create account
  - How to add delivery address
  - How to search for restaurants
  - How to place an order
  - What are delivery fees?
  - What payment methods are accepted?
  - How to cancel an order?
  - How to track my order?
  - Restaurant owner signup
  - Rider signup
  - Contact support
- [ ] FAQs include: question, answer, intent, keywords, priority
- [ ] At least 10-15 FAQs

**Dependencies**: P2-T05 (Platform admin tables)

**Files/Modules Created**:
- `supabase/migrations/010_seed_faqs.sql`

**FAQ Migration Example**:
```sql
INSERT INTO support_faqs (question, answer, intent, keywords, priority, is_active) VALUES
(
  'How do I place an order?',
  '1. Browse restaurants\n2. Select items from menu\n3. Review cart\n4. Checkout with delivery address\n5. Confirm payment method (cash on delivery)',
  'order_help',
  ARRAY['how', 'order', 'place', 'steps'],
  1,
  true
),
(
  'What are the delivery fees?',
  'Delivery fees are 100 PKR. Fees may vary by distance.',
  'delivery_fee',
  ARRAY['delivery', 'fee', 'cost', 'charge'],
  2,
  true
),
-- ... more FAQs
```

**Verification Steps**:
```bash
supabase migration up

SELECT * FROM support_faqs;
# At least 10 FAQs visible
```

---

### P8-T04: Implement FAQ Retrieval and Response

**Description**:
Create Server Action to fetch and format FAQ responses for matched intents.

**Acceptance Criteria**:
- [ ] `src/lib/support/faq-service.ts` created
- [ ] Fetch FAQ by intent
- [ ] Format response with links to relevant pages where applicable
- [ ] Return chatbot response and suggested action

**Dependencies**: P8-T03

**Files/Modules Created**:
- `src/lib/support/faq-service.ts`

**Verification Steps**:
```bash
const faq = await getFAQByIntent('order_help');
console.log(faq);
# Returns FAQ with question, answer, and links
```

---

### P8-T05: Implement Authenticated Order Status Lookup

**Description**:
Allow customers to ask chatbot "Where's my order?" and retrieve current status securely.

**Acceptance Criteria**:
- [ ] Chatbot recognizes intent: "order_status", "track_order", "where_my_order"
- [ ] If user authenticated: fetch their recent orders
- [ ] Display order reference, current status, estimated delivery time
- [ ] Show status timeline (pending → confirmed → preparing → pickup → delivered)
- [ ] If user not authenticated: prompt to log in
- [ ] RLS enforces: only see own orders
- [ ] No data leak: customer cannot see other customers' orders

**Dependencies**: P8-T02, P2 (Auth), P4 (Orders)

**Files/Modules Created**:
- `src/lib/support/order-lookup.ts` (Server Action)
- `src/components/chatbot/order-status-display.tsx`

**Server Action**:
```typescript
export async function getCustomerOrders(userId: string) {
  // Authenticate user
  // RLS ensures only user's orders returned
  // Return recent orders with status and timeline
}
```

**Verification Steps**:
```bash
# As authenticated customer
Chatbot: "Where's my order?"
# Shows recent orders with status

# As unauthenticated user
Chatbot: "Where's my order?"
# Prompts to log in
```

---

### P8-T06: Implement Quick Action Buttons

**Description**:
Add quick-reply action buttons for common tasks: "Browse Restaurants", "Help with Order", "Contact Support", etc.

**Acceptance Criteria**:
- [ ] Chatbot shows quick action buttons for common intents
- [ ] Click button → executes action (navigate, show FAQ, etc.)
- [ ] Actions include:
  - Browse Restaurants → navigate to /restaurants
  - Place Order → navigate to /restaurants
  - Check Order Status → show authenticated lookup or login prompt
  - Delivery FAQ → show FAQ
  - Contact Support → show email/form
- [ ] Mobile-friendly button layout
- [ ] Buttons responsive and touch-friendly

**Dependencies**: P8-T01, P8-T04

**Files/Modules Created**:
- `src/components/chatbot/quick-actions.tsx`

**Verification Steps**:
```bash
npm run dev

Open chatbot
Quick action buttons visible
Click "Browse Restaurants"
# Navigates to restaurant page
```

---

### P8-T07: Implement Chatbot API Endpoint

**Description**:
Create API route for chatbot message handling (in case frontend logic needs server-side processing).

**Acceptance Criteria**:
- [ ] `src/app/api/chatbot/message/route.ts` created (POST)
- [ ] Request: { message: string, conversationId: string, userId?: string }
- [ ] Server validates and sanitizes input
- [ ] Matches intent
- [ ] Fetches FAQ or retrieves order (if authenticated)
- [ ] Returns: { reply: string, intent: string, actions: Array }
- [ ] All validation on server

**Dependencies**: P8-T02 through P8-T06

**Files/Modules Created**:
- `src/app/api/chatbot/message/route.ts`

**Verification Steps**:
```bash
POST /api/chatbot/message
Body: { message: "how do I order", userId: "123" }
Response: { reply: "Steps to order...", intent: "order_help", actions: [...] }
```

---

### P8-T08: Add Chatbot Fallback and Error Handling

**Description**:
Implement graceful fallback when chatbot doesn't understand, and error handling for edge cases.

**Acceptance Criteria**:
- [ ] Unknown intent: "I'm not sure how to help with that. Try..."
- [ ] Offer to escalate: "Would you like to contact support?"
- [ ] Contact support option shows: email form or live chat link (Phase 2+)
- [ ] Chatbot failure doesn't break main app
- [ ] Error messages are user-friendly
- [ ] Fallback to navigation links for help

**Dependencies**: P8-T07

**Verification Steps**:
```bash
npm run dev

Type gibberish to chatbot
# "I don't understand" message + suggestions
Click "Contact Support"
# Shows contact form or email
```

---

### P8-T09: Implement Chatbot Persistence (Optional)

**Description**:
Optionally persist support conversations in database for admin review.

**Acceptance Criteria**:
- [ ] `support_conversations` and `support_messages` tables (created in P2-T05)
- [ ] Insert conversation record when chat starts
- [ ] Append message rows as user/chatbot exchange
- [ ] Retention policy: delete conversations older than 90 days
- [ ] Admin can view conversations for support analysis

**Dependencies**: P2-T05, P8-T08

**Files/Modules Created**:
- `src/lib/support/save-conversation.ts` (Server Action)

**Verification Steps**:
```bash
# Conversations persisted in DB
SELECT * FROM support_conversations;
# Recent conversations visible
```

---

### P8-T10: Test Chatbot Features

**Description**:
Create comprehensive tests for intent matching, FAQ retrieval, and order lookup.

**Acceptance Criteria**:
- [ ] Unit test: Intent matching for known questions
- [ ] Unit test: Fallback for unknown questions
- [ ] Integration test: Authenticated order lookup
- [ ] Integration test: Unauthenticated user cannot see others' orders
- [ ] E2E test: Customer uses chatbot to find restaurants
- [ ] E2E test: Customer checks order status via chatbot
- [ ] E2E test: Mobile chatbot interactions
- [ ] All tests pass

**Dependencies**: P8-T01 through P8-T09

**Files/Modules Created**:
- `tests/unit/chatbot-intent.test.ts`
- `tests/integration/chatbot-auth.test.ts`
- `tests/e2e/chatbot.spec.ts`

**Test Examples**:
```typescript
describe("Chatbot Intent Matching", () => {
  it("matches order help intent", () => {
    const intent = matchIntent("how do I place an order");
    expect(intent?.name).toBe("order_help");
  });

  it("returns null for unknown intent", () => {
    const intent = matchIntent("xyzabc random");
    expect(intent).toBeNull();
  });
});

describe("Authenticated Order Lookup", () => {
  it("customer can check own order status", async () => {
    const orders = await getCustomerOrders(customerId);
    expect(orders.length).toBeGreaterThan(0);
  });

  it("customer cannot see other customer's orders", async () => {
    // RLS test via Supabase
    // Attempt to query other user's orders
    // Should return empty
  });
});
```

**Verification Steps**:
```bash
npm run test
npm run test:e2e

# All chatbot tests pass
```

---

## PHASE 9: Integration & Quality Assurance

### Phase 9 Overview
Add comprehensive testing, verify responsive design, accessibility, and fix any regressions before deployment.

**Duration**: 1-2 weeks
**Prerequisite**: All Phases 1-8 complete
**Go/No-Go**: All tests pass; responsive on all viewports; no linting/type errors; ready for deployment

---

### P9-T01: Create End-to-End Customer Journey Tests

**Description**:
Implement comprehensive E2E tests for complete customer workflows from registration through delivery tracking.

**Acceptance Criteria**:
- [ ] E2E test: Customer registration → profile → address setup
- [ ] E2E test: Browse restaurants → search → view menu → add to cart
- [ ] E2E test: Checkout → order confirmation → order tracking
- [ ] E2E test: Order status updates (as restaurant accepts, prepares, ready)
- [ ] E2E test: Rider accepts and completes delivery
- [ ] E2E test: Customer views completed order
- [ ] All E2E tests pass

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/complete-customer-journey.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# All E2E tests pass
```

---

### P9-T02: Create End-to-End Restaurant Workflow Tests

**Description**:
Implement E2E tests for restaurant owner workflow.

**Acceptance Criteria**:
- [ ] E2E test: Restaurant owner signup → setup restaurant
- [ ] E2E test: Admin approves restaurant
- [ ] E2E test: Owner adds menu categories and items
- [ ] E2E test: Owner receives and accepts order
- [ ] E2E test: Owner marks order progress (preparing → ready)
- [ ] E2E test: Owner views order history
- [ ] All tests pass

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/restaurant-complete-workflow.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# Restaurant workflow E2E tests pass
```

---

### P9-T03: Create End-to-End Rider Workflow Tests

**Description**:
Implement E2E tests for delivery rider workflow.

**Acceptance Criteria**:
- [ ] E2E test: Rider signup and profile
- [ ] E2E test: Rider views available assignments
- [ ] E2E test: Rider accepts assignment
- [ ] E2E test: Rider marks picked up
- [ ] E2E test: Rider marks delivered
- [ ] E2E test: Rider views earnings
- [ ] All tests pass

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/rider-complete-workflow.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# Rider workflow E2E tests pass
```

---

### P9-T04: Create End-to-End Admin Workflow Tests

**Description**:
Implement E2E tests for administrator operations.

**Acceptance Criteria**:
- [ ] E2E test: Admin approves pending restaurant
- [ ] E2E test: Admin suspends/activates restaurant
- [ ] E2E test: Admin suspends/activates user
- [ ] E2E test: Admin updates platform settings
- [ ] E2E test: Admin monitors orders
- [ ] E2E test: Admin verifies rider
- [ ] All tests pass

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/admin-complete-workflow.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# Admin workflow E2E tests pass
```

---

### P9-T05: Test Responsive Design Across Viewports

**Description**:
Verify responsive layouts work correctly at all specified viewport sizes.

**Acceptance Criteria**:
- [ ] Create responsive test suite testing at: 320px, 375px, 768px, 1024px, 1440px
- [ ] Test layouts for:
  - Homepage with restaurant list
  - Restaurant menu page
  - Shopping cart
  - Checkout page
  - Restaurant dashboard
  - Rider dashboard
  - Admin dashboard
  - Chatbot on mobile
- [ ] All elements visible, no overflow, proper spacing
- [ ] Touch targets ≥44px on mobile
- [ ] Text readable without zooming
- [ ] Images scale appropriately

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/responsive.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# Responsive tests pass for all viewports
```

---

### P9-T06: Test Accessibility Basics

**Description**:
Verify basic accessibility compliance: semantic HTML, keyboard navigation, color contrast, alt text.

**Acceptance Criteria**:
- [ ] Semantic HTML used throughout (button, input, label elements)
- [ ] Form labels associated with inputs
- [ ] Keyboard navigation works: Tab to move, Enter to submit
- [ ] Focus indicators visible
- [ ] Alt text on images (food images, restaurant logos)
- [ ] Color contrast passes WCAG AA
- [ ] Not relying on color alone to communicate status
- [ ] Axe accessibility scan passes

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/accessibility.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# Accessibility tests pass
```

---

### P9-T07: Test Loading, Empty, and Error States

**Description**:
Verify all loading, empty, and error states display and function properly.

**Acceptance Criteria**:
- [ ] Loading skeletons shown while fetching data
- [ ] Empty states shown when no data available
- [ ] Error messages displayed with retry options
- [ ] Error boundaries prevent app crashes
- [ ] Graceful degradation on network errors
- [ ] User guided back to valid state from errors

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/e2e/error-states.spec.ts`

**Verification Steps**:
```bash
npm run test:e2e

# Error state tests pass
```

---

### P9-T08: Run Linting and Type Checking

**Description**:
Run TypeScript compiler, ESLint, and other code quality tools to catch issues.

**Acceptance Criteria**:
- [ ] `npx tsc --noEmit` passes (no TypeScript errors)
- [ ] `npm run lint` passes (no linting errors)
- [ ] No warnings (max-warnings = 0)
- [ ] All code formatted with Prettier
- [ ] No unused variables or imports
- [ ] All console warnings resolved

**Dependencies**: All Phases 1-8 complete

**Verification Steps**:
```bash
npx tsc --noEmit
# No errors

npm run lint
# No errors or warnings

npm run format
# Code formatted
```

---

### P9-T09: Run Full Test Suite

**Description**:
Execute all unit, integration, and E2E tests to ensure nothing is broken.

**Acceptance Criteria**:
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Code coverage ≥70% for critical paths (pricing, validation, auth)
- [ ] No flaky tests (tests pass consistently)
- [ ] Test execution time <5 minutes

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/ci.spec.ts` (optional CI test runner)

**Verification Steps**:
```bash
npm run test
# All unit and integration tests pass

npm run test:e2e
# All E2E tests pass

npm run build
# Production build succeeds
```

---

### P9-T10: Performance Optimization and Regression Testing

**Description**:
Optimize performance and verify no regressions from earlier phases.

**Acceptance Criteria**:
- [ ] Homepage loads in <3 seconds on 4G
- [ ] Restaurant search returns in <1 second
- [ ] Cart operations respond in <500ms
- [ ] Database queries optimized with indexes
- [ ] Images optimized and lazy-loaded
- [ ] Bundle size reasonable (<500KB gzipped)
- [ ] No console errors or warnings
- [ ] No broken links or 404s

**Dependencies**: All Phases 1-8 complete

**Files/Modules Created**:
- `tests/performance.spec.ts` (optional)

**Verification Steps**:
```bash
npm run build
# Check bundle size output

npm run dev
# Browser DevTools: check load times
# No console errors
```

---

### P9-T11: Create Known Issues and Workarounds Document

**Description**:
Document any known issues, workarounds, or limitations discovered during testing.

**Acceptance Criteria**:
- [ ] Document file created: `docs/KNOWN_ISSUES.md`
- [ ] Any known bugs listed with severity (low/medium/high)
- [ ] Workarounds documented where applicable
- [ ] Free-tier limitations noted
- [ ] Performance considerations documented
- [ ] Future optimization opportunities listed

**Dependencies**: P9-T01 through P9-T10

**Files/Modules Created**:
- `docs/KNOWN_ISSUES.md`

---

## PHASE 10: Deployment Readiness

### Phase 10 Overview
Prepare application for Vercel deployment, verify production configuration, and document deployment process.

**Duration**: 3-5 days
**Prerequisite**: Phase 9 complete (all tests passing)
**Go/No-Go**: Application deployed to Vercel; smoke tests pass; documentation complete

---

### P10-T01: Prepare Environment Variables for Production

**Description**:
Document and configure environment variables for production Vercel deployment.

**Acceptance Criteria**:
- [ ] `.env.example` updated with all required variables
- [ ] Supabase production project created
- [ ] Production NEXT_PUBLIC_SUPABASE_URL obtained
- [ ] Production NEXT_PUBLIC_SUPABASE_ANON_KEY obtained
- [ ] Production SUPABASE_SERVICE_ROLE_KEY obtained (for server only)
- [ ] NODE_ENV=production configured
- [ ] NEXT_PUBLIC_APP_URL set to production domain
- [ ] Documented how to set variables in Vercel dashboard
- [ ] No hardcoded secrets in code

**Dependencies**: Phase 9 complete

**Files/Modules Created**:
- `.env.example` (updated)
- `docs/DEPLOYMENT.md` (section on env vars)

**Verification Steps**:
```bash
# Verify no secrets in git history
git log --all --source --remotes --oneline | grep -i "key\|secret\|token"
# Should return nothing

# Verify .env.local in .gitignore
grep ".env.local" .gitignore
```

---

### P10-T02: Configure Supabase Production Project

**Description**:
Create and configure production Supabase project with proper security and backups.

**Acceptance Criteria**:
- [ ] Production Supabase project created
- [ ] Database created in Supabase
- [ ] Backups enabled (automatic daily)
- [ ] RLS policies applied to all tables
- [ ] Auth configured (email verification, password reset)
- [ ] Storage bucket configured for images
- [ ] Connection limits appropriate for free tier
- [ ] Monitoring and alerts configured (if available)

**Dependencies**: P10-T01

**Verification Steps**:
```bash
# Test production connection
# Use production Supabase credentials to connect
# Verify tables accessible
# Verify RLS policies active
```

---

### P10-T03: Apply Database Migrations in Production

**Description**:
Run all database migrations in production Supabase to create schema.

**Acceptance Criteria**:
- [ ] All migrations (001-010) applied in order
- [ ] Schema matches development environment
- [ ] Indexes created and working
- [ ] RLS policies active
- [ ] Seed data loaded (optional for production, but helpful for testing)
- [ ] No migration errors

**Dependencies**: P10-T02

**Files/Modules Created**:
- `docs/DATABASE_SETUP.md` (instructions for running migrations)

**Verification Steps**:
```bash
# In production Supabase dashboard
# Run migrations via CLI or manually
supabase migration up

# Verify tables created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
# Should show all tables: profiles, addresses, restaurants, etc.
```

---

### P10-T04: Configure Vercel Project

**Description**:
Connect GitHub repository to Vercel and configure deployment settings.

**Acceptance Criteria**:
- [ ] GitHub repository connected to Vercel
- [ ] Vercel project created for Foodverse
- [ ] Automatic deployments on push to main branch configured
- [ ] Environment variables added to Vercel dashboard
- [ ] Build command configured: `npm run build`
- [ ] Start command configured: `npm start`
- [ ] Production domain configured (if available)
- [ ] Preview deployments enabled for pull requests

**Dependencies**: P10-T01, P10-T02

**Verification Steps**:
```bash
# Push to main branch
git push origin main

# Vercel automatically builds and deploys
# Visit Vercel dashboard to verify build succeeded
# Check build logs for any errors
```

---

### P10-T05: Run Production Build Locally

**Description**:
Build application for production locally to catch any build-time issues before deployment.

**Acceptance Criteria**:
- [ ] `npm run build` succeeds without errors
- [ ] `.next/` directory created with optimized output
- [ ] No build warnings or errors
- [ ] Bundle size reasonable
- [ ] All environment variables resolved

**Dependencies**: P10-T03

**Verification Steps**:
```bash
npm run build
# Build succeeds

ls -la .next/
# Output files present

npm run start
# Production server starts at http://localhost:3000
```

---

### P10-T06: Create Production Smoke Test Checklist

**Description**:
Document smoke tests to verify production deployment works correctly.

**Acceptance Criteria**:
- [ ] Smoke test checklist created: `docs/SMOKE_TESTS.md`
- [ ] Tests verify:
  - [ ] Homepage loads
  - [ ] Supabase connection works
  - [ ] Auth signup/login works
  - [ ] Restaurant discovery works
  - [ ] Can browse menu
  - [ ] Can add to cart
  - [ ] Checkout works
  - [ ] Order persists
  - [ ] Restaurant dashboard accessible
  - [ ] Rider dashboard accessible
  - [ ] Admin dashboard accessible
  - [ ] Chatbot works
  - [ ] No console errors
  - [ ] Responsive on mobile

**Dependencies**: P10-T01 through P10-T05

**Files/Modules Created**:
- `docs/SMOKE_TESTS.md`

**Content Example**:
```markdown
# Production Smoke Tests

1. **Homepage Load**
   - [ ] Visit https://foodverse.vercel.app
   - [ ] Page loads in <3 seconds
   - [ ] Foodverse branding visible
   - [ ] No 404 or 500 errors

2. **Authentication**
   - [ ] Click "Sign Up"
   - [ ] Create test account
   - [ ] Receive email verification
   - [ ] Confirm email
   - [ ] Log in successfully
   - [ ] Profile page accessible

... (continue for all workflows)
```

---

### P10-T07: Document Deployment Process

**Description**:
Create comprehensive deployment documentation for future reference.

**Acceptance Criteria**:
- [ ] Deployment guide created: `docs/DEPLOYMENT.md`
- [ ] Step-by-step instructions for deploying to Vercel
- [ ] Supabase project setup documented
- [ ] Environment variable setup documented
- [ ] Database migration process documented
- [ ] Rollback procedures documented
- [ ] Troubleshooting guide included
- [ ] Free-tier limits and monitoring documented

**Dependencies**: All Phase 10 tasks

**Files/Modules Created**:
- `docs/DEPLOYMENT.md`
- `docs/SUPABASE_SETUP.md`
- `docs/ENVIRONMENT_VARIABLES.md`

---

### P10-T08: Document Database Backup and Recovery

**Description**:
Document backup, recovery, and data retention procedures.

**Acceptance Criteria**:
- [ ] Backup strategy documented (Supabase automatic backups)
- [ ] Recovery procedures documented
- [ ] Retention policy documented (support messages 90-day retention)
- [ ] Disaster recovery plan outlined
- [ ] Data export procedures documented for compliance

**Dependencies**: P10-T03

**Files/Modules Created**:
- `docs/BACKUP_RECOVERY.md`

---

### P10-T09: Document Free-Tier Limitations and Quotas

**Description**:
Create documentation about free-tier quotas, monitoring, and upgrade paths.

**Acceptance Criteria**:
- [ ] Document created: `docs/FREE_TIER_CONSTRAINTS.md`
- [ ] Supabase free-tier limits documented:
  - [ ] 500 MB database
  - [ ] 5 GB monthly bandwidth
  - [ ] 50 concurrent connections
  - [ ] Rate limits
- [ ] Vercel Hobby tier documented:
  - [ ] Deployment limits
  - [ ] Commercial use restrictions
- [ ] Monitoring procedures documented
- [ ] Upgrade paths documented (when to upgrade to paid tier)

**Dependencies**: All previous tasks

**Files/Modules Created**:
- `docs/FREE_TIER_CONSTRAINTS.md`

---

### P10-T10: Create Production Runbook

**Description**:
Document common operational procedures for running Foodverse in production.

**Acceptance Criteria**:
- [ ] Runbook created: `docs/RUNBOOK.md`
- [ ] Procedures documented:
  - [ ] Monitoring health checks
  - [ ] Restarting services
  - [ ] Reviewing logs
  - [ ] Handling common errors
  - [ ] Customer support procedures
  - [ ] Incident response
  - [ ] Performance troubleshooting
  - [ ] Database maintenance

**Dependencies**: All Phase 10 tasks

**Files/Modules Created**:
- `docs/RUNBOOK.md`

---

### P10-T11: Deploy to Vercel

**Description**:
Deploy application to Vercel production.

**Acceptance Criteria**:
- [ ] Push final code to GitHub main branch
- [ ] Vercel automatically builds and deploys
- [ ] Deployment succeeds without errors
- [ ] Production URL accessible
- [ ] No build warnings or errors in Vercel dashboard
- [ ] All environment variables set correctly

**Dependencies**: P10-T01 through P10-T10 complete, Phase 9 complete

**Verification Steps**:
```bash
git push origin main

# Wait for Vercel build to complete
# Check Vercel dashboard for successful deployment
# Visit production URL
```

---

### P10-T12: Run Production Smoke Tests

**Description**:
Manually execute smoke test checklist on deployed application to verify functionality.

**Acceptance Criteria**:
- [ ] All smoke tests pass on production
- [ ] No regressions from development
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Data persists across reloads
- [ ] Authentication works
- [ ] All user roles functional
- [ ] Responsive on mobile

**Dependencies**: P10-T11 (deployment complete)

**Verification Steps**:
Follow `docs/SMOKE_TESTS.md` checklist on production URL.

---

### P10-T13: Final Documentation and Go-Live

**Description**:
Complete all documentation and declare MVP ready for use.

**Acceptance Criteria**:
- [ ] README.md updated with latest info
- [ ] All docs in `docs/` directory complete
- [ ] Deployment verified to production
- [ ] Smoke tests all passing
- [ ] No critical bugs identified
- [ ] Team trained on operations and support
- [ ] Go-live announcement prepared

**Dependencies**: All Phase 10 tasks complete

**Files/Modules Modified**:
- `README.md` (final update)
- `docs/*` (all documentation complete)

---

## Summary

### Total Task Count: 143 Tasks

**Phase Breakdown**:
- Phase 1 (Foundation): 9 tasks
- Phase 2 (Auth & Security): 13 tasks
- Phase 3 (Restaurant Discovery): 9 tasks
- Phase 4 (Cart & Checkout): 9 tasks
- Phase 5 (Restaurant Dashboard): 9 tasks
- Phase 6 (Rider Workflow): 7 tasks
- Phase 7 (Admin Dashboard): 9 tasks
- Phase 8 (Chatbot): 10 tasks
- Phase 9 (QA): 11 tasks
- Phase 10 (Deployment): 13 tasks

**Total Estimated Duration**: 8-12 weeks with focused development

### Key Dependencies Map

```
Phase 1 (Foundation)
  ↓
Phase 2 (Auth & Security)
  ↓
Phase 3 (Restaurant Discovery) + Phase 4 (Cart) [parallel possible after P2]
  ↓
Phase 5 (Restaurant Dashboard)
  ↓
Phase 6 (Rider Workflow)
  ↓
Phase 7 (Admin Dashboard)
  ↓
Phase 8 (Chatbot) [could start parallel with P7]
  ↓
Phase 9 (QA)
  ↓
Phase 10 (Deployment)
```

### Parallelizable Work

After Phase 2 completes, some independent teams could work in parallel:
- **Track A**: Phase 3 + Phase 4 (Customer flows)
- **Track B**: Phase 5 (Restaurant dashboard)
- **Track C**: Phase 6 (Rider workflow)

After Phase 7 completes:
- Phase 8 (Chatbot) can start independently

### Quality Gates

✅ All phases include testing (unit, integration, E2E)
✅ Security validation explicit (RLS, authorization)
✅ Responsive design verified at all viewport sizes
✅ Accessibility basics covered
✅ No paid APIs or services required (free-tier only)
✅ Documentation at each major phase

### Next Steps

1. **Review Tasks**: Stakeholder review of task list and dependencies
2. **Prioritize**: Confirm phase order and any adjustments
3. **Implement**: Begin Phase 1 tasks
4. **Track Progress**: Update task status as work completes

---

**Status**: ✅ Task breakdown complete and ready for implementation
**Repository**: `001-foodverse-platform` branch
**All tasks mapped to specification and plan requirements**
