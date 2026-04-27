'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { SPORTS, BODY_PARTS, EQUIPMENTS } from '@/lib/data/products';
import { supabase } from '@/lib/supabase/client';
import styles from './page.module.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  sport: string[];
  body_part: string[];
  equipment: string[];
  created_at: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data as Product[]);
      setLoading(false);
    }
    getProducts();
  }, []);

  const handleSportToggle = (sport: string) => {
    setSelectedSports(prev => prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]);
  };
  const handleBodyPartToggle = (part: string) => {
    setSelectedBodyParts(prev => prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]);
  };
  const handleEquipmentToggle = (equip: string) => {
    setSelectedEquipments(prev => prev.includes(equip) ? prev.filter(e => e !== equip) : [...prev, equip]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const sportMatch = selectedSports.length === 0 || (product.sport && product.sport.some((s: string) => selectedSports.includes(s)));
      const bodyPartMatch = selectedBodyParts.length === 0 || (product.body_part && product.body_part.some((b: string) => selectedBodyParts.includes(b)));
      const equipmentMatch = selectedEquipments.length === 0 || (product.equipment && product.equipment.some((e: string) => selectedEquipments.includes(e)));
      return sportMatch && bodyPartMatch && equipmentMatch;
    });
  }, [products, selectedSports, selectedBodyParts, selectedEquipments]);

  return (
    <div className={styles.shopLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>By Sport</h3>
          <div className={styles.filterList}>
            {SPORTS.map(sport => (
              <label key={sport} className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} checked={selectedSports.includes(sport)} onChange={() => handleSportToggle(sport)}/>
                {sport}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>By Protection</h3>
          <div className={styles.filterList}>
            {BODY_PARTS.map(part => (
              <label key={part} className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} checked={selectedBodyParts.includes(part)} onChange={() => handleBodyPartToggle(part)}/>
                {part}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Auxiliary Tools</h3>
          <div className={styles.filterList}>
            {EQUIPMENTS.map(equip => (
              <label key={equip} className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} checked={selectedEquipments.includes(equip)} onChange={() => handleEquipmentToggle(equip)}/>
                {equip}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>All Gear</h1>
          <span className={styles.resultsCount}>{filteredProducts.length} Results</span>
        </div>

        {loading ? (
          <div className={styles.emptyState}>Loading products from Supabase...</div>
        ) : filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.card}>
                <img src={product.image} alt={product.name} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <div className={styles.cardCategory}>
                    {[...(product.sport || []), ...(product.body_part || []), ...(product.equipment || [])].join(', ')}
                  </div>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>${product.price}</span>
                    <Link href={`/products/${product.id}`} className={styles.viewBtn}>VIEW</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No products found.</div>
        )}
      </main>
    </div>
  );
}
