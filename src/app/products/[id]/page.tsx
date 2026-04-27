'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import styles from './page.module.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sport: string[];
  body_part: string[];
  equipment: string[];
}

interface ProductOption {
  id: string;
  product_id: string;
  title: string;
  choices: string[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data: p } = await supabase.from('products').select('*').eq('id', id).single();
      const { data: opt } = await supabase.from('product_options').select('*').eq('product_id', id);
      
      if (!p) {
        notFound();
        return;
      }

      setProduct(p as Product);
      setOptions((opt as ProductOption[]) || []);
      
      const defaults: Record<string, string> = {};
      (opt || []).forEach(o => {
        defaults[o.title] = o.choices[0];
      });
      setSelectedOptions(defaults);
      setLoading(false);
    }
    
    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return <div className={styles.productPage} style={{color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh'}}>Loading details...</div>;
  }

  const handleOptionSelect = (title: string, choice: string) => {
    setSelectedOptions(prev => ({ ...prev, [title]: choice }));
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.imageGallery}>
        <img src={product.image} alt={product.name} className={styles.mainImage} />
      </div>
      
      <div className={styles.productInfo}>
        <div className={styles.category}>{product.category}</div>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.price}>${product.price}</div>
        
        <p className={styles.description}>
          {product.description || '최고의 품질을 자랑하는 투기종목 전용 프리미엄 장비입니다.'}
        </p>
        
        {options.map((option) => (
          <div key={option.id} className={styles.section}>
            <h3 className={styles.sectionTitle}>{option.title}를 선택하세요</h3>
            <div className={styles.optionsGrid}>
              {option.choices.map((choice: string) => (
                <button 
                  key={choice} 
                  className={`${styles.optionBtn} ${selectedOptions[option.title] === choice ? styles.selectedOption : ''}`}
                  onClick={() => handleOptionSelect(option.title, choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className={styles.addToCartBtn}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
