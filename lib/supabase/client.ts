import { createBrowserClient } from '@supabase/ssr';
import { createClient as createGenericClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Auth용 브라우저 클라이언트
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// 범용 데이터 패칭용 브라우저/서버 공용 클라이언트
export const supabase = createGenericClient(supabaseUrl, supabaseAnonKey);
