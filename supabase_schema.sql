-- ==========================================
-- 1. 테이블 생성 (Table Creation)
-- ==========================================

-- 기존 테이블이 있다면 모두 삭제 (초기화용 위험 명령어이므로 주의!)
DROP TABLE IF EXISTS product_options;
DROP TABLE IF EXISTS products;

-- Products 테이블 (상품 목록)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  sport TEXT[] DEFAULT '{}',
  body_part TEXT[] DEFAULT '{}',
  equipment TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  is_new BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Options 테이블 (사이즈, 컬러 등)
CREATE TABLE product_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  choices TEXT[] NOT NULL
);

-- ==========================================
-- 2. Row Level Security (RLS) 정책 설정
-- 모든 사용자가 상품 정보를 읽을 수 있도록 허용합니다.
-- ==========================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);

ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to product options" ON product_options FOR SELECT USING (true);

-- ==========================================
-- 3. Mock Data 투입 (Mock Data Insertion)
-- ==========================================

INSERT INTO products (id, name, category, price, sport, body_part, equipment, image, is_new, description) VALUES
('p-1', 'Pro Sparring Gloves', 'Gloves', 120.00, ARRAY['Boxing', 'Muay Thai'], ARRAY['Hands'], ARRAY[]::TEXT[], 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1974&auto=format&fit=crop', true, '최고급 천연 소가죽으로 제작되어 타격감과 손목 보호력이 우수합니다.'),
('p-2', 'Elite MMA Grappling Gloves', 'Gloves', 75.00, ARRAY['MMA'], ARRAY['Hands'], ARRAY[]::TEXT[], 'https://images.unsplash.com/photo-1590483736622-398541ce1ea8?q=80&w=1968&auto=format&fit=crop', false, '그래플링과 타격 모두 완벽하게 수행할 수 있는 반전지 글러브입니다.'),
('p-3', 'Premium Combat Headgear', 'Protective Gear', 90.00, ARRAY['Boxing', 'MMA', 'Muay Thai'], ARRAY['Head'], ARRAY[]::TEXT[], 'https://images.unsplash.com/photo-1610479133405-bce1dc5deef6?q=80&w=1974&auto=format&fit=crop', false, '충격 흡수 폼 탑재. 시야 확보와 완벽한 방어력을 동시에 제공합니다.'),
('p-4', 'Heavy Duty Shin Guards', 'Protective Gear', 65.00, ARRAY['Muay Thai', 'MMA'], ARRAY['Legs'], ARRAY[]::TEXT[], 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1974&auto=format&fit=crop', true, '강력한 타격을 안전하게 방어해 주는 3중 패딩 정강이 보호대.'),
('p-5', 'Competition BJJ Gi', 'Apparel', 150.00, ARRAY['Jiu-Jitsu'], ARRAY['Body', 'Legs'], ARRAY[]::TEXT[], 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&grayscale&w=1974&auto=format&fit=crop', false, '가볍고 질긴 펄 위브 스티치가 특징인 주짓수 대회용 도복. (그립/마찰 최소화)'),
('p-6', 'Carbon Groin Protector', 'Protective Gear', 45.00, ARRAY['Boxing', 'MMA', 'Muay Thai'], ARRAY['Groin'], ARRAY[]::TEXT[], 'https://images.unsplash.com/photo-1605333556559-6e3e1f0e4b78?q=80&w=1974&auto=format&fit=crop', false, '초경량 탄소 섬유 소재 보호컵. 민감한 부위를 완벽히 보호해 줍니다.'),
('p-7', 'Pro Heavy Punching Bag (100lb) - Octagon Series', 'Training Tool', 220.00, ARRAY['Boxing', 'MMA', 'Muay Thai'], ARRAY[]::TEXT[], ARRAY['Heavy Bag'], 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2000&auto=format&fit=crop', true, '내구성 최강의 합성가죽 100lb 헤비백. 폭발적인 임팩트 훈련에 적합합니다.'),
('p-8', 'Speed Jump Rope', 'Training Tool', 25.00, ARRAY['Boxing', 'MMA'], ARRAY[]::TEXT[], ARRAY['Jump Rope'], 'https://images.unsplash.com/photo-1650390161421-aa0029b9e6fa?q=80&w=1974&auto=format&fit=crop', false, '가벼운 알루미늄 핸들과 와이어 로프로 극강의 풋워크 향상 훈련 지원.');

-- Options Data Insertion
INSERT INTO product_options (product_id, title, choices) VALUES
('p-1', '무게(Size)', ARRAY['8oz', '10oz', '12oz', '14oz', '16oz']),
('p-1', '컬러(Color)', ARRAY['Matte Black', 'Crimson Red', 'Neon Night']),
('p-3', '보호 형태(Style)', ARRAY['오픈페이스(일반)', 'T자형(코보호)', '풀페이스(안면보호)']),
('p-3', '사이즈(Size)', ARRAY['S', 'M', 'L', 'XL']),
('p-5', '사이즈(Size)', ARRAY['A0', 'A1', 'A2', 'A3']),
('p-5', '컬러(Color)', ARRAY['Black', 'White', 'Blue']);

-- 완료! 이 스크립트를 Supabase SQL Editor에 복사하고 실행하세요.
