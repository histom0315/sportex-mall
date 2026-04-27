import Link from 'next/link';
import { Plus } from 'lucide-react';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase/client';

export default async function Home() {
  // Supabase 비동기 데이터 패칭
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const featured = featuredProducts || [];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop')" }} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Enter The<br/><span>Octagon</span></h1>
          <p className={styles.heroDesc}>
            UFC 파이터의 전율이 느껴지는 옥타곤. 한계를 뛰어넘는 최고의 투기종목 전용 장비와 보조 운동기구를 만나보세요.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/shop?filter=sport" className={styles.ctaBtn}>
              Shop By Sport
            </Link>
            <Link href="/shop" className={styles.ctaBtn} style={{ background: 'transparent', border: '2px solid var(--accent)', color: 'var(--accent)' }}>
              Explore Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Arsenal</h2>
        <div className={styles.grid}>
          {featured.map((product) => (
            <div key={product.id} className={styles.card}>
              {product.isNew && <span className={styles.cardBadge}>New</span>}
              <img src={product.image} alt={product.name} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <div className={styles.cardCategory}>{product.sport.join(', ')}</div>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
                  <Link href={`/products/${product.id}`} className={styles.addToCartBtn} aria-label="View Details">
                    <Plus size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
