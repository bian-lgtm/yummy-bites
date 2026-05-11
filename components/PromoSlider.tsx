'use client';

import { useState, useEffect, useRef } from 'react';
import { trackEvent } from './GoogleAnalytics';
import { trackMetaEvent } from './MetaPixel';

const promos = [
  {
    img: '/images/promos/promo1.webp',
    alt: 'Belanja 249K Free Sikat Gigi Baby Safe',
    link: 'https://shopee.co.id/yummybites_official',
    label: 'Promo Baby Safe',
  },
  {
    img: '/images/promos/promo2.webp',
    alt: 'Promo 2',
    link: 'https://shopee.co.id/yummybites_official',
    label: 'Promo 2',
  },
  {
    img: '/images/promos/promo3.webp',
    alt: 'Promo 3',
    link: 'https://shopee.co.id/yummybites_official',
    label: 'Promo 3',
  },
];

const css = `
  .promo-slider { position: relative; width: 100%; overflow: hidden; border-radius: 20px; cursor: pointer; }
  .promo-track { display: flex; transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
  .promo-slide { min-width: 100%; position: relative; }
  .promo-slide img { width: 100%; height: auto; display: block; border-radius: 20px; }
  .promo-arr {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.92); border: none;
    font-size: 22px; cursor: pointer; z-index: 5;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15); transition: all 0.2s;
  }
  .promo-arr:hover { background: white; transform: translateY(-50%) scale(1.08); }
  .promo-arr-l { left: 14px; }
  .promo-arr-r { right: 14px; }
  .promo-dots {
    display: flex; justify-content: center; gap: 8px; margin-top: 16px;
  }
  .promo-dot {
    width: 8px; height: 8px; border-radius: 100px;
    background: #D4B896; border: none; cursor: pointer; transition: all 0.3s;
  }
  .promo-dot.on { width: 24px; background: #F47B20; }
`;

export default function PromoSlider() {
  const [active, setActive] = useState(0);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  const go = (n: number) => {
    setActive(n);
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setActive(a => (a + 1) % promos.length), 5000);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => setActive(a => (a + 1) % promos.length), 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  return (
    <div>
      <style>{css}</style>
      <div className="promo-slider">
        <div className="promo-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {promos.map((p, i) => (
            <div key={i} className="promo-slide">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('promo_click', { promo: p.label });
                  trackMetaEvent('ViewContent', { content_name: p.label });
                }}
              >
                <img src={p.img} alt={p.alt} />
              </a>
            </div>
          ))}
        </div>

        <button className="promo-arr promo-arr-l" onClick={() => go((active - 1 + promos.length) % promos.length)}>‹</button>
        <button className="promo-arr promo-arr-r" onClick={() => go((active + 1) % promos.length)}>›</button>
      </div>

      <div className="promo-dots">
        {promos.map((_, i) => (
          <button key={i} className={`promo-dot${i === active ? ' on' : ''}`} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}
