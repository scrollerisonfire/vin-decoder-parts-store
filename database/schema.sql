-- AutoParts BG — PostgreSQL schema
-- Run: psql -U postgres -d autoparts -f schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============== USERS ==============
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'mechanic');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(32),
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============== VEHICLES ==============
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vin VARCHAR(17) UNIQUE,
  make VARCHAR(64) NOT NULL,
  model VARCHAR(128) NOT NULL,
  year INT NOT NULL,
  engine_code VARCHAR(64),
  body_type VARCHAR(64),
  fuel_type VARCHAR(32),
  decoded_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model, year);

-- ============== STORES ==============
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(128) NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT TRUE,
  api_endpoint VARCHAR(255),
  affiliate_url_template VARCHAR(255)
);

-- ============== PARTS ==============
CREATE TABLE parts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  oem_number VARCHAR(64) NOT NULL,
  brand VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  subcategory VARCHAR(64),
  description TEXT,
  image_urls TEXT[],
  weight_kg DECIMAL(8,3),
  tecdoc_id INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_parts_oem ON parts(oem_number);
CREATE INDEX idx_parts_category ON parts(category);

-- ============== COMPATIBILITY ==============
CREATE TABLE part_compatibility (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  part_id UUID NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  vehicle_make VARCHAR(64) NOT NULL,
  vehicle_model VARCHAR(128) NOT NULL,
  year_from INT NOT NULL,
  year_to INT NOT NULL,
  engine_code VARCHAR(64),
  source VARCHAR(32) DEFAULT 'tecdoc'  -- tecdoc | manual | ai
);
CREATE INDEX idx_compat_lookup ON part_compatibility(vehicle_make, vehicle_model, year_from, year_to);

-- ============== INVENTORY ==============
CREATE TYPE part_condition AS ENUM ('new', 'used', 'refurbished');

CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  part_id UUID NOT NULL REFERENCES parts(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  price_bgn DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  condition part_condition NOT NULL DEFAULT 'new',
  delivery_days INT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(part_id, store_id, condition)
);
CREATE INDEX idx_inventory_part ON inventory(part_id, price_bgn);

-- ============== ORDERS ==============
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE shipping_provider AS ENUM ('econt', 'speedy');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  status order_status NOT NULL DEFAULT 'pending',
  subtotal_bgn DECIMAL(10,2) NOT NULL,
  shipping_bgn DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_bgn DECIMAL(10,2) NOT NULL,
  shipping_provider shipping_provider,
  shipping_office_code VARCHAR(32),
  shipping_address JSONB,
  tracking_number VARCHAR(64),
  shipping_label_url VARCHAR(255),
  stripe_session_id VARCHAR(128),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  part_id UUID NOT NULL REFERENCES parts(id),
  inventory_id UUID NOT NULL REFERENCES inventory(id),
  quantity INT NOT NULL,
  unit_price_bgn DECIMAL(10,2) NOT NULL
);

-- ============== VIN HISTORY (CarVertical) ==============
CREATE TABLE vin_history_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  vin VARCHAR(17) NOT NULL,
  price_bgn DECIMAL(10,2) NOT NULL,
  carvertical_report_id VARCHAR(128),
  report_url VARCHAR(255),
  report_data JSONB,
  stripe_session_id VARCHAR(128),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_vin_reports_vin ON vin_history_reports(vin);

-- ============== AI RECOMMENDATIONS ==============
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  vehicle_id UUID REFERENCES vehicles(id),
  query TEXT NOT NULL,
  recommended_part_id UUID REFERENCES parts(id),
  alternatives JSONB,
  user_accepted BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============== OEM SCHEMES ==============
CREATE TABLE oem_diagrams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make VARCHAR(64) NOT NULL,
  chassis VARCHAR(64) NOT NULL,
  category VARCHAR(64) NOT NULL,
  subcategory VARCHAR(128),
  svg_url VARCHAR(255) NOT NULL,
  hotspots JSONB NOT NULL,  -- [{ number, x, y, w, h, oem_number, name }]
  source VARCHAR(32) DEFAULT 'realoem',
  cached_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_oem_lookup ON oem_diagrams(make, chassis, category);
