'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from '../auth.module.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess('회원가입이 완료되었습니다! 이메일을 확인하여 계정을 인증해 주세요.');
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <span className={styles.brandTag}>JOIN SPORTEX</span>
        <h1 className={styles.title}>회원가입</h1>
        <p className={styles.subtitle}>
          지금 가입하고 전 세계 파이터들이 선택한 장비를 경험하세요.
        </p>

        {error && (
          <div className={styles.errorMsg}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        {success && (
          <div className={styles.successMsg}>
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="signup-email">이메일</label>
            <div className={styles.inputWrapper}>
              <input
                id="signup-email"
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
            <label htmlFor="signup-password">비밀번호</label>
            <div className={styles.inputWrapper}>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="최소 6자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
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

          <div className={styles.inputGroup}>
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <div className={styles.inputWrapper}>
              <input
                id="signup-password-confirm"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Lock size={16} className={styles.inputIcon} />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            <span className={styles.btnContent}>
              {isLoading && <span className={styles.spinner} />}
              {isLoading ? '가입 중...' : 'CREATE ACCOUNT'}
            </span>
          </button>
        </form>

        <div className={styles.footer}>
          이미 계정이 있으신가요?
          <Link href="/login" className={styles.link}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
