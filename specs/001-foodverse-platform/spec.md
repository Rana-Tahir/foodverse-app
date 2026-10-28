# Feature Specification: Foodverse — Food Delivery Platform MVP

**Feature Branch**: `001-foodverse-platform`
**Created**: 2026-10-25
**Status**: Draft
**Input**: Comprehensive food delivery platform specification with multi-role support, order lifecycle management, and free-tier deployment

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Customer Registration and Restaurant Discovery (Priority: P1)

A customer registers for Foodverse, completes their profile with delivery address, and browses available restaurants in Karachi.

**Why this priority**: Core entry point; enables all subsequent customer workflows. Without this, no orders can be placed.

**Independent Test**: Can be fully tested by registering a new customer account, adding a delivery address, and verifying restaurants are discoverable and display correctly. Delivers immediate value: customer can browse food options.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user, **When** they navigate to the homepage, **Then** they see the Foodverse branding, sign-up option, and sign-in links
2. **Given** a user completing registration, **When** they provide email, password, and name, **Then** the system creates an account and prompts for delivery address
3. **Given** a registered customer, **When** they add a delivery address with street, area, and coordinates, **Then** the system saves the address and marks it as default
4. **Given** a customer on the homepage, **When** they view the restaurant list, **Then** they see available restaurants with name, cuisine, rating, and availability status
5. **Given** a customer with multiple addresses, **When** they select a different address, **Then** restaurant list updates to show relevant options for that location

---

### User Story 2 - Browse Menu and Add to Cart (Priority: P1)

A customer selects a restaurant, browses its menu organized by categories, views item details with images and prices in PKR, and adds available items to their cart.

**Why this priority**: Critical customer workflow before checkout. Without this, customers cannot prepare orders.

**Independent Test**: Can be fully tested by selecting a restaurant, viewing categories, adding available items to cart, and verifying cart displays correct totals. Delivers immediate value: customer has a valid cart ready for checkout.

**Acceptance Scenarios**:

1. **Given** a customer viewing a restaurant, **When** they click on the restaurant card, **Then** the system displays restaurant details (name, description, image, cuisine, hours, availability) and organized menu categories
2. **Given** a customer viewing a menu category, **When** they expand a category, **Then** items display with images, names, descriptions, and prices in PKR
3. **Given** a customer selecting an available item, **When** they add it to the cart with quantity, **Then** the item appears in the cart with calculated subtotal
4. **Given** a customer with items from one restaurant in the cart, **When** they attempt to add items from another restaurant, **Then** the system explains the "one restaurant per order" policy and offers to replace or cancel the current cart
5. **Given** a customer with unavailable items in their cart, **When** they proceed to checkout, **Then** the system identifies and removes unavailable items with explanation

---

### User Story 3 - Checkout and Order Placement (Priority: P1)

A customer reviews their cart, confirms their delivery address, reviews order total with itemized breakdown and delivery fee, and places a cash-on-delivery order.

**Why this priority**: Completes customer's primary workflow and creates the order that drives revenue. No orders without this.

**Independent Test**: Can be fully tested by completing a full order from cart to confirmation. Delivers immediate value: order is placed, persisted, and visible in order history.

**Acceptance Scenarios**:

1. **Given** a customer with items in cart, **When** they proceed to checkout, **Then** the system displays order summary with items, quantities, prices, subtotal, delivery fee, and total in PKR
2. **Given** a customer on checkout, **When** they confirm their delivery address, **Then** the system validates the address is within service area (if applicable) and proceeds
3. **Given** a customer reviewing order total, **When** they review the breakdown, **Then** prices match current restaurant menu, delivery fee is correct, and math is accurate (validated server-side)
4. **Given** a customer placing an order, **When** they submit the order, **Then** the system validates all details server-side, prevents duplicate submissions, creates the order with a unique reference, and displays confirmation
5. **Given** a customer with a new order, **When** they are redirected to confirmation page, **Then** they see order reference, estimated delivery time, and can view the order in their history

---

### User Story 4 - Order Tracking and History (Priority: P2)

A customer views their current and historical orders, sees order progress in a timeline, understands the current status, and can view detailed order information.

**Why this priority**: Reduces customer anxiety and support burden. Enables customers to understand their delivery status. High value but slightly lower than core workflow.

**Independent Test**: Can be fully tested by placing an order, viewing it in the timeline, and verifying status transitions. Delivers immediate value: customer can track their order.

**Acceptance Scenarios**:

1. **Given** a customer with existing orders, **When** they navigate to their order history, **Then** they see current and past orders with reference, date, items summary, total, and current status
2. **Given** a customer viewing an active order, **When** they view order details, **Then** they see a timeline showing progression (confirmed → preparing → ready for pickup → picked up → delivered) with timestamps
3. **Given** a customer with an active order, **When** they refresh the page, **Then** the order status updates to reflect any changes made by the restaurant or rider
4. **Given** a customer with a completed order, **When** they view the order, **Then** they see final status, delivery time, and final total (with order items and prices locked as they were at time of order)
5. **Given** a customer with a cancellable order, **When** they cancel an order in pending/confirmed state, **Then** the system records the cancellation and updates status

---

### User Story 5 - Restaurant Owner Dashboard (Priority: P2)

A restaurant owner logs in to their dashboard, manages menu items (add/edit/delete categories and dishes), sets availability, and processes incoming orders (accept/reject/mark ready/mark picked up).

**Why this priority**: Required to fulfill customer orders. Without this, restaurants cannot manage their business. High importance but depends on customer orders existing.

**Independent Test**: Can be fully tested by logging in as restaurant owner, updating a menu item, receiving an order, and updating its status. Delivers immediate value: restaurant can operate independently.

**Acceptance Scenarios**:

1. **Given** a restaurant owner, **When** they log in, **Then** they see their restaurant dashboard with menu management, incoming orders, and order history sections
2. **Given** a restaurant owner viewing their menu, **When** they add a new dish category, **Then** the system saves the category and displays it in the restaurant menu immediately
3. **Given** a restaurant owner with a menu item, **When** they mark it as unavailable, **Then** the item no longer appears as available to customers (existing cart items are flagged at checkout)
4. **Given** a restaurant with an incoming order, **When** the owner views pending orders, **Then** they see order reference, customer delivery address, items ordered, and total amount
5. **Given** a restaurant owner with a pending order, **When** they accept the order, **Then** status changes to "Confirmed" and customer is notified; when they mark it "Ready for Pickup", status updates and a suitable rider is made aware
6. **Given** a restaurant owner viewing orders, **When** they reject a pending order with a reason, **Then** the order status changes to "Rejected" and the customer is notified (with refund logic, if applicable)

---

### User Story 6 - Rider Assignment and Delivery Management (Priority: P2)

A delivery rider logs in, views eligible delivery assignments, accepts assignments, marks orders as picked up from restaurant, and marks deliveries as completed.

**Why this priority**: Required to complete the delivery workflow. Without this, orders cannot reach customers. Critical for end-to-end functionality.

**Independent Test**: Can be fully tested by logging in as rider, accepting an assignment, and marking pickup and delivery. Delivers immediate value: order can be delivered.

**Acceptance Scenarios**:

1. **Given** a delivery rider, **When** they log in, **Then** they see their rider dashboard with available deliveries and assignment history
2. **Given** a rider viewing available assignments, **When** they see an order ready for pickup at a restaurant, **Then** they see restaurant name, address, customer delivery address, and items summary
3. **Given** a rider selecting an assignment, **When** they accept it, **Then** the system assigns the order to them, notifies the restaurant, and displays pickup instructions
4. **Given** a rider at the restaurant with an order, **When** they mark the order as "Picked Up", **Then** the status updates, customer is notified, and the rider sees the delivery destination
5. **Given** a rider arriving at the delivery location, **When** they mark the order as "Delivered", **Then** the status updates to "Delivered", customer is notified, and the order is complete
6. **Given** a rider with an accepted assignment, **When** they attempt to accept another conflicting assignment, **Then** the system prevents the conflict and informs them of current assignment

---

### User Story 7 - Administrator Platform Management (Priority: P3)

An administrator logs in to a secure dashboard, reviews and approves restaurant registrations, manages users and riders, monitors orders, and configures platform settings (delivery fees, commissions).

**Why this priority**: Enables platform operations and scaling. Important for business control but lower priority than core customer/restaurant/rider workflows.

**Independent Test**: Can be fully tested by logging in as admin, viewing dashboard metrics, and updating a platform setting. Delivers immediate value: admin can monitor and control the platform.

**Acceptance Scenarios**:

1. **Given** an administrator, **When** they log in, **Then** they see dashboard with metrics (total users, active restaurants, riders, orders today, revenue)
2. **Given** an admin viewing restaurant requests, **When** they approve a pending restaurant registration, **Then** the restaurant account becomes active and can accept orders
3. **Given** an admin viewing users, **When** they view a user account, **Then** they see account details, addresses, order history, and can modify account status (suspend/activate)
4. **Given** an admin in settings, **When** they update the delivery fee or commission rate, **Then** the system applies the new rates to future orders and displays confirmation
5. **Given** an admin monitoring orders, **When** they view the order monitor, **Then** they see real-time order status, can filter by date/restaurant/rider, and can view individual order details

---

### Edge Cases

- What happens when a customer attempts to checkout with an unavailable item? → Item is removed with explanation; customer can proceed with remaining items
- What happens if a restaurant goes offline during order preparation? → Order status is retained; rider notification is delayed until restaurant reconnects or admin intervenes
- What happens if a rider cancels an accepted delivery? → Order status reverts to "Ready for Pickup"; new rider assignment is triggered
- What happens if a customer attempts to place a duplicate order (rapid re-submission)? → Second submission is rejected with "order already placed" message
- What happens when delivery address is outside service area? → System validates and rejects at checkout with clear message
- What happens if menu prices change after an order is placed? → Order preserves original prices; items reflect new prices for future orders
- What happens during payment failure (if implemented later)? → Order fails to create; customer sees error; cart is preserved for retry

---

## Requirements *(mandatory)*

### Functional Requirements

#### Authentication & Authorization (FR-001 to FR-010)

- **FR-001**: System MUST allow customers to register with email, password, name, and phone number
- **FR-002**: System MUST authenticate users securely and maintain session state across page refreshes
- **FR-003**: System MUST enforce role-based access control (customer, restaurant owner, rider, administrator) with server-side and database-level validation
- **FR-004**: System MUST prevent customers from accessing other customers' orders, addresses, or payment information
- **FR-005**: System MUST prevent restaurant owners from accessing unrelated restaurant data or other restaurants' orders
- **FR-006**: System MUST prevent riders from accessing orders not assigned to them or other riders' delivery histories
- **FR-007**: System MUST provide secure sign-out that invalidates the user session
- **FR-008**: System MUST protect administrative functions with authentication and authorization checks
- **FR-009**: System MUST never expose service-role keys or privileged credentials in browser code
- **FR-010**: System MUST require HTTPS for all authentication requests

#### Customer Profile & Addresses (FR-011 to FR-020)

- **FR-011**: Customers MUST be able to create multiple delivery addresses (home, work, etc.)
- **FR-012**: Customers MUST be able to edit their delivery addresses (street, area, city, phone)
- **FR-013**: Customers MUST be able to set a default delivery address for quick checkout
- **FR-014**: Customers MUST be able to remove saved addresses
- **FR-015**: Customers MUST be able to update their profile (name, email, phone)
- **FR-016**: System MUST store delivery coordinates (latitude/longitude) for future distance/fee calculations
- **FR-017**: Customers MUST be able to view their account details and manage privacy settings
- **FR-018**: System MUST validate delivery address format and require complete information before saving
- **FR-019**: System MUST retrieve customer's addresses for cart and checkout without database queries from client
- **FR-020**: System MUST prevent customers from viewing or modifying addresses belonging to other users

#### Restaurant Discovery & Search (FR-021 to FR-035)

- **FR-021**: System MUST display a list of available restaurants on the homepage
- **FR-022**: System MUST allow customers to search restaurants by name
- **FR-023**: System MUST allow customers to search menu items by name across all restaurants (or within selected restaurant)
- **FR-024**: System MUST allow customers to filter restaurants by cuisine type
- **FR-025**: System MUST allow customers to filter restaurants by category (fast food, fine dining, etc.)
- **FR-026**: System MUST allow customers to filter restaurants by availability status
- **FR-027**: System MUST display restaurant card with name, image, cuisine, average rating (if available), and availability
- **FR-028**: System MUST prevent customers from ordering from unavailable or unapproved restaurants
- **FR-029**: System MUST show only restaurants within service area or clearly indicate out-of-area restaurants
- **FR-030**: System MUST cache restaurant data appropriately to reduce database queries
- **FR-031**: System MUST provide meaningful "no results" messaging when search yields no restaurants
- **FR-032**: System MUST support pagination or lazy loading for large restaurant lists
- **FR-033**: System MUST show restaurant opening hours and current availability status
- **FR-034**: System MUST sort restaurants by relevance, rating, or delivery time (if available)
- **FR-035**: System MUST ensure search and filter functionality remains responsive on mobile devices

#### Restaurant Details & Menu Management (FR-036 to FR-050)

- **FR-036**: System MUST display complete restaurant details (name, description, image, cuisine, hours, address, phone)
- **FR-037**: System MUST organize menu items into categories (appetizers, mains, desserts, beverages, etc.)
- **FR-038**: System MUST display food item with image, name, description, price in PKR, and availability status
- **FR-039**: System MUST clearly distinguish available items from unavailable items (grayed out, disabled, marked "Sold Out")
- **FR-040**: System MUST allow customers to select item quantity (1-99) when adding to cart
- **FR-041**: System MUST display clear error message if customer attempts to order an unavailable item
- **FR-042**: System MUST allow restaurant owners to create, edit, and delete menu categories
- **FR-043**: System MUST allow restaurant owners to add new dishes with name, description, price, image, and availability status
- **FR-044**: System MUST allow restaurant owners to update dish prices and descriptions
- **FR-045**: System MUST allow restaurant owners to toggle dish availability without deleting the dish
- **FR-046**: System MUST allow restaurant owners to set category-level visibility (e.g., hide "Breakfast" after 11 AM)
- **FR-047**: System MUST validate prices are positive numbers with up to 2 decimal places
- **FR-048**: System MUST support image uploads for restaurants and dishes within Supabase Storage quotas
- **FR-049**: System MUST prevent unauthorized modifications to other restaurants' menus
- **FR-050**: System MUST enforce maximum menu item count per restaurant based on platform policies

#### Shopping Cart (FR-051 to FR-065)

- **FR-051**: System MUST allow customers to add available items to cart with quantity
- **FR-052**: System MUST display cart with items, quantities, unit prices, and line totals
- **FR-053**: System MUST calculate and display cart subtotal (sum of all item totals)
- **FR-054**: System MUST calculate and display delivery fee based on delivery distance or flat rate
- **FR-055**: System MUST calculate and display final total (subtotal + delivery fee + taxes if applicable)
- **FR-056**: System MUST prevent customers from adding items from different restaurants in the same order
- **FR-057**: If customer attempts to add items from another restaurant, system MUST explain the restriction and offer to replace cart or cancel
- **FR-058**: System MUST allow customers to increase/decrease item quantities in cart
- **FR-059**: System MUST allow customers to remove items from cart
- **FR-060**: System MUST prevent invalid quantities (less than 1 or greater than reasonable limit)
- **FR-061**: System MUST persist cart in browser storage (localStorage) or server-side session
- **FR-062**: System MUST clear cart after successful order placement
- **FR-063**: System MUST validate that all items in cart are still available before checkout
- **FR-064**: System MUST show real-time cart totals as customer modifies quantities
- **FR-065**: System MUST support "Save for Later" or "Share Cart" features if explicitly specified (currently excluded)

#### Checkout & Order Creation (FR-066 to FR-085)

- **FR-066**: System MUST require a valid delivery address before checkout
- **FR-067**: System MUST display complete order summary before customer confirms
- **FR-068**: System MUST show itemized breakdown with item names, quantities, prices
- **FR-069**: System MUST show delivery fee calculation with transparency
- **FR-070**: System MUST show final total with all fees calculated
- **FR-071**: System MUST validate all prices and fees on the server (never trust client calculations)
- **FR-072**: System MUST revalidate restaurant availability at checkout
- **FR-073**: System MUST revalidate item availability for each cart item at checkout
- **FR-074**: System MUST revalidate current menu prices and use current prices for order creation
- **FR-075**: System MUST implement idempotency key or duplicate detection to prevent duplicate orders from rapid re-submissions
- **FR-076**: System MUST support cash-on-delivery payment method for MVP
- **FR-077**: System MUST create order only after ALL server-side validations pass
- **FR-078**: System MUST assign a unique, customer-facing order reference (e.g., "FV-12345678")
- **FR-079**: System MUST store order with status "Pending Confirmation" and creation timestamp
- **FR-080**: System MUST record order items as snapshots (name, price, quantity) to preserve historical accuracy
- **FR-081**: System MUST calculate order total using server-side logic and store calculated total
- **FR-082**: System MUST display order confirmation page with order reference, estimated delivery time, and next steps
- **FR-083**: System MUST notify restaurant immediately of new order
- **FR-084**: System MUST show actionable error messages when checkout fails (e.g., "Item no longer available", "Restaurant is now closed")
- **FR-085**: System MUST allow customers to retry checkout after addressing errors without losing cart

#### Order Tracking & History (FR-086 to FR-100)

- **FR-086**: System MUST display customer's current and historical orders in a list
- **FR-087**: System MUST show order reference, date, items summary, total, and current status for each order
- **FR-088**: System MUST display order progress as a timeline showing state transitions (Pending → Confirmed → Preparing → Ready → Picked Up → Delivered)
- **FR-089**: System MUST display timestamps for each status transition
- **FR-090**: System MUST allow customers to view detailed order information (all items, prices, delivery address, rider info when applicable)
- **FR-091**: System MUST update order status in real-time or on page refresh
- **FR-092**: System MUST allow customers to cancel orders in "Pending Confirmation" or "Confirmed" states only
- **FR-093**: System MUST prevent customers from modifying or cancelling completed, rejected, or cancelled orders
- **FR-094**: System MUST preserve historical order data with original item names, prices, and totals even if restaurant menu changes
- **FR-095**: System MUST allow customers to review completed orders and provide ratings/feedback
- **FR-096**: System MUST not claim live GPS tracking unless actual location integration is implemented
- **FR-097**: System MUST display "Estimated Delivery Time" based on preparation + delivery time (if data available)
- **FR-098**: System MUST show rider name and contact information (phone) once rider is assigned
- **FR-099**: System MUST allow customers to contact rider or restaurant through the platform (basic messaging)
- **FR-100**: System MUST support order filtering (current, completed, cancelled) and sorting (newest first, oldest first)

#### Restaurant Owner Dashboard (FR-101 to FR-120)

- **FR-101**: System MUST provide protected dashboard accessible only to authenticated restaurant owners
- **FR-102**: System MUST display incoming orders in real-time with clear visual indicators for new orders
- **FR-103**: System MUST show order details: items ordered, quantities, delivery address, customer contact
- **FR-104**: System MUST allow restaurant owners to accept pending orders and update status to "Confirmed"
- **FR-105**: System MUST allow restaurant owners to reject pending orders with optional reason
- **FR-106**: System MUST allow restaurant owners to mark accepted orders as "Preparing"
- **FR-107**: System MUST allow restaurant owners to mark orders as "Ready for Pickup" (triggers rider notification)
- **FR-108**: System MUST prevent status transitions that violate the order state machine (e.g., cannot mark "Delivered")
- **FR-109**: System MUST prevent restaurants from accepting orders when the restaurant is marked unavailable/closed
- **FR-110**: System MUST prevent unauthorized restaurant owners from modifying other restaurants' orders
- **FR-111**: System MUST display menu management interface with category and item listing
- **FR-112**: System MUST allow restaurants to bulk edit availability (e.g., "Mark all items available" or "Close kitchen")
- **FR-113**: System MUST display order history with filters (date range, status, customer)
- **FR-114**: System MUST display basic sales summaries (total orders, revenue by period)
- **FR-115**: System MUST allow restaurant owners to update restaurant information (hours, phone, address)
- **FR-116**: System MUST support restaurant image upload and menu item images
- **FR-117**: System MUST notify restaurants of pending order acceptance timeout (if auto-reject after 5 min, for example)
- **FR-118**: System MUST track average order preparation time for each restaurant
- **FR-119**: System MUST display customer ratings and reviews for the restaurant
- **FR-120**: System MUST prevent restaurants from accessing admin functions or other restaurants' data

#### Delivery Rider Management (FR-121 to FR-140)

- **FR-121**: System MUST provide protected rider dashboard accessible only to authenticated riders
- **FR-122**: System MUST display list of eligible delivery assignments (orders marked "Ready for Pickup")
- **FR-123**: System MUST show assignment details: restaurant name/address, customer delivery address, order items summary, total, estimated distance
- **FR-124**: System MUST allow riders to accept available assignments
- **FR-125**: System MUST prevent duplicate or conflicting assignments (rider cannot be assigned two orders simultaneously in MVP)
- **FR-126**: System MUST update order status to "Picked Up" when rider confirms pickup at restaurant
- **FR-127**: System MUST update order status to "Delivered" when rider confirms delivery at customer address
- **FR-128**: System MUST prevent unauthorized riders from modifying unassigned orders
- **FR-129**: System MUST display rider's current assignment details prominently
- **FR-130**: System MUST show rider earnings summary (total deliveries, earnings, average rating)
- **FR-131**: System MUST allow riders to update availability status (online/offline/on-break)
- **FR-132**: System MUST only show assignments to riders who are marked as online and available
- **FR-133**: System MUST display rider rating and review history (from customers)
- **FR-134**: System MUST prevent riders from cancelling accepted assignments except through admin intervention
- **FR-135**: System MUST track delivery history with completion times for analytics
- **FR-136**: System MUST support rider document uploads (license, insurance) for verification
- **FR-137**: System MUST allow riders to accept or decline assignments (not forced assignment in MVP)
- **FR-138**: System MUST notify riders in real-time of new eligible assignments
- **FR-139**: System MUST calculate and display delivery fee for each assignment (rider sees their portion)
- **FR-140**: System MUST prevent riders from accessing customer personal information beyond delivery address

#### Administrator Dashboard (FR-141 to FR-160)

- **FR-141**: System MUST provide secure admin dashboard with authentication and authorization
- **FR-142**: System MUST display summary metrics: total customers, active restaurants, active riders, total orders, revenue
- **FR-143**: System MUST display restaurant registration requests with approval/rejection workflow
- **FR-144**: System MUST allow admins to approve restaurant registration and activate restaurant account
- **FR-145**: System MUST allow admins to reject restaurant registration with reason
- **FR-146**: System MUST display admin controls for suspending/activating restaurants and riders
- **FR-147**: System MUST display user management interface with customer, restaurant, and rider lists
- **FR-148**: System MUST allow admins to view individual user/restaurant/rider profiles and account details
- **FR-149**: System MUST allow admins to update user account status (active, suspended, verified)
- **FR-150**: System MUST display real-time order monitor showing all platform orders by status
- **FR-151**: System MUST allow admins to filter and search orders
- **FR-152**: System MUST allow admins to view detailed order information and override order status (if necessary for support)
- **FR-153**: System MUST allow admins to manage food categories available to restaurants
- **FR-154**: System MUST allow admins to configure platform settings: delivery fees, commission rates, support contact
- **FR-155**: System MUST display confirmation dialog before consequential admin actions (suspending restaurant, changing commissions)
- **FR-156**: System MUST log all admin actions with timestamps for audit trail
- **FR-157**: System MUST restrict admin functions to users with admin role
- **FR-158**: System MUST display complaint or reported issue log (if review feature is implemented)
- **FR-159**: System MUST allow admins to generate basic reports (orders by date, revenue, top restaurants)
- **FR-160**: System MUST prevent admins from accessing other admins' credentials or actions

#### Order Lifecycle & State Machine (FR-161 to FR-175)

- **FR-161**: System MUST implement a validated order state machine with defined transitions
- **FR-162**: Supported order states: Pending Confirmation, Confirmed, Preparing, Ready for Pickup, Picked Up, Delivered, Rejected, Cancelled
- **FR-163**: System MUST validate all state transitions on the server
- **FR-164**: Only restaurants can transition: Pending Confirmation → Confirmed or Rejected
- **FR-165**: Only restaurants can transition: Confirmed → Preparing
- **FR-166**: Only restaurants can transition: Preparing → Ready for Pickup
- **FR-167**: Only riders can transition: Ready for Pickup → Picked Up
- **FR-168**: Only riders can transition: Picked Up → Delivered
- **FR-169**: Customers can transition: Pending Confirmation or Confirmed → Cancelled (if policy allows)
- **FR-170**: System MUST prevent invalid transitions (e.g., cannot mark Delivered without Picked Up first)
- **FR-171**: System MUST prevent rejected or cancelled orders from progressing through normal delivery flow
- **FR-172**: System MUST store order status history with timestamp, actor, and reason for each transition
- **FR-173**: System MUST prevent unauthorized role changes to orders (customer cannot confirm order, rider cannot reject)
- **FR-174**: System MUST track order completion time (from creation to delivery or cancellation)
- **FR-175**: System MUST preserve completed order data and history indefinitely (for legal/business requirements)

#### Data Persistence & Security (FR-176 to FR-195)

- **FR-176**: System MUST persist all data in Supabase PostgreSQL with appropriate schema
- **FR-177**: System MUST apply Row Level Security (RLS) policies to enforce authorization at database level
- **FR-178**: Customers MUST not be able to query or modify other customers' records via RLS policies
- **FR-179**: Restaurant owners MUST not be able to query or modify other restaurants' data via RLS policies
- **FR-180**: Riders MUST not be able to query other riders' assignments via RLS policies
- **FR-181**: System MUST validate all critical operations on the server (prices, availability, permissions)
- **FR-182**: System MUST never hardcode secrets or credentials in application code
- **FR-183**: System MUST use environment variables for database connection, API keys, and service-role keys
- **FR-184**: System MUST encrypt sensitive data at rest (passwords, payment information if stored)
- **FR-185**: System MUST implement database migrations for schema changes
- **FR-186**: System MUST maintain referential integrity (cascade deletes, foreign keys, constraints)
- **FR-187**: System MUST handle database errors gracefully without exposing internal details to clients
- **FR-188**: System MUST implement transaction support for critical operations (order creation, payment)
- **FR-189**: System MUST maintain audit logs for compliance and debugging
- **FR-190**: System MUST support database backups and recovery procedures
- **FR-191**: System MUST store order items as JSON snapshots to preserve historical accuracy
- **FR-192**: System MUST validate user input on the server to prevent SQL injection and XSS
- **FR-193**: System MUST implement rate limiting on API endpoints to prevent abuse
- **FR-194**: System MUST sanitize error messages to prevent information disclosure
- **FR-195**: System MUST support GDPR/data privacy requirements (user data export, deletion requests)

#### Responsive UI & Accessibility (FR-196 to FR-210)

- **FR-196**: Application MUST be responsive and functional on screens from 320px to 1440px width
- **FR-197**: Application MUST use mobile-first design approach
- **FR-198**: Application MUST display correctly on mobile (320px, 375px), tablet (768px), and desktop (1024px, 1440px) widths
- **FR-199**: Application MUST prevent horizontal scrolling and overlapping elements
- **FR-200**: Buttons, inputs, and navigation MUST be touch-friendly (minimum 44px touch targets)
- **FR-201**: Application MUST use semantic HTML for accessibility
- **FR-202**: Application MUST provide visible focus indicators for keyboard navigation
- **FR-203**: Application MUST include alt text for relevant images (food images, restaurant logos)
- **FR-204**: Application MUST maintain readable color contrast (WCAG AA standards)
- **FR-205**: Application MUST not communicate important information using color alone
- **FR-206**: Form fields MUST be properly labeled and associated with inputs
- **FR-207**: Application MUST support keyboard navigation through all interactive elements
- **FR-208**: Application MUST use consistent typography, spacing, and component styles
- **FR-209**: Application MUST display loading states, empty states, and error states clearly
- **FR-210**: Application MUST use Foodverse branding consistently throughout (not Foodpanda assets)

#### Performance & Reliability (FR-211 to FR-225)

- **FR-211**: Application MUST load homepage in under 3 seconds on 4G connection
- **FR-212**: Search results MUST return within 1 second
- **FR-213**: Cart operations (add/remove/update) MUST respond within 500ms
- **FR-214**: Application MUST gracefully handle network failures and display retry options
- **FR-215**: Application MUST implement client-side caching for restaurant/menu data where appropriate
- **FR-216**: Application MUST minimize database queries through query optimization and caching
- **FR-217**: Application MUST support 1000+ concurrent users without degradation
- **FR-218**: Application MUST maintain 99.5% uptime SLA (if deployed to production)
- **FR-219**: Application MUST implement API rate limiting to prevent abuse
- **FR-220**: Application MUST implement request timeouts (30 second default)
- **FR-221**: Application MUST implement retry logic for failed requests (with exponential backoff)
- **FR-222**: Application MUST compress API responses (gzip/brotli)
- **FR-223**: Application MUST minimize JavaScript bundle size
- **FR-224**: Application MUST lazy-load images and components
- **FR-225**: Application MUST implement service worker for offline capability (optional for MVP)

#### Testing & Quality (FR-226 to FR-240)

- **FR-226**: Application MUST have unit tests for pricing logic (cart, delivery fee, total calculation)
- **FR-227**: Application MUST have unit tests for cart operations (add, remove, quantity update)
- **FR-228**: Application MUST have unit tests for order validation logic
- **FR-229**: Application MUST have unit tests for order state machine transitions
- **FR-230**: Application MUST have integration tests for database operations
- **FR-231**: Application MUST have integration tests for RLS policies and authorization
- **FR-232**: Application MUST have integration tests for authentication and protected routes
- **FR-233**: Application MUST have integration tests for order creation and duplicate prevention
- **FR-234**: Application MUST have end-to-end tests for critical customer journeys (registration → browse → order → track)
- **FR-235**: Application MUST have end-to-end tests for restaurant order management workflow
- **FR-236**: Application MUST have end-to-end tests for rider assignment and delivery workflow
- **FR-237**: Application MUST pass TypeScript strict type checking
- **FR-238**: Application MUST pass ESLint linting without errors
- **FR-239**: Application MUST have test coverage of at least 70% for critical business logic
- **FR-240**: Application MUST run all tests and linting before deployment

### Key Entities

- **User**: Represents customers, restaurant owners, riders, and administrators. Core identity with email, password hash, name, phone, role(s), and timestamps. Relationships: addresses (customers), restaurants (owners), assignments (riders)

- **Customer Address**: Represents delivery address for customers with street, area, city (Karachi), coordinates, label (home/work), and default flag. Relationship: belongs to user

- **Restaurant**: Core business entity with name, description, image, cuisine type, owner relationship, opening hours, phone, address, approval status, availability. Relationships: owner (user), categories, menu items, orders

- **Menu Category**: Organizes menu items (Appetizers, Mains, Beverages, etc.) with restaurant, name, and display order. Relationship: belongs to restaurant, contains items

- **Menu Item (Dish)**: Food offering with name, description, image, price (in PKR), availability status, category, and restaurant. Relationships: belongs to restaurant and category, appears in order items

- **Cart**: Session or server-side storage of selected items before checkout. Contains items with quantity, timestamps, and associated restaurant. Relationships: belongs to user, contains menu items

- **Order**: Central transaction entity with unique reference, customer, restaurant, total amount (stored for historical accuracy), status, creation timestamp, estimated delivery time, delivery address (snapshot), and payment method. Relationships: customer, restaurant, rider (once assigned), order items (snapshots)

- **Order Item**: Snapshot of menu item at time of order with name, price, quantity, and original menu item reference. Preserves historical data when menu changes. Relationship: belongs to order and menu item

- **Order Status History**: Audit log for order state transitions with timestamp, from-state, to-state, actor (user/system), and reason. Relationships: belongs to order

- **Rider Assignment**: Link between rider and order for delivery with acceptance timestamp, pickup timestamp, delivery timestamp, and status. Relationships: rider (user), order

- **Delivery Fee Config**: Platform configuration with base fee, distance multiplier, minimum fee, and zone information. Used for fee calculation during checkout

- **Restaurant Commission**: Configuration for commission percentage or fixed fee per restaurant. Used for financial calculations

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new customer can complete registration and add a delivery address in under 2 minutes
- **SC-002**: A customer can browse restaurants and search by name/cuisine in under 1 minute
- **SC-003**: A customer can add items to cart and proceed to checkout in under 3 minutes
- **SC-004**: Checkout displays accurate totals (validated server-side) 100% of the time
- **SC-005**: Orders persist in the database across browser reloads and new sessions 100% of the time
- **SC-006**: Restaurant owners can accept an order and mark it ready for pickup within 30 seconds of viewing
- **SC-007**: Riders can accept an assignment and mark pickup/delivery within 30 seconds of viewing
- **SC-008**: Unauthorized users cannot access other users' orders, addresses, or sensitive data (security validation tests pass 100%)
- **SC-009**: Order state transitions follow the approved state machine 100% of the time (no invalid transitions allowed)
- **SC-010**: Historical order items retain their original names and prices even after restaurant menu changes (snapshot verification passes 100%)
- **SC-011**: Application displays correctly and is usable at all specified viewport sizes (320px, 375px, 768px, 1024px, 1440px)
- **SC-012**: Core customer journey test (registration → browse → add to cart → checkout → order confirmation) passes end-to-end
- **SC-013**: Core restaurant workflow test (receive order → accept → mark ready) passes end-to-end
- **SC-014**: Core rider workflow test (view assignment → accept → mark pickup → deliver) passes end-to-end
- **SC-015**: All role-based permission tests pass (no permission bypasses, RLS enforced)
- **SC-016**: Unit tests for pricing logic, cart calculations, and order validation pass with 80%+ coverage
- **SC-017**: No console errors or warnings on critical user journeys
- **SC-018**: Search results return in under 1 second (p95 latency)
- **SC-019**: Application can be deployed to Vercel following documented setup without manual configuration
- **SC-020**: Deployed application on Vercel passes smoke tests (health check, homepage loads, authentication works)

---

## Assumptions

The following assumptions are made to move forward without additional clarification:

1. **Service Area**: Initial MVP covers Karachi, Pakistan only. Service area validation is basic (accept all addresses initially; can be enhanced with geo-fencing later)
2. **Delivery Fee**: Flat delivery fee (e.g., 50-100 PKR) for MVP; distance-based calculation deferred to Phase 2
3. **Estimated Delivery Time**: Hardcoded estimate (e.g., 30 minutes) based on restaurant type; dynamic calculation deferred to Phase 2
4. **Rider Assignment**: Manual acceptance by riders (no automated dispatch); next phase can add smart assignment
5. **Authentication**: Supabase Auth with email/password; social login (Google, Facebook) deferred to Phase 2
6. **Image Storage**: Supabase Storage with free-tier quotas (100 MB); images compressed to 80% quality; excess storage handled by error message
7. **Payment**: Cash-on-delivery only for MVP; online payment (Stripe, JazzCash) deferred to Phase 2
8. **Notifications**: In-app status updates only (no SMS/email initially); third-party notifications deferred to Phase 2
9. **Ratings/Reviews**: Basic 5-star system (no detailed review management) for MVP; advanced review features deferred
10. **Multi-Language**: English only for MVP; Urdu/multi-language support deferred to Phase 2
11. **Currency**: All prices in PKR; no multi-currency support for MVP
12. **Timezone**: Pakistan Standard Time (UTC+5); no timezone handling complexity
13. **Compliance**: GDPR and local data privacy considered; no advanced compliance features (PCI-DSS deferred)

---

## Known Constraints & Risks

### Constraints

- **Free-Tier Limits**: Supabase free tier has 500 MB database, rate limits, and inactivity cleanup; careful quota monitoring required
- **Vercel Deployment**: Hobby plan for personal use; commercial use requires paid plan upgrade
- **Image Storage**: Limited to 100 MB in Supabase Storage free tier; careful quota management essential
- **No Real-Time Socket**: WebSockets deferred; order status updates use polling or manual refresh
- **Single Region**: Supabase free tier limited to single region (likely US-East or EU); latency considerations for Pakistan users
- **No Mobile App**: Web-only for MVP; native iOS/Android apps deferred to future phases

### Risks

1. **Free-Tier Inactivity**: Supabase may clean up inactive projects; requires monthly usage or manual project activation
2. **Rate Limiting**: Platform rate limits may impact concurrent users during peak times; scaling requires paid tier
3. **Database Scaling**: Free-tier database growth limits; may hit row count or storage limits
4. **Image Quota**: Restaurants with many high-res images may exhaust storage quickly; requires compression and management
5. **Geographic Latency**: Pakistan users accessing US/EU-based servers may experience latency; consider regional setup later
6. **Concurrent Users**: Free tier supports limited concurrent connections; stress testing essential before scale

---

## Exclusions (Not in MVP Scope)

- Online payment processing (Stripe, JazzCash, EasyPaisa)
- Live GPS tracking for riders
- Automated rider dispatch/assignment
- AI-powered restaurant recommendations
- Loyalty programs, discounts, and promotional codes
- Affiliate marketing or referral system
- Advanced analytics and business intelligence dashboards
- SMS/Email notifications
- Push notifications
- Social features (follow restaurants, social sharing)
- Subscription or meal plans
- Customer reviews and detailed ratings
- Multi-language support
- Mobile native apps (iOS/Android)
- Advanced payment methods (credit cards, digital wallets)
- PCI-DSS compliance and advanced security features
- Bulk operations or admin import/export tools
- Advanced reporting and financial statements

---

## Next Steps

1. Review this specification for clarity and completeness
2. Use `/sp.clarify` to resolve any ambiguities or add domain-specific questions
3. Use `/sp.plan` to generate technical implementation plan
4. Use `/sp.tasks` to create dependency-ordered implementation tasks
5. Use `/sp.analyze` to validate specifications, plan, and tasks for consistency
6. Proceed with implementation following Spec-Driven Development workflow
