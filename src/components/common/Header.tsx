'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User } from 'lucide-react';
import styles from './Header.module.css';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase/client';

export default function Header() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        SPORTEX
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/shop" className={styles.navLink}>ALL GEAR</Link>
        <div style={{color: '#a1a1aa', userSelect: 'none'}}>|</div>
        <Link href="/shop?filter=sport" className={styles.navLink}>BY SPORT</Link>
        <Link href="/shop?filter=body" className={styles.navLink}>BY PROTECTION</Link>
        <div style={{color: '#a1a1aa', userSelect: 'none'}}>|</div>
        <Link href="/sale" className={styles.navLink} style={{ color: "var(--accent)" }}>SALE</Link>
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Search">
          <Search size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Cart">
          <ShoppingCart size={20} />
        </button>
        
        {!isLoading && (
          user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/mypage" className={styles.iconBtn} aria-label="My Page" title="마이페이지">
                <User size={20} />
              </Link>
              <button 
                onClick={handleLogout} 
                className={styles.loginBtn}
                style={{ background: 'transparent', color: '#ff4d4f', borderColor: '#ff4d4f', fontSize: '0.9rem' }}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              LOGIN
            </Link>
          )
        )}
      </div>
    </header>
  );
}
