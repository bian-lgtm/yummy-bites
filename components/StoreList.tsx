'use client';

import { useState } from 'react';
import styles from '../app/page.module.css';

const PER_PAGE = 6;

interface Store {
  name: string;
  address: string;
  city: string;
  logo: string;
  maps: string;
}

export default function StoreList({ stores }: { stores: Store[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(stores.length / PER_PAGE);
  const visible = stores.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div>
      <div className={styles.storeGrid}>
        {visible.map((s, i) => (
          <a
            key={i}
            href={s.maps}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.storeCard}
          >
            <div className={styles.storeLogo}>
              <img src={s.logo} alt={s.name} />
            </div>
            <div className={styles.storeInfo}>
              <strong className={styles.storeName}>{s.name}</strong>
              <span className={styles.storeCity}>📍 {s.city}</span>
            </div>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.storePagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >‹</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${i === page ? styles.pageBtnActive : ''}`}
              onClick={() => setPage(i)}
            >{i + 1}</button>
          ))}
          <button
            className={styles.pageBtn}
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >›</button>
        </div>
      )}
    </div>
  );
}
