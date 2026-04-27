# SPORTEX | 프리미엄 격투기 스포츠 기어 쇼핑몰

**SPORTEX**는 복싱, MMA, 주짓수 등 다양한 투기 종목 전문가들을 위한 프리미엄 장비를 큐레이션하고 판매하는 이커머스 플랫폼입니다. 

![SPORTEX Preview](https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop)

## 🚀 주요 기능

- **동적 상품 필터링**: 종목(Sport), 보호 부위(Body Part), 보조 도구(Equipment)별 멀티 필터링 시스템.
- **상세 상품 옵션**: 글러브 무게(oz), 사이즈, 컬러 등 복잡한 상품 옵션 선택 및 실시간 반영.
- **사용자 인증 (Auth)**: Supabase Auth를 이용한 안전한 회원가입 및 로그인 기능.
- **실시간 데이터베이스**: Supabase DB 연동으로 상품 정보 및 옵션 데이터 실시간 연동.
- **반응형 디자인**: 다양한 디바이스(PC, 태블릿, 모바일)에 최적화된 Modern & Premium UI.

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Backend/Auth**: Supabase
- **Styling**: Vanilla CSS (CSS Modules)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Outfit)

## ⚙️ 설정 방법

### 1. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 Supabase API 키를 입력합니다.

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 데이터베이스 설정 (Supabase)
프로젝트 루트의 `supabase_schema.sql` 파일을 Supabase SQL Editor에 복사하여 실행하면 테이블 생성 및 초기 데이터(Mock Data)가 투입됩니다.

### 3. 프로젝트 실행
```bash
npm install
npm run dev
```

## 📦 배포 (Vercel)
본 프로젝트는 Vercel에 최적화되어 있습니다. GitHub 저장소를 연결하고 위 환경 변수를 Vercel Dashboard에 설정하면 자동으로 배포됩니다.
