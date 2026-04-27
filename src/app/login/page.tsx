'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from '../auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : signInError.message
      );
      setIsLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <span className={styles.brandTag}>SPORTEX MEMBERS</span>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.subtitle}>
          계정에 로그인하고 최고의 격투기 장비를 만나보세요.
        </p>

        {error && (
          <div className={styles.errorMsg}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="login-email">이메일</label>
            <div className={styles.inputWrapper}>
              <input
                id="login-email"
                type="email"
                className={styles.input}
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <Mail size={16} className={styles.inputIcon} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="login-password">비밀번호</label>
            <div className={styles.inputWrapper}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <Lock size={16} className={styles.inputIcon} />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            <span className={styles.btnContent}>
              {isLoading && <span className={styles.spinner} />}
              {isLoading ? '로그인 중...' : 'SIGN IN'}
            </span>
          </button>
        </form>

        <div className={styles.footer}>
          아직 계정이 없으신가요?
          <Link href="/signup" className={styles.link}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
