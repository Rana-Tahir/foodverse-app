-- supabase/seed.sql
-- Seed data for Foodverse development and testing
-- This file contains sample users, restaurants, menus, and test data

-- Note: In production, use Supabase Auth API to create users
-- For local development, this seed data can be inserted directly

-- ============================================================================
-- TEST USERS (via direct profile insertion for development)
-- ============================================================================

-- Customer 1: Ali Khan
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'ali.khan@example.com',
  'Ali Khan',
  '03001234567',
  'customer',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Customer 2: Fatima Ahmed
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'fatima.ahmed@example.com',
  'Fatima Ahmed',
  '03009876543',
  'customer',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Customer 3: Hassan Malik
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  'hassan.malik@example.com',
  'Hassan Malik',
  '03005555555',
  'customer',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Restaurant Owner 1: Ahmed Raza
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000101',
  'ahmed.raza@example.com',
  'Ahmed Raza',
  '03001111111',
  'restaurant_owner',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Restaurant Owner 2: Zainab Khan
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000102',
  'zainab.khan@example.com',
  'Zainab Khan',
  '03002222222',
  'restaurant_owner',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Delivery Rider 1: Muhammad Saleem
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000201',
  'saleem.rider@example.com',
  'Muhammad Saleem',
  '03003333333',
  'rider',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Delivery Rider 2: Bilal Hussain
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000202',
  'bilal.rider@example.com',
  'Bilal Hussain',
  '03004444444',
  'rider',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Admin User
INSERT INTO profiles (id, email, full_name, phone_number, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000301',
  'admin@foodverse.com',
  'Admin User',
  '03000000000',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- TEST CUSTOMER ADDRESSES
-- ============================================================================

INSERT INTO addresses (id, user_id, street_address, area, city, postal_code, latitude, longitude, label, is_default)
VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'House 123, Street 5',
    'Gulshan',
    'Karachi',
    '75300',
    24.8241,
    67.0370,
    'Home',
    true
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Office 456, Business Plaza',
    'DHA',
    'Karachi',
    '75500',
    24.7914,
    67.0437,
    'Office',
    false
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'Apartment 789, Twin Towers',
    'Clifton',
    'Karachi',
    '75600',
    24.7645,
    67.0307,
    'Home',
    true
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000003',
    'House 321, North Street',
    'Korangi',
    'Karachi',
    '75150',
    24.8447,
    67.1247,
    'Home',
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- RESTAURANTS
-- ============================================================================

-- Restaurant 1: Biryani House
INSERT INTO restaurants (
  id, owner_id, name, description, image_url, cuisine_type, phone_number,
  street_address, area, city, latitude, longitude, is_approved, is_available,
  average_rating, total_reviews, created_at, updated_at
)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000101',
  'Biryani House',
  'Authentic Pakistani biryani and traditional dishes',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  'Pakistani',
  '02135123456',
  'Shop 12, Food Court',
  'Gulshan',
  'Karachi',
  24.8241,
  67.0370,
  true,
  true,
  4.5,
  42,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Restaurant 2: Pizza Palace
INSERT INTO restaurants (
  id, owner_id, name, description, image_url, cuisine_type, phone_number,
  street_address, area, city, latitude, longitude, is_approved, is_available,
  average_rating, total_reviews, created_at, updated_at
)
VALUES (
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000101',
  'Pizza Palace',
  'Italian pizzas, pastas, and continental cuisine',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  'Italian',
  '02135654321',
  'Block 5, Phase 2',
  'DHA',
  'Karachi',
  24.7914,
  67.0437,
  true,
  true,
  4.2,
  28,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Restaurant 3: Burger King
INSERT INTO restaurants (
  id, owner_id, name, description, image_url, cuisine_type, phone_number,
  street_address, area, city, latitude, longitude, is_approved, is_available,
  average_rating, total_reviews, created_at, updated_at
)
VALUES (
  '20000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000102',
  'Burger King',
  'Gourmet burgers, fries, and fast food favorites',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  'American',
  '02135999999',
  'Marina Complex',
  'Clifton',
  'Karachi',
  24.7645,
  67.0307,
  true,
  true,
  4.7,
  35,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- MENU CATEGORIES
-- ============================================================================

-- Biryani House Categories
INSERT INTO categories (id, restaurant_id, name, display_order)
VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Biryani', 1),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Karahi', 2),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Drinks', 3)
ON CONFLICT DO NOTHING;

-- Pizza Palace Categories
INSERT INTO categories (id, restaurant_id, name, display_order)
VALUES
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000002', 'Pizza', 1),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000002', 'Pasta', 2),
  ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000002', 'Desserts', 3)
ON CONFLICT DO NOTHING;

-- Burger King Categories
INSERT INTO categories (id, restaurant_id, name, display_order)
VALUES
  ('30000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000003', 'Burgers', 1),
  ('30000000-0000-0000-0000-000000000022', '20000000-0000-0000-0000-000000000003', 'Sides', 2),
  ('30000000-0000-0000-0000-000000000023', '20000000-0000-0000-0000-000000000003', 'Beverages', 3)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MENU ITEMS - Biryani House
-- ============================================================================

INSERT INTO menu_items (id, restaurant_id, category_id, name, description, price_pkr, image_url, is_available)
VALUES
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Chicken Biryani', 'Fragrant basmati rice with tender spiced chicken', 450, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Mutton Biryani', 'Premium biryani with succulent tender mutton', 550, 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Fish Biryani', 'Aromatic spiced rice with fresh coastal fish', 500, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'Chicken Karahi', 'Succulent chicken in rich tomato and ginger karahi gravy', 400, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'Mutton Karahi', 'Tender mutton in aromatic traditional wok gravy', 480, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', 'Mango Lassi', 'Refreshing sweet yogurt drink with fresh mango pulp', 120, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', 'Royal Kheer', 'Traditional sweet rice pudding with pistachios', 100, 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MENU ITEMS - Pizza Palace
-- ============================================================================

INSERT INTO menu_items (id, restaurant_id, category_id, name, description, price_pkr, image_url, is_available)
VALUES
  ('40000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000011', 'Margherita Pizza', 'Classic wood-fired pizza with fresh mozzarella and basil', 750, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000011', 'Pepperoni Pizza', 'Loaded with spicy pepperoni and melted cheese', 850, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000011', 'Veggie Supreme Pizza', 'Fresh garden vegetables with mozzarella cheese', 800, 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000012', 'Fettuccini Alfredo', 'Creamy alfredo pasta served with warm garlic bread', 550, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000012', 'Spaghetti Carbonara', 'Classic Italian spaghetti with savory cream sauce', 600, 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000013', 'Tiramisu', 'Layered Italian coffee-flavored dessert', 350, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000013', 'Chocolate Fudge Cake', 'Rich moist chocolate cake slice', 300, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MENU ITEMS - Burger King
-- ============================================================================

INSERT INTO menu_items (id, restaurant_id, category_id, name, description, price_pkr, image_url, is_available)
VALUES
  ('40000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000021', 'Classic Burger', 'Juicy beef patty with fresh lettuce, tomato, and signature sauce', 350, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000022', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000021', 'Double Cheese Burger', 'Double beef patties with double melted cheddar', 450, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000023', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000021', 'Crispy Chicken Burger', 'Golden fried chicken breast fillet with creamy slaw', 400, 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000024', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000022', 'French Fries', 'Golden crispy salted potato fries', 180, 'https://images.unsplash.com/photo-1576107232684-1279f3908591?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000025', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000022', 'Onion Rings', 'Crispy battered onion rings with dip', 200, 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000026', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000023', 'Coca Cola (330ml)', 'Chilled refreshing Coca Cola can', 80, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', true),
  ('40000000-0000-0000-0000-000000000027', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000023', 'Fresh Lemonade', 'Zesty homemade mint lemonade', 90, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- RIDER PROFILES
-- ============================================================================

INSERT INTO rider_profiles (id, user_id, license_number, vehicle_type, is_available, is_verified, average_rating, total_deliveries, total_earnings_pkr)
VALUES
  ('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000201', 'DL-2024-001', 'motorcycle', true, true, 4.8, 145, 35000),
  ('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000202', 'DL-2024-002', 'motorcycle', true, true, 4.6, 98, 23500)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PLATFORM SETTINGS
-- ============================================================================

UPDATE platform_settings
SET
  delivery_fee_base_pkr = 150.00,
  delivery_fee_per_km = 10.00,
  min_order_value_pkr = 500.00,
  commission_percentage = 15.00,
  support_email = 'support@foodverse.com',
  support_phone = '03000000000',
  updated_at = NOW()
WHERE id IS NOT NULL;

-- ============================================================================
-- SUPPORT FAQS
-- ============================================================================

INSERT INTO support_faqs (id, question, answer, intent, keywords, priority, is_active)
VALUES
  (
    '60000000-0000-0000-0000-000000000001',
    'How much is the delivery fee?',
    'The standard delivery fee in Karachi is PKR 150. Additional charges may apply for orders from distant areas.',
    'delivery_fee',
    ARRAY['delivery', 'fee', 'cost', 'charge'],
    1,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    'What payment methods do you accept?',
    'Currently, we accept cash on delivery (COD) for all orders.',
    'payment_help',
    ARRAY['payment', 'method', 'accept', 'card', 'cash'],
    2,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    'How do I track my order?',
    'You can track your order in real-time through the app. Once the order is confirmed, you will see the rider location and estimated delivery time.',
    'order_status',
    ARRAY['track', 'order', 'status', 'delivery', 'location'],
    3,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000004',
    'Can I cancel my order?',
    'You can cancel your order before the restaurant starts preparing it. Once preparation has begun, cancellation is not possible.',
    'cancellation',
    ARRAY['cancel', 'refund', 'change', 'modify'],
    2,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000005',
    'What restaurants are available?',
    'You can browse all available restaurants in your area through the Foodverse app. Filter by cuisine type to find what you like.',
    'restaurant_search',
    ARRAY['restaurant', 'browse', 'available', 'find', 'search'],
    1,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000006',
    'How do I contact support?',
    'You can reach our support team at support@foodverse.com or call us at 0300-0000000. We are available 24/7.',
    'general_faq',
    ARRAY['support', 'help', 'contact', 'customer', 'service'],
    0,
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================
-- Seed data successfully inserted!
-- Test credentials for manual testing:
--   Customer: ali.khan@example.com
--   Owner: ahmed.raza@example.com
--   Rider: saleem.rider@example.com
--   Admin: admin@foodverse.com
