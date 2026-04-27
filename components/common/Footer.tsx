import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <div className={styles.logo}>SPORTEX</div>
          <p className={styles.description}>
            Elevate your game with premium sports gear. Performance, style, and durability combined.
          </p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h3>SHOP</h3>
            <ul>
              <li><Link href="/shoes">Shoes</Link></li>
              <li><Link href="/clothing">Clothing</Link></li>
              <li><Link href="/accessories">Accessories</Link></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h3>SUPPORT</h3>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} SPORTEX. All rights reserved.
      </div>
    </footer>
  );
}
