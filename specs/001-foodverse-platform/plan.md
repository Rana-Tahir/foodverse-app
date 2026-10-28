# Technical Implementation Plan: Foodverse Platform MVP

**Feature Branch**: `001-foodverse-platform`
**Created**: 2026-10-25
**Status**: Draft
**Input**: Comprehensive specification with 7 user stories, 240+ functional requirements, and 10 implementation phases

---

## 1. Executive Summary

Foodverse is a full-stack food delivery platform for Karachi, Pakistan. This technical plan outlines the architecture, technology stack, database design, security model, and phased implementation approach for an MVP supporting customers, restaurant owners, delivery riders, administrators, and an integrated support chatbot.

The plan prioritizes:
- **Secure, validated order workflows** with server-side enforcement
- **Free-tier deployment** on Vercel + Supabase with documented resource limits
- **Modular architecture** enabling independent feature development and testing
- **Complete API contracts** for all user interactions
- **Comprehensive security** via Supabase RLS and role-based authorization
- **Mobile-first responsive design** across all interfaces
- **Automated testing** for critical paths and business logic

**Estimated Scope**: 10 implementation phases; MVP completion estimated at 8-12 weeks with focused development.

---

## 2. Technology Stack Rationale

### Framework & Language

**Chosen: Next.js 14+ with App Router + TypeScript (strict)**

**Rationale**:
- App Router provides modern server/client component model with integrated API routes
- Server Actions enable secure server-side operations without manual API boilerplate
- TypeScript strict mode catches type errors at compile time, preventing runtime issues
- Excellent free-tier support on Vercel with zero-config deployment
- Large ecosystem and community support for food delivery domain

**Alternatives Considered**:
- Vue.js + Nuxt: More lightweight but smaller ecosystem for this domain
- Remix: Good choice but more operational complexity for free-tier deployment

### UI & Styling

**Chosen: Tailwind CSS + shadcn/ui + Lucide Icons**

**Rationale**:
- Tailwind provides utility-first CSS with mobile-first responsive design
- shadcn/ui offers pre-built accessible components (built on Radix UI) with minimal dependencies
- Lucide provides 1000+ clean SVG icons suitable for food delivery UX
- Zero runtime JavaScript overhead
- Easy to customize to match Foodverse branding

**Alternatives Considered**:
- Material-UI: Heavier, more opinionated design system
- Headless UI: Less comprehensive component library

### Backend & Database

**Chosen: Supabase (PostgreSQL) + Next.js Server Actions/Route Handlers**

**Rationale**:
- Supabase provides managed PostgreSQL with free-tier quota (500 MB, 50 connections)
- Built-in authentication (Supabase Auth) eliminates need for separate auth service
- Row Level Security (RLS) policies enforce authorization at database level (not just app logic)
- Supabase Storage handles image uploads within free-tier quota (100 MB)
- JavaScript client libraries simplify data access
- Real-time subscriptions available for order status updates (Phase 2+)

**Alternatives Considered**:
- Firebase/Firestore: Limited free tier, less control over schema
- MongoDB: Good for rapid development but less suited to relational ordering data
- Direct PostgreSQL hosting: Requires more DevOps knowledge for free tier

**Free-Tier Constraints**:
- 500 MB database (approx. 100K+ orders + images before concern)
- 50 concurrent connections
- 5 GB monthly outbound bandwidth
- 2 GB storage for Supabase Storage
- Rate limited to 5 req/s per IP on Auth endpoints

### Form Handling & Validation

**Chosen: React Hook Form + Zod**

**Rationale**:
- React Hook Form minimizes re-renders, critical for form-heavy interfaces (cart, checkout)
- Zod provides TypeScript-first schema validation with excellent error messages
- Server-side validation via Zod ensures untrusted input is caught early
- Works well with Next.js Server Actions

### Testing

**Chosen: Vitest (unit) + Playwright (e2e)**

**Rationale**:
- Vitest is fast, Vite-native, excellent for testing business logic
- Playwright provides browser automation for critical user journeys
- Both have strong free-tier support and no paid requirements
- Playwright can test across mobile, tablet, desktop viewports

### Hosting & Deployment

**Chosen: Vercel (Hobby tier) + GitHub**

**Rationale**:
- Vercel is built for Next.js with zero-config deployment
- GitHub integration enables automated deployments on push
- Free Hobby tier suitable for personal/non-commercial MVP development
- Automatic HTTPS, edge caching, preview deployments

**Commercial Upgrade Path**: If scaling beyond MVP, upgrade to Pro tier (20/month) or custom enterprise plan.

---

## 3. Architecture Overview

### Modular Monolithic Structure

Foodverse uses a **monolithic application** split into feature modules. No microservices for MVP; easier to deploy, test, and maintain.

```
Feature Modules:
├── auth/              Auth, profiles, role management
├── restaurants/       Discovery, search, menus
├── ordering/          Cart, checkout, order creation
├── orders/            Order tracking, status management
├── delivery/          Rider assignments, delivery workflows
├── admin/             Platform management, approvals
├── support/           Chatbot, FAQs, messaging
└── shared/            Validation, authorization, pricing, database access
```

### Separation of Concerns

**UI Layer** (React Components):
- Customer-facing pages and dashboards
- Restaurant owner interfaces
- Rider management
- Admin panels
- Chatbot UI

**Business Logic Layer** (`lib/` modules):
- Order state machine and transitions
- Pricing calculations
- Authorization rules
- Validation schemas
- Chatbot intent handling

**Data Access Layer** (`lib/supabase/`):
- Supabase client initialization
- Query helpers (with RLS enforcement)
- Server Actions for mutations
- Row Level Security policies

**API Layer** (Route Handlers):
- Chatbot API endpoints
- Webhook handlers (future: payment, SMS)
- Health checks

### Server-Side Validation

All security-sensitive operations validated on the server:
- **Authentication**: Verified via Supabase session
- **Authorization**: RLS policies + server checks
- **Data validation**: Zod schemas on API routes and Server Actions
- **Business rules**: Order transitions, pricing, availability verified server-side
- **Pricing**: Always calculated on server; never trust client totals

### Database-Level Security

Row Level Security (RLS) policies enforce authorization:
- Customers can only see their own orders and addresses
- Restaurant owners can only manage their restaurants
- Riders can only see assigned deliveries
- Admins have elevated permissions

---

## 4. Database Design

### Schema Overview

#### Identity & Access

```sql
-- User profiles with roles
profiles
  id (uuid, PK)
  email (text)
  full_name (text)
  phone_number (text)
  role (enum: customer, restaurant_owner, rider, admin)
  avatar_url (text, nullable)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Users can view own profile; admins can view all

-- Customer addresses
addresses
  id (uuid, PK)
  user_id (uuid, FK → profiles)
  street_address (text)
  area (text)
  city (text) -- "Karachi"
  postal_code (text, nullable)
  latitude (decimal)
  longitude (decimal)
  label (text) -- "Home", "Work", etc.
  is_default (boolean)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Customers can view/edit own addresses; others cannot

-- Restaurant profiles
restaurants
  id (uuid, PK)
  owner_id (uuid, FK → profiles)
  name (text)
  description (text)
  image_url (text, nullable) -- Supabase Storage
  cuisine_type (text) -- "Pakistani", "Chinese", etc.
  phone_number (text)
  address (text)
  opening_hours (jsonb) -- {"monday": {"open": "09:00", "close": "23:00"}, ...}
  is_approved (boolean) -- Admin approval required
  is_available (boolean)
  average_rating (decimal, nullable)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Owners can edit own restaurant; customers can view approved restaurants

-- Rider profiles
rider_profiles
  id (uuid, PK)
  user_id (uuid, FK → profiles)
  license_number (text, nullable)
  vehicle_type (text) -- "Motorcycle", "Bicycle"
  is_available (boolean)
  is_verified (boolean) -- Admin verification
  average_rating (decimal, nullable)
  total_deliveries (integer, default 0)
  earnings_total (decimal, default 0)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Riders can view own profile; admins can verify
```

#### Menus

```sql
-- Menu categories
categories
  id (uuid, PK)
  restaurant_id (uuid, FK → restaurants)
  name (text) -- "Appetizers", "Mains", "Beverages"
  display_order (integer)
  created_at (timestamp)
  RLS: Restaurant owners can manage own categories

-- Menu items (dishes)
menu_items
  id (uuid, PK)
  restaurant_id (uuid, FK → restaurants)
  category_id (uuid, FK → categories)
  name (text)
  description (text)
  price_pkr (decimal) -- Always in PKR; 2 decimal places
  image_url (text, nullable) -- Supabase Storage
  is_available (boolean)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Restaurant owners can edit own items; customers can view approved restaurants' items
```

#### Ordering

```sql
-- Orders
orders
  id (uuid, PK)
  order_reference (text, unique) -- "FV-20261025-000001"
  customer_id (uuid, FK → profiles)
  restaurant_id (uuid, FK → restaurants)
  rider_id (uuid, FK → rider_profiles, nullable) -- Assigned when ready
  delivery_address_snapshot (jsonb) -- Preserves address at order time
  payment_method (enum: cash_on_delivery)
  subtotal_pkr (decimal) -- Item totals
  delivery_fee_pkr (decimal)
  total_pkr (decimal) -- Calculated server-side
  current_status (enum: pending_confirmation, confirmed, preparing, ready_for_pickup, picked_up, delivered, rejected, cancelled)
  estimated_delivery_minutes (integer, nullable)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Customers see own orders; restaurants see their orders; riders see assigned orders; admins see all

-- Order items (snapshots)
order_items
  id (uuid, PK)
  order_id (uuid, FK → orders)
  menu_item_id (uuid, FK → menu_items, nullable) -- For reference; may be deleted
  item_name (text) -- Snapshot: name at order time
  item_price_pkr (decimal) -- Snapshot: price at order time
  quantity (integer)
  line_total_pkr (decimal) -- item_price * quantity
  created_at (timestamp)
  RLS: Inherited from orders

-- Order status history (audit log)
order_status_history
  id (uuid, PK)
  order_id (uuid, FK → orders)
  from_status (enum)
  to_status (enum)
  changed_by_user_id (uuid, FK → profiles)
  reason (text, nullable)
  created_at (timestamp)
  RLS: Customers/restaurants/riders see own; admins see all

-- Delivery assignments
delivery_assignments
  id (uuid, PK)
  order_id (uuid, FK → orders)
  rider_id (uuid, FK → rider_profiles)
  status (enum: pending, accepted, picked_up, delivered)
  accepted_at (timestamp, nullable)
  picked_up_at (timestamp, nullable)
  delivered_at (timestamp, nullable)
  created_at (timestamp)
  RLS: Riders see own assignments; restaurants/customers see related orders

-- Reviews (optional for MVP, basic implementation)
reviews
  id (uuid, PK)
  order_id (uuid, FK → orders)
  reviewer_id (uuid, FK → profiles)
  restaurant_id (uuid, FK → restaurants)
  rating (integer) -- 1-5
  comment (text, nullable)
  created_at (timestamp)
  RLS: Customers can create/view own; restaurants can view about self; admins see all
```

#### Platform Administration

```sql
-- Platform settings
platform_settings
  id (uuid, PK)
  delivery_fee_base_pkr (decimal) -- Base delivery fee
  delivery_fee_per_km (decimal, nullable) -- Future: distance-based
  min_order_value_pkr (decimal, default 0)
  commission_percentage (decimal) -- Commission per restaurant
  support_email (text)
  support_phone (text)
  updated_at (timestamp)
  RLS: Only admins can update

-- Support FAQs (chatbot knowledge base)
support_faqs
  id (uuid, PK)
  question (text)
  answer (text)
  intent (text) -- "order_help", "delivery_fee", "cancellation"
  keywords (text[]) -- For intent matching
  priority (integer) -- Display order
  is_active (boolean)
  created_at (timestamp)
  updated_at (timestamp)
  RLS: Public read; only admins can edit

-- Support conversations (optional persistence)
support_conversations
  id (uuid, PK)
  user_id (uuid, FK → profiles)
  started_at (timestamp)
  ended_at (timestamp, nullable)
  is_resolved (boolean)
  created_at (timestamp)
  RLS: Users see own; admins see all

-- Support messages (optional persistence)
support_messages
  id (uuid, PK)
  conversation_id (uuid, FK → support_conversations)
  sender_type (enum: user, chatbot)
  message_text (text)
  message_type (enum: text, suggestion, link)
  created_at (timestamp)
  RLS: Users see own conversations; admins see all
  -- Retention: Delete messages older than 90 days
```

### Key Design Decisions

1. **Order Item Snapshots**: Item name and price stored in `order_items` at order time. Preserves historical accuracy if restaurant menu changes.

2. **Delivery Address Snapshot**: Full address stored in `orders` as JSON, preventing address deletion from breaking order history.

3. **Status as Enum**: Using PostgreSQL `ENUM` type for order status enforces valid values at database level.

4. **Audit Trail**: `order_status_history` tracks all transitions with timestamps and authorized actors for compliance.

5. **Indexes**:
   - `orders(customer_id, created_at DESC)` for order history queries
   - `orders(restaurant_id, current_status)` for restaurant dashboard
   - `delivery_assignments(rider_id, status)` for rider assignments
   - `menu_items(restaurant_id, is_available)` for menu queries
   - `order_status_history(order_id, created_at)` for timeline

6. **No Soft Deletes**: Hard deletes allowed for categories/items (orders prevent cascade). Historical data preserved via snapshots.

---

## 5. Authentication & Authorization Model

### Supabase Auth Integration

```typescript
// User Registration Flow
1. User enters email, password, name via SignUp page
2. Supabase Auth creates user account and sends verification email
3. After email confirmation, user profile created in `profiles` table with role
4. Redirect to role-specific onboarding (customer → add address, restaurant → add details)

// User Login Flow
1. User enters email, password
2. Supabase Auth validates; returns JWT session
3. Next.js middleware validates session on protected routes
4. User role loaded from `profiles` table for authorization checks

// Session Management
- JWT stored in HTTP-only cookie by Supabase
- Middleware validates on each request
- Session expires after 24 hours (configurable)
- Logout clears cookie and redirects to login
```

### Role-Based Access Control (RBAC)

```typescript
Roles:
1. customer: Browse, order, track orders, access chatbot
2. restaurant_owner: Manage restaurant, menu, process orders
3. rider: Accept deliveries, update status, view earnings
4. admin: Manage all platform resources, approvals, settings

// Authorization Enforcement
- Server-side: Every API route checks user role via Supabase session
- Database-level: RLS policies prevent unauthorized queries
- Client-side: UI hidden based on role (NOT security layer; visual only)
```

### Row Level Security (RLS) Policies

```sql
-- Example: Customers can only view their own addresses
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_addresses_select ON addresses
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY customer_addresses_insert ON addresses
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY customer_addresses_update ON addresses
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY customer_addresses_delete ON addresses
  FOR DELETE USING (user_id = auth.uid());

-- Example: Restaurant owners can only edit their own restaurant
CREATE POLICY restaurant_owner_update ON restaurants
  FOR UPDATE USING (owner_id = auth.uid());

-- Example: Only approved restaurants visible to customers
CREATE POLICY restaurant_public_select ON restaurants
  FOR SELECT USING (is_approved = true OR owner_id = auth.uid());

-- Example: Riders can only see their assigned deliveries
CREATE POLICY rider_deliveries ON delivery_assignments
  FOR SELECT USING (rider_id = auth.uid() OR
                    order_id IN (SELECT id FROM orders WHERE rider_id = auth.uid()));

-- Example: Admins can see all orders
CREATE POLICY admin_orders_access ON orders
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### Key Security Principles

1. **Never trust client**: Always validate on server
2. **RLS is primary enforcement**: Database policies prevent unauthorized queries
3. **Service-role key never reaches client**: Used only in server Actions/handlers
4. **Session validation on every request**: Middleware checks Supabase session
5. **No privilege escalation**: Users cannot modify their own role
6. **Encrypted passwords**: Supabase Auth handles bcrypt hashing

---

## 6. Order Processing & Business Logic

### Order State Machine

```typescript
// Valid State Transitions
pending_confirmation → confirmed (restaurant accepts)
pending_confirmation → cancelled (customer or system timeout)
pending_confirmation → rejected (restaurant rejects)

confirmed → preparing (restaurant starts prep)
preparing → ready_for_pickup (restaurant marks ready)
ready_for_pickup → picked_up (rider picks up)
picked_up → delivered (rider delivers)

// Rejection & Cancellation (terminal states)
rejected → (cannot progress)
cancelled → (cannot progress)

// Actors & Permissions
pending_confirmation → confirmed: restaurant_owner only
confirmed → preparing: restaurant_owner only
preparing → ready_for_pickup: restaurant_owner only
ready_for_pickup → picked_up: rider only
picked_up → delivered: rider only

pending_confirmation → cancelled: customer or system (timeout)
pending_confirmation → rejected: restaurant_owner only
```

### Checkout & Order Creation Workflow

```typescript
// Step-by-step validation (all server-side)

1. USER SUBMITS CHECKOUT
   Input: { cartItems, deliveryAddressId }

2. VALIDATE AUTHENTICATION
   - Verify user session via Supabase
   - Reject if not authenticated

3. VALIDATE DELIVERY ADDRESS
   - Verify address belongs to user (RLS)
   - Verify address is complete (street, area, city, coords)
   - Optional: Verify address is within service area
   - Reject if invalid

4. VALIDATE CART & RESTAURANT
   - Verify all items belong to same restaurant
   - Fetch current restaurant from DB
   - Verify restaurant is_approved = true
   - Verify restaurant is_available = true
   - Verify restaurant is open (check opening_hours)
   - Reject if restaurant unavailable

5. REVALIDATE MENU ITEMS
   For each cart item:
   - Fetch current item from DB
   - Verify item.is_available = true
   - Verify item price matches current DB price (anti-tamper)
   - Mark unavailable items for removal
   - Reject order if critical items unavailable

6. CALCULATE TOTALS
   - Sum item quantities × current prices = subtotal
   - Fetch delivery_fee_base_pkr from platform_settings
   - Calculate total = subtotal + delivery_fee
   - Validate total > 0

7. PREVENT DUPLICATE SUBMISSIONS
   - Check for recent order (< 30 seconds) by same customer for same restaurant
   - Reject if duplicate detected

8. CREATE ORDER (Transaction)
   BEGIN TRANSACTION
   - Insert into orders: {customer_id, restaurant_id, totals, address_snapshot, status: "pending_confirmation"}
   - Insert into order_items: One row per item {order_id, name_snapshot, price_snapshot, quantity}
   - Insert into order_status_history: {order_id, "pending_confirmation", created_by: customer}
   COMMIT

9. RETURN CONFIRMATION
   - Generate order reference: "FV-" + timestamp + random
   - Return: {orderId, orderReference, total, estimatedDeliveryTime}
   - Redirect customer to confirmation page

10. NOTIFY RESTAURANT
    - Publish event: restaurant receives new order in real-time
    - Restaurant dashboard updates with new pending order
```

### Duplicate Order Prevention

Strategy: **Idempotency Key**

```typescript
// Client-side: Generate unique key on checkout submission
const idempotencyKey = `${userId}-${restaurantId}-${Date.now()}`;

// Server-side: Check for recent order with same key
SELECT * FROM orders
WHERE customer_id = $1
  AND created_at > NOW() - INTERVAL '30 seconds'
  AND idempotency_key = $2;

// If duplicate detected: Return existing order confirmation (don't create new)
// This ensures retries are safe
```

### Order State Transition Validation

```typescript
// Server-side: Before every state transition, validate

function validateStateTransition(
  order: Order,
  newStatus: OrderStatus,
  actor: User
): { valid: boolean; error?: string } {

  // Check actor has permission for this transition
  const allowedTransitions: Record<Role, Record<OrderStatus, OrderStatus[]>> = {
    restaurant_owner: {
      pending_confirmation: ["confirmed", "rejected"],
      confirmed: ["preparing"],
      preparing: ["ready_for_pickup"],
      // ... other states
    },
    rider: {
      ready_for_pickup: ["picked_up"],
      picked_up: ["delivered"],
      // ... only these two
    },
    customer: {
      pending_confirmation: ["cancelled"],
      confirmed: ["cancelled"],
      // ... limited options
    },
  };

  const permitted = allowedTransitions[actor.role]?.[order.status] || [];
  if (!permitted.includes(newStatus)) {
    return { valid: false, error: "Transition not allowed for your role" };
  }

  // Check business rules
  if (newStatus === "delivered" && order.status !== "picked_up") {
    return { valid: false, error: "Cannot deliver before pickup" };
  }

  if (order.status === "rejected" || order.status === "cancelled") {
    return { valid: false, error: "Cannot modify rejected or cancelled orders" };
  }

  return { valid: true };
}
```

---

## 7. Chatbot Support Architecture

### Chatbot Purpose & Scope

The chatbot helps customers with:
- **Restaurant & menu discovery**: "Show me biryani restaurants"
- **Order process guidance**: "How do I place an order?"
- **Platform information**: "What's the delivery fee?"
- **Order status** (authenticated): "Where's my order?"
- **FAQ lookup**: Common questions answered
- **Page navigation**: "Take me to my orders"
- **Escalation**: "Connect me to support" → email/form

### Implementation Strategy: Free-Tier First

**Phase 1 (MVP): Deterministic FAQ + Intent Matching**
- No AI API calls required
- Rule-based intent recognition
- Pattern matching on user input
- Links to relevant pages
- Fallback: "I don't understand; please visit [link]"

```typescript
// Intent-based routing
intents: {
  "restaurant_search": {
    keywords: ["restaurant", "show me", "find", "where", "cuisine"],
    action: () => navigateTo("/restaurants") // + params if extracted
  },
  "order_help": {
    keywords: ["order", "how to", "place"],
    action: () => showFAQ("How to place an order")
  },
  "delivery_fee": {
    keywords: ["delivery", "fee", "cost", "charge"],
    action: () => showFAQ("Delivery fees explained")
  },
  "order_status": {
    keywords: ["order", "status", "where", "track"],
    action: () => authenticate() && navigateTo("/orders")
  },
  "cancellation": {
    keywords: ["cancel", "refund", "change"],
    action: () => showFAQ("Cancellation policy")
  },
}

// User input → Intent matching
function matchIntent(userMessage: string): Intent | null {
  const words = userMessage.toLowerCase().split(/\s+/);
  for (const [intentName, intent] of Object.entries(intents)) {
    if (intent.keywords.some(kw => words.includes(kw))) {
      return { name: intentName, ...intent };
    }
  }
  return null;
}
```

### Chatbot UI

```
┌─────────────────────────────────┐
│      Foodverse Chat             │  ← Floating bubble in corner
│                                 │
│ Bot: "How can I help you?"      │
│                                 │
│ [Browse Restaurants]            │  ← Quick reply buttons
│ [How to Order]                  │
│ [Check My Order]                │
│ [FAQs]                          │
│ [Talk to Support]               │
│                                 │
│ You: (type your question)       │  ← Input field
└─────────────────────────────────┘
```

**Mobile Layout**: Full-screen overlay when opened
**Desktop Layout**: Fixed panel, bottom-right corner
**Keyboard**: Arrow keys to select, Enter to confirm
**Escape Key**: Close chatbot without disrupting order

### Chatbot Security Boundaries

```typescript
// Allowed Operations
✅ Display FAQ
✅ Link to public pages
✅ Retrieve authenticated user's own orders (with RLS)
✅ Navigate to restaurant/menu pages
✅ Accept user feedback/messages

// Forbidden Operations (enforced on server)
❌ Modify orders or other users' data
❌ Change prices or availability
❌ Grant privileges or modify roles
❌ Access other users' orders or addresses
❌ Expose API keys or database credentials
```

### Chatbot API Endpoint

```typescript
// POST /api/chatbot/message
Request: {
  message: string,
  conversationId: string,
  userId: string (optional)
}

Response: {
  reply: string,
  intent: string | null,
  suggestedActions: Array<{label, action}>,
  error?: string
}

// Server-side validation:
1. Sanitize input message
2. If intent requires auth (e.g., order_status): Verify user session
3. Match intent via pattern matching
4. Fetch FAQ or retrieve data from DB (respecting RLS)
5. Return response with safe links/actions
```

### Phase 2+ Enhancement

When a suitable free-tier AI provider emerges (or if explicitly approved):
- Replace intent matching with LLM
- Keep existing API contract unchanged
- Gradually migrate to AI responses
- Monitor for hallucinations and cost

---

## 8. Free-Tier Resource Planning

### Supabase Free Tier Limits

| Resource | Limit | Foodverse MVP Estimate | Status |
|----------|-------|------------------------|--------|
| Database Size | 500 MB | ~50 MB (small dataset) | ✅ Safe |
| Monthly Outbound | 5 GB | ~100-500 MB (typical usage) | ✅ Safe |
| Concurrent Connections | 50 | ~5-10 concurrent | ✅ Safe |
| Auth Rate Limit | 5 req/s | ~2-3 req/s typical | ✅ Safe |
| Storage | 1 GB (free) + 100 MB (rollover) | ~100-200 MB | ⚠️ Monitor |
| Inactivity Cleanup | 7 days no activity | Requires monthly usage | ⚠️ Monitor |

**Action Items**:
- Document monthly maintenance task (login to Supabase to prevent inactivity cleanup)
- Monitor storage usage; implement image compression (JPEG 80% quality)
- Set up alerts for quota approaching thresholds

### Vercel Hobby Tier

| Resource | Limit | Status |
|----------|-------|--------|
| Deployments per day | 100 | ✅ Safe (typical: 5-10) |
| Edge Middleware | Yes | ✅ Available |
| Build Duration | 45 minutes | ✅ Safe (typical: 2-3 min) |
| Serverless Functions | 24 hr max | ✅ Safe (typical API calls << 24h) |
| Concurrent Builds | 1 | ⚠️ Sequential deploys only |

**Limitation**: Hobby tier intended for personal use only. If commercializing, upgrade to Pro ($20/month).

### GitHub Free Tier

- Unlimited public/private repos ✅
- Unlimited Actions minutes for public repos ✅
- 2,000 Actions minutes/month for private repos ⚠️ (sufficient for MVP)

---

## 9. Project Structure

```
foodverse/
├── .specify/                    # Spec Kit workflows
│   ├── templates/
│   └── scripts/
├── .claude/                     # Claude Code context
├── specs/                       # Feature specifications
│   └── 001-foodverse-platform/
│       ├── spec.md
│       ├── plan.md              # (this file)
│       ├── tasks.md             # Generated after planning
│       └── checklists/
├── public/                      # Static assets (images, favicons)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (customer)/          # Grouped route: customer pages
│   │   │   ├── layout.tsx       # Customer layout
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── restaurants/
│   │   │   ├── menu/[restaurantId]/
│   │   │   ├── orders/
│   │   │   └── account/
│   │   ├── restaurant/          # Restaurant owner dashboard
│   │   │   ├── dashboard/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   ├── rider/               # Rider dashboard
│   │   │   ├── dashboard/
│   │   │   ├── deliveries/
│   │   │   └── earnings/
│   │   ├── admin/               # Admin dashboard
│   │   │   ├── dashboard/
│   │   │   ├── restaurants/
│   │   │   ├── users/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   ├── auth/                # Auth pages
│   │   │   ├── signup/
│   │   │   ├── login/
│   │   │   └── callback/
│   │   └── api/                 # API routes
│   │       ├── chatbot/
│   │       ├── auth/
│   │       └── webhooks/
│   ├── components/              # Reusable React components
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── layout/              # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── footer.tsx
│   │   ├── restaurants/         # Feature components
│   │   │   ├── restaurant-card.tsx
│   │   │   ├── restaurant-grid.tsx
│   │   │   └── search-bar.tsx
│   │   ├── menu/
│   │   │   ├── menu-item.tsx
│   │   │   ├── category-list.tsx
│   │   │   └── menu-page.tsx
│   │   ├── cart/
│   │   │   ├── cart-drawer.tsx
│   │   │   └── cart-summary.tsx
│   │   ├── checkout/
│   │   │   ├── address-selector.tsx
│   │   │   ├── order-summary.tsx
│   │   │   └── checkout-form.tsx
│   │   ├── orders/
│   │   │   ├── order-card.tsx
│   │   │   ├── status-timeline.tsx
│   │   │   └── order-details.tsx
│   │   ├── dashboards/          # Dashboard layouts
│   │   │   ├── restaurant-sidebar.tsx
│   │   │   ├── rider-sidebar.tsx
│   │   │   └── admin-sidebar.tsx
│   │   └── chatbot/             # Chatbot UI
│   │       ├── chat-launcher.tsx
│   │       ├── chat-panel.tsx
│   │       ├── message.tsx
│   │       └── quick-actions.tsx
│   ├── features/                # Feature-specific logic
│   │   ├── auth/
│   │   │   ├── auth-context.tsx
│   │   │   ├── use-auth.ts
│   │   │   └── protected-route.tsx
│   │   ├── restaurants/
│   │   │   ├── restaurant-service.ts
│   │   │   ├── search-restaurants.ts
│   │   │   └── get-menu.ts
│   │   ├── ordering/
│   │   │   ├── cart-context.tsx
│   │   │   ├── use-cart.ts
│   │   │   ├── checkout-service.ts
│   │   │   └── create-order.ts
│   │   ├── orders/
│   │   │   ├── order-service.ts
│   │   │   ├── get-order-status.ts
│   │   │   └── track-order.ts
│   │   ├── delivery/
│   │   │   ├── rider-service.ts
│   │   │   ├── get-assignments.ts
│   │   │   └── update-delivery.ts
│   │   ├── admin/
│   │   │   ├── admin-service.ts
│   │   │   ├── manage-restaurants.ts
│   │   │   └── platform-settings.ts
│   │   └── support/
│   │       ├── chatbot-engine.ts
│   │       ├── faq-service.ts
│   │       ├── intent-matcher.ts
│   │       └── message-handler.ts
│   ├── lib/                     # Shared utilities
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase client (browser)
│   │   │   ├── server.ts        # Supabase client (server)
│   │   │   ├── middleware.ts    # Auth middleware
│   │   │   └── rls-helpers.ts
│   │   ├── validation/
│   │   │   ├── schemas.ts       # Zod schemas
│   │   │   └── validators.ts
│   │   ├── authorization/
│   │   │   ├── permissions.ts
│   │   │   └── check-access.ts
│   │   ├── pricing/
│   │   │   ├── calculate-total.ts
│   │   │   ├── delivery-fee.ts
│   │   │   └── apply-commission.ts
│   │   ├── state-machine/
│   │   │   ├── order-transitions.ts
│   │   │   └── validate-transition.ts
│   │   ├── utils.ts             # Generic utilities
│   │   └── constants.ts         # App constants
│   └── types/                   # TypeScript types
│       ├── database.ts          # Database types (auto-generated from Supabase)
│       ├── orders.ts
│       ├── restaurants.ts
│       └── auth.ts
├── supabase/                    # Supabase configuration
│   ├── migrations/              # Database migrations (version-controlled)
│   │   ├── 001_init.sql
│   │   ├── 002_auth_setup.sql
│   │   ├── 003_rls_policies.sql
│   │   └── ...
│   └── seed.sql                 # Development seed data
├── tests/                       # Test suite
│   ├── unit/                    # Unit tests (Vitest)
│   │   ├── pricing.test.ts
│   │   ├── validation.test.ts
│   │   ├── state-machine.test.ts
│   │   └── chatbot.test.ts
│   ├── integration/             # Integration tests (Vitest + DB)
│   │   ├── auth.test.ts
│   │   ├── checkout.test.ts
│   │   ├── orders.test.ts
│   │   └── rls-policies.test.ts
│   └── e2e/                     # End-to-end tests (Playwright)
│       ├── customer-journey.spec.ts
│       ├── restaurant-workflow.spec.ts
│       ├── rider-workflow.spec.ts
│       ├── admin-operations.spec.ts
│       └── chatbot.spec.ts
├── .env.example                 # Example environment variables
├── .env.local                   # (git-ignored) Local secrets
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── CLAUDE.md                    # Claude Code rules
├── README.md                    # Setup & deployment docs
└── package.json
```

---

## 10. Testing Strategy

### Unit Tests (Vitest)

**Target**: Business logic with 80%+ coverage

```typescript
// tests/unit/pricing.test.ts
describe("Order Pricing", () => {
  it("calculates subtotal correctly", () => {
    const items = [
      { quantity: 2, price: 500 },
      { quantity: 1, price: 300 }
    ];
    expect(calculateSubtotal(items)).toBe(1300);
  });

  it("applies delivery fee", () => {
    const subtotal = 1000;
    const deliveryFee = 100;
    expect(calculateTotal(subtotal, deliveryFee)).toBe(1100);
  });

  it("prevents negative totals", () => {
    expect(calculateTotal(-100, 50)).toThrow();
  });
});

// tests/unit/state-machine.test.ts
describe("Order State Machine", () => {
  it("allows restaurant to confirm pending order", () => {
    const order = { status: "pending_confirmation" };
    const actor = { role: "restaurant_owner" };
    expect(validateTransition(order, "confirmed", actor)).toEqual({ valid: true });
  });

  it("prevents customer from confirming order", () => {
    const order = { status: "pending_confirmation" };
    const actor = { role: "customer" };
    expect(validateTransition(order, "confirmed", actor)).toEqual({
      valid: false,
      error: "Transition not allowed for your role"
    });
  });

  it("prevents delivery before pickup", () => {
    const order = { status: "ready_for_pickup" };
    const actor = { role: "rider" };
    expect(validateTransition(order, "delivered", actor)).toEqual({
      valid: false,
      error: "Cannot deliver before pickup"
    });
  });
});

// tests/unit/chatbot.test.ts
describe("Chatbot Intent Matching", () => {
  it("matches restaurant search intent", () => {
    const intent = matchIntent("show me biryani restaurants");
    expect(intent?.name).toBe("restaurant_search");
  });

  it("matches order help intent", () => {
    const intent = matchIntent("how do I place an order");
    expect(intent?.name).toBe("order_help");
  });

  it("returns null for unknown intent", () => {
    const intent = matchIntent("xyzabc random words");
    expect(intent).toBeNull();
  });
});
```

### Integration Tests (Vitest + Supabase)

**Target**: Database operations, RLS, authentication

```typescript
// tests/integration/rls-policies.test.ts
describe("RLS Policies", () => {
  beforeEach(async () => {
    // Create test users with different roles
    await createTestUser("customer1@test.com", "customer");
    await createTestUser("customer2@test.com", "customer");
  });

  it("customer cannot view other customer's addresses", async () => {
    const customer1Addresses = await supabaseClient
      .from("addresses")
      .select()
      .as(customer1Session);

    expect(customer1Addresses.data).not.toContainEqual(
      expect.objectContaining({ user_id: customer2Id })
    );
  });

  it("restaurant owner can only manage own restaurant", async () => {
    const restaurants = await supabaseClient
      .from("restaurants")
      .select()
      .as(restaurantOwnerSession);

    expect(restaurants.data?.length).toBe(1);
    expect(restaurants.data?.[0].owner_id).toBe(restaurantOwnerId);
  });
});

// tests/integration/checkout.test.ts
describe("Checkout & Order Creation", () => {
  it("prevents duplicate orders", async () => {
    const firstOrder = await createOrder(cartData);
    const secondOrder = await createOrder(cartData); // Same data, same timestamp

    // Second should be rejected or return existing
    expect(secondOrder).toEqual(firstOrder);
  });

  it("validates restaurant availability at checkout", async () => {
    await updateRestaurant(restaurantId, { is_available: false });

    const checkout = await createOrder(cartData);
    expect(checkout).toEqual({ error: "Restaurant is not available" });
  });

  it("revalidates menu prices before creating order", async () => {
    const cartItem = { menuItemId: 123, clientPrice: 500 };
    await updateMenuItem(123, { price_pkr: 600 }); // Price changed

    const order = await createOrder([cartItem]);
    // Order should use DB price (600), not client price (500)
    expect(order.items[0].itemPrice).toBe(600);
  });
});
```

### End-to-End Tests (Playwright)

**Target**: Complete user journeys across all roles

```typescript
// tests/e2e/customer-journey.spec.ts
test("Customer places order from discovery to confirmation", async ({ page }) => {
  // 1. Sign up and create account
  await page.goto("/");
  await page.click("text=Sign Up");
  await page.fill("input[name=email]", "test@example.com");
  await page.fill("input[name=password]", "password123");
  await page.fill("input[name=name]", "Test User");
  await page.click("button:has-text('Create Account')");

  // 2. Add delivery address
  await page.fill("input[name=address]", "123 Main St");
  await page.fill("input[name=area]", "Gulshan");
  await page.click("button:has-text('Save Address')");

  // 3. Browse restaurants
  await expect(page).toHaveURL("/restaurants");
  const restaurantCard = page.locator("text=Sample Restaurant");
  await expect(restaurantCard).toBeVisible();

  // 4. Click restaurant and view menu
  await restaurantCard.click();
  await expect(page).toHaveURL(/\/menu\/\d+/);

  // 5. Add item to cart
  const biryaniItem = page.locator("text=Biryani");
  await biryaniItem.click();
  await page.fill("input[name=quantity]", "2");
  await page.click("button:has-text('Add to Cart')");

  // 6. Proceed to checkout
  await page.click("button:has-text('Checkout')");
  await expect(page).toHaveURL("/checkout");

  // 7. Review order summary
  await expect(page.locator("text=Subtotal")).toContainText("1000");
  await expect(page.locator("text=Delivery Fee")).toContainText("100");
  await expect(page.locator("text=Total")).toContainText("1100");

  // 8. Place order
  await page.click("button:has-text('Place Order')");

  // 9. Confirm order created
  await expect(page).toHaveURL(/\/orders\/\w+/);
  await expect(page.locator("text=Order Reference")).toBeVisible();
  await expect(page.locator("text=Order confirmed!")).toBeVisible();
});

// tests/e2e/restaurant-workflow.spec.ts
test("Restaurant processes order from pending to ready", async ({ page }) => {
  // 1. Restaurant owner logs in
  await page.goto("/auth/login");
  await page.fill("input[name=email]", "restaurant@example.com");
  await page.fill("input[name=password]", "password");
  await page.click("button:has-text('Sign In')");

  // 2. View dashboard with pending orders
  await expect(page).toHaveURL("/restaurant/dashboard");
  const pendingOrder = page.locator("text=Order #FV-");
  await expect(pendingOrder).toBeVisible();

  // 3. Accept order
  await page.click("button:has-text('Accept')");
  await expect(pendingOrder).toContainText("Confirmed");

  // 4. Mark as preparing
  await page.click("button:has-text('Start Preparing')");
  await expect(pendingOrder).toContainText("Preparing");

  // 5. Mark as ready for pickup
  await page.click("button:has-text('Ready for Pickup')");
  await expect(pendingOrder).toContainText("Ready for Pickup");

  // Rider should now see this assignment
});

// tests/e2e/chatbot.spec.ts
test("Customer uses chatbot to find restaurants", async ({ page }) => {
  await page.goto("/");

  // Open chatbot
  await page.click("[data-testid=chatbot-launcher]");

  // Chatbot suggests actions
  await expect(page.locator("text=Browse Restaurants")).toBeVisible();

  // User clicks action
  await page.click("text=Browse Restaurants");

  // Chatbot responds with link
  await expect(page.locator("text=Visit our restaurant page")).toBeVisible();
});
```

### Responsive Testing

```typescript
// tests/e2e/responsive.spec.ts
const viewports = [
  { width: 320, height: 667, name: "Mobile Small" },
  { width: 375, height: 812, name: "Mobile" },
  { width: 768, height: 1024, name: "Tablet" },
  { width: 1024, height: 768, name: "Desktop" },
  { width: 1440, height: 900, name: "Desktop Large" }
];

viewports.forEach(({ width, height, name }) => {
  test(`Homepage renders correctly on ${name} (${width}x${height})`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");

    // Check no horizontal scrolling
    const windowWidth = await page.evaluate(() => window.innerWidth);
    const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth);

    // Check key elements visible
    await expect(page.locator("text=Foodverse")).toBeVisible();
    await expect(page.locator("text=Browse Restaurants")).toBeVisible();

    // Check touch targets > 44px on mobile
    if (width <= 768) {
      const buttons = await page.locator("button").all();
      for (const button of buttons) {
        const box = await button.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
```

### Quality Checks

```typescript
// Run before every deployment
test("TypeScript strict mode passes", async () => {
  const result = exec("npx tsc --noEmit");
  expect(result.code).toBe(0);
});

test("ESLint passes", async () => {
  const result = exec("npx eslint src/ --max-warnings 0");
  expect(result.code).toBe(0);
});

test("All unit and integration tests pass", async () => {
  const result = exec("npx vitest run");
  expect(result.code).toBe(0);
});

test("All end-to-end tests pass", async () => {
  const result = exec("npx playwright test");
  expect(result.code).toBe(0);
});
```

---

## 11. API Contracts & Endpoints

### Authentication Endpoints

```yaml
POST /api/auth/signup
  Request:
    email: string
    password: string
    fullName: string
    role: "customer" | "restaurant_owner" | "rider"
  Response:
    userId: uuid
    email: string
    sessionToken: string

POST /api/auth/login
  Request:
    email: string
    password: string
  Response:
    sessionToken: string
    user: { id, email, role }

POST /api/auth/logout
  Response:
    success: boolean

GET /api/auth/session
  Response:
    user: { id, email, role } | null
```

### Restaurant Discovery Endpoints

```yaml
GET /api/restaurants
  Query:
    search?: string
    cuisine?: string
    category?: string
    skip?: number
    limit?: number
  Response:
    restaurants: [{ id, name, cuisine, rating, imageUrl, isAvailable }]
    total: number

GET /api/restaurants/:id
  Response:
    id: uuid
    name: string
    description: string
    phone: string
    address: string
    opening_hours: object
    rating: decimal
    imageUrl: string

GET /api/restaurants/:id/menu
  Response:
    categories: [{ id, name, items: [{ id, name, price, description, imageUrl, isAvailable }] }]
```

### Order Management Endpoints

```yaml
POST /api/orders/create
  Request:
    cartItems: [{ menuItemId, quantity }]
    deliveryAddressId: uuid
  Response:
    orderId: uuid
    orderReference: string
    status: string
    total: decimal
    estimatedDeliveryMinutes: number

GET /api/orders/:id
  Response:
    id: uuid
    reference: string
    status: string
    items: [{ name, quantity, price }]
    total: decimal
    createdAt: timestamp
    statusHistory: [{ status, changedAt, changedBy }]

GET /api/orders
  Query:
    status?: string
    skip?: number
    limit?: number
  Response:
    orders: [{ id, reference, status, total, createdAt }]
    total: number

PUT /api/orders/:id/status
  Request:
    newStatus: string
    reason?: string
  Response:
    success: boolean
    order: { id, status, updatedAt }

POST /api/orders/:id/cancel
  Response:
    success: boolean
    order: { status: "cancelled" }
```

### Chatbot Endpoint

```yaml
POST /api/chatbot/message
  Request:
    message: string
    conversationId: string
    userId?: uuid
  Response:
    reply: string
    intent: string | null
    suggestedActions: [{ label, action, url? }]
    authenticated: boolean
```

---

## 12. Deployment & Infrastructure

### Environment Variables

```env
# .env.local (git-ignored; never commit)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (never expose to client)

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000 (or production domain)
NODE_ENV=development

# Optional: Analytics, error tracking (Phase 2+)
NEXT_PUBLIC_ANALYTICS_ID=...
```

### Vercel Deployment

**Steps**:
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Vercel automatically builds and deploys on push
5. Visit deployment URL to test

**Smoke Tests** (post-deployment):
```bash
1. curl https://foodverse.vercel.app/api/health
   Response: { status: "ok" }

2. Login with test account
   → Verify Supabase Auth works

3. Browse restaurants
   → Verify database connection

4. Create test order (dev data)
   → Verify checkout logic

5. Check mobile layout
   → Verify responsive CSS

6. Open chatbot
   → Verify chatbot API works
```

---

## 13. Implementation Phases

### Phase 1: Foundation (1 week)
- [ ] Next.js project initialization
- [ ] TypeScript strict mode setup
- [ ] Tailwind CSS + shadcn/ui components
- [ ] Supabase project creation
- [ ] Environment variables configuration
- [ ] Design tokens (colors, typography)
- [ ] Shared UI components (Button, Input, Card)
- [ ] README with setup instructions

### Phase 2: Authentication & Security (1-2 weeks)
- [ ] Supabase Auth integration
- [ ] User signup/login pages
- [ ] Session management middleware
- [ ] Role-based access control
- [ ] Protected routes
- [ ] Database migrations for profiles/addresses
- [ ] RLS policies implementation
- [ ] Unit tests for auth logic

### Phase 3: Restaurant Discovery (1-2 weeks)
- [ ] Homepage design
- [ ] Restaurant listing & search
- [ ] Filter by cuisine/category
- [ ] Restaurant detail page
- [ ] Menu display with categories
- [ ] Seed data (restaurants, items)
- [ ] Integration tests for search
- [ ] Responsive testing (mobile, tablet, desktop)

### Phase 4: Cart & Checkout (1-2 weeks)
- [ ] Cart context/state management
- [ ] Add/remove/update cart items
- [ ] Address selector
- [ ] Checkout page design
- [ ] Server-side order validation
- [ ] Order creation & persistence
- [ ] Duplicate order prevention
- [ ] Comprehensive checkout tests

### Phase 5: Restaurant Dashboard (1 week)
- [ ] Restaurant owner login
- [ ] Dashboard layout
- [ ] Menu management (CRUD)
- [ ] Incoming orders display
- [ ] Order acceptance/rejection
- [ ] Status update workflow
- [ ] Order history view
- [ ] Integration tests for restaurant operations

### Phase 6: Rider Workflow (1 week)
- [ ] Rider login & profile
- [ ] Available assignments display
- [ ] Accept assignment flow
- [ ] Pickup confirmation
- [ ] Delivery confirmation
- [ ] Earnings summary
- [ ] Delivery history

### Phase 7: Administrator Dashboard (1 week)
- [ ] Admin login & access control
- [ ] Restaurant approval workflow
- [ ] User/rider management
- [ ] Platform order monitoring
- [ ] Settings management (fees, commissions)
- [ ] Basic metrics/dashboard

### Phase 8: Chatbot Support (1 week)
- [ ] Chat UI (launcher, panel, messages)
- [ ] Intent matching engine
- [ ] FAQ knowledge base
- [ ] Restaurant/menu discovery via chat
- [ ] Order status lookup (authenticated)
- [ ] Chatbot API endpoint
- [ ] Chatbot tests

### Phase 9: Integration & Quality (1-2 weeks)
- [ ] End-to-end test suite
- [ ] Responsive testing all pages
- [ ] Accessibility audit (WCAG)
- [ ] Security review
- [ ] Performance optimization
- [ ] Bug fixes & regressions
- [ ] TypeScript compilation check
- [ ] ESLint & code quality

### Phase 10: Deployment (3-5 days)
- [ ] Production Supabase project setup
- [ ] Database migrations in production
- [ ] Environment variables configured
- [ ] Vercel deployment
- [ ] Smoke tests in production
- [ ] Documentation finalized
- [ ] Support runbook created

**Total Estimated Duration**: 8-12 weeks with focused development

---

## 14. Significant Technical Decisions (ADRs)

### Decision 1: Server Actions for Mutations

**Context**: Need to handle checkout, order creation, and other sensitive operations securely.

**Decision**: Use Next.js Server Actions for mutations rather than traditional API routes.

**Rationale**:
- Type-safe end-to-end (client → server with full TypeScript)
- Automatic CSRF protection
- Simpler code than manual API routes
- Server-side validation built-in
- Direct database access (RLS enforced)

**Alternative**: Traditional REST API routes
- Pro: More familiar for many developers
- Con: More boilerplate, separate request/response types, higher risk of forgetting validation

---

### Decision 2: RLS as Primary Authorization Layer

**Context**: Need to prevent customers from accessing other customers' data at database level.

**Decision**: Use Supabase RLS policies for all table access, not just app-level checks.

**Rationale**:
- Defense in depth: Even if app logic is bypassed, database prevents unauthorized access
- Centralized authorization logic
- Prevents accidental data leaks
- Database-native performance

**Alternative**: App-level authorization checks only
- Pro: Simpler to understand
- Con: Vulnerable if authorization checks are missed; performance penalty from large result sets

---

### Decision 3: Deterministic Chatbot (Phase 1) + AI (Phase 2+)

**Context**: Chatbot is required for MVP but free-tier LLM APIs are unreliable.

**Decision**: Build Phase 1 with rule-based intent matching; defer AI integration to Phase 2+.

**Rationale**:
- Free-tier ready: No paid API required
- Deterministic: Predictable behavior, easier testing
- Maintainable: FAQs and intents are simple to update
- Modular: Can swap intent matcher for LLM later without changing API contract

**Alternative**: LLM-powered chatbot from the start
- Pro: More sophisticated NLU
- Con: Requires paid API (OpenAI, Anthropic), unreliable free tier, cost concerns for MVP

---

### Decision 4: Flat Delivery Fee (Phase 1) + Distance-Based (Phase 2)

**Context**: Delivery fee calculation needs to be simple for MVP.

**Decision**: Use flat delivery fee in Phase 1; defer distance-based calculation to Phase 2+.

**Rationale**:
- Simple to implement: No geolocation API needed
- Fast calculation: O(1) lookup
- Easy to test
- Can upgrade to distance-based later

**Alternative**: Distance-based from the start
- Pro: More realistic pricing
- Con: Requires Google Maps/similar API (paid), adds complexity, geolocation data handling

---

### Decision 5: Monolithic Architecture (Phase 1) + Microservices (Future)

**Context**: Need to balance simplicity with scalability.

**Decision**: Single Next.js monolith for Phase 1; consider microservices only if scaling beyond MVP.

**Rationale**:
- Faster development: One codebase, shared database
- Easier testing: No inter-service communication to test
- Simpler deployment: Single Vercel instance
- Free-tier friendly: Fewer managed services

**Alternative**: Microservices from the start
- Pro: Independent scaling
- Con: Operational complexity, distributed testing, more managed services = higher costs

---

## 15. Plan Completion Checklist

- [x] Architecture consistent with specification (all 4 roles + chatbot)
- [x] Database model covers all workflows and entities
- [x] Security boundaries explicit (RLS, server-side validation, auth)
- [x] Free-tier constraints documented with monitoring plan
- [x] Dependencies between phases clear
- [x] Tests defined for critical paths
- [x] No unapproved paid services (Vercel Hobby, Supabase Free)
- [x] Implementation phases prioritized (P1 customer flows first)
- [x] Deployment strategy defined (GitHub + Vercel)
- [x] Assumptions documented (flat fees, deterministic chatbot, etc.)

---

## 16. Risk Analysis & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| Supabase free-tier inactivity cleanup | Data loss | Low | Monthly login; set calendar reminder |
| Image storage quota exhausted | Cannot upload images | Medium | Image compression (80% JPEG); monitor storage |
| Database size exceeds 500 MB | Queries slow, may exceed quota | Medium | Monitor row counts; archive old data; upgrade if needed |
| Vercel build timeout | Deployment fails | Low | Keep bundle lean; monitor build time |
| RLS policies misconfigured | Unauthorized data access | High | Thorough testing; peer review; integration tests |
| Duplicate order submissions bypass | Revenue loss | Medium | Idempotency key + DB constraint |
| Free-tier rate limits hit | API errors for users | Low | Monitor usage; queue long operations |

---

## 17. Next Steps

1. **Review Plan**: Stakeholder review and approval
2. **Generate Tasks**: Use `/sp.tasks` to create dependency-ordered implementation tasks
3. **Analyze Consistency**: Use `/sp.analyze` to validate spec, plan, and tasks
4. **Implement Phase 1**: Foundation (setup, design system, Supabase connection)
5. **Iterate**: Complete phases incrementally with testing and review

---

**Plan Status**: Ready for review and task generation
**Branch**: `001-foodverse-platform`
**Created**: 2026-10-25
