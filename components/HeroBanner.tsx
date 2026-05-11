'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { trackEvent } from './GoogleAnalytics';
import { trackMetaEvent } from './MetaPixel';

const css = `
  @font-face {
    font-family: 'Super Moods';
    src: url('/fonts/Super_Moods.ttf') format('truetype');
    font-display: swap;
  }

  @keyframes f1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 45%{transform:translateY(-18px) rotate(0.8deg)} 70%{transform:translateY(-9px) rotate(-1.5deg)} }
  @keyframes f2 { 0%,100%{transform:translateY(-4px) rotate(0.5deg)} 38%{transform:translateY(-22px) rotate(-1deg)} 72%{transform:translateY(-10px) rotate(1.2deg)} }
  @keyframes f3 { 0%,100%{transform:translateY(-7px) rotate(-0.8deg)} 52%{transform:translateY(-24px) rotate(1deg)} }
  @keyframes f4 { 0%,100%{transform:translateY(-2px) rotate(1.2deg)} 41%{transform:translateY(-16px) rotate(-0.6deg)} 68%{transform:translateY(-8px) rotate(0.9deg)} }
  @keyframes fe { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 30%{transform:translateY(-9px) rotate(10deg) scale(1.06)} 70%{transform:translateY(-4px) rotate(-6deg) scale(0.96)} }
  @keyframes slideU { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideR { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ctaPulse { 0%,100%{transform:scale(1);box-shadow:0 4px 20px rgba(0,0,0,0.11)} 50%{transform:scale(1.03);box-shadow:0 8px 28px rgba(0,0,0,0.17)} }
  @keyframes sunGlow { 0%,100%{box-shadow:0 0 0 8px rgba(255,214,0,0.2),0 0 0 18px rgba(255,214,0,0.08)} 50%{box-shadow:0 0 0 14px rgba(255,214,0,0.28),0 0 0 26px rgba(255,214,0,0.1)} }
  @keyframes wobble { 0%,100%{transform:rotate(-2deg) scale(1)} 50%{transform:rotate(2deg) scale(1.04)} }

  .hb-txt-enter { animation: slideU 0.55s cubic-bezier(0.22,1,0.36,1) both; }
  .hb-img-enter { animation: slideR 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  .fl1 { animation: f1 5.2s ease-in-out infinite; }
  .fl2 { animation: f2 4.6s ease-in-out 0.4s infinite; }
  .fl3 { animation: f3 6.0s ease-in-out 1.1s infinite; }
  .fl4 { animation: f4 5.5s ease-in-out 0.7s infinite; }
  .fle { animation: fe ease-in-out infinite; }

  /* ── Hero wrapper ── */
  .hb-section { position:relative; width:100%; overflow:hidden; }

  /* ── Desktop layout ── */
  .hb-inner {
    position:relative; width:100%; height:540px;
    display:flex; overflow:hidden; transition:background 0.7s;
  }
  .hb-left {
    width:40%; flex-shrink:0;
    padding:0 24px 0 56px;
    display:flex; flex-direction:column; justify-content:center;
    position:relative; z-index:3;
  }
  .hb-right {
    width:60%; flex-shrink:0;
    position:relative; z-index:2; overflow:hidden;
  }
  .hb-ground1 {
    position:absolute; bottom:0; left:0; right:0; height:90px;
    border-radius:60% 60% 0 0 / 40px 40px 0 0; z-index:1;
    transition:background 0.7s;
  }
  .hb-ground2 {
    position:absolute; bottom:0; left:0; right:0; height:52px; z-index:1;
    transition:background 0.7s;
  }

  /* ── Tag shapes ── */
  .hb-tag-accent {
    display:inline-flex; align-items:center; gap:6px;
    background:white; padding:6px 18px;
    border-radius:0 18px 18px 0;
    font-size:12px; font-weight:700; color:#444;
    margin-bottom:14px; width:fit-content;
    box-shadow:3px 3px 0 rgba(0,0,0,0.08);
    border-left:4px solid #EE5729;
  }
  .hb-tag-round {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(255,255,255,0.92); padding:7px 18px;
    border-radius:50px; font-size:12px; font-weight:700; color:#333;
    margin-bottom:14px; width:fit-content;
    box-shadow:0 4px 12px rgba(0,0,0,0.1);
    border:2px solid rgba(255,255,255,0.5);
  }
  .hb-tag-star {
    display:inline-flex; align-items:center; gap:7px;
    background:rgba(255,255,255,0.9); padding:7px 20px 7px 20px;
    border-radius:50px; font-size:12px; font-weight:700; color:#2E7D32;
    margin-bottom:14px; width:fit-content;
    box-shadow:0 4px 14px rgba(0,0,0,0.1);
    position:relative;
  }
  .hb-tag-star::before, .hb-tag-star::after {
    content:''; position:absolute; top:50%; transform:translateY(-50%);
    border-top:16px solid transparent; border-bottom:16px solid transparent;
  }

  .hb-badges { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:22px; }
  .hb-badge {
    background:rgba(255,255,255,0.88); padding:5px 13px;
    border-radius:100px; font-size:11px; font-weight:700; color:#333;
    box-shadow:0 2px 8px rgba(0,0,0,0.08);
  }
  .hb-badge-halal {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 12px 4px 6px;
  }
  .hb-cta {
    display:inline-flex; align-items:center; gap:8px;
    background:white; padding:14px 30px;
    border-radius:100px; font-weight:800; font-size:14px;
    border:none; cursor:pointer; width:fit-content;
    font-family:inherit; animation:ctaPulse 2.5s ease-in-out infinite;
  }

  .hb-arrow {
    position:absolute; top:50%; transform:translateY(-50%);
    width:42px; height:42px; border-radius:50%;
    background:rgba(255,255,255,0.9); border:none; font-size:22px;
    cursor:pointer; z-index:10;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 3px 14px rgba(0,0,0,0.11);
  }
  .hb-dots {
    position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
    display:flex; gap:8px; z-index:10;
  }
  .hb-dot {
    height:8px; border-radius:100px;
    background:rgba(255,255,255,0.5); border:none; cursor:pointer; transition:all 0.3s;
  }
  .hb-dot.on { width:26px; background:white; }
  .hb-dot.off { width:8px; }

  /* ── TABLET (≤1024px) ── */
  @media (max-width:1024px) {
    .hb-inner { height:480px; }
    .hb-left { padding:0 16px 0 32px; width:42%; }
    .hb-right { width:58%; }
    .hb-tag-accent, .hb-tag-round, .hb-tag-star { font-size:11px; }
    .hb-badges { gap:5px; margin-bottom:16px; }
    .hb-badge { font-size:10px; padding:4px 10px; }
    .hb-cta { font-size:13px; padding:12px 22px; }
  }

  /* ── TABLET PORTRAIT / LARGE MOBILE (600-768px) ── */
  @media (min-width:600px) and (max-width:768px) {
    .hb-inner { min-height:500px; }
    .hb-left { padding:20px 28px 0; }
    .hb-right { min-height:220px; }
  }

  /* ── MOBILE (≤768px) ── */
  @media (max-width:768px) {
    .hb-inner {
      height:auto; flex-direction:column;
      padding-top:80px; padding-bottom:0;
      min-height:560px;
    }
    .hb-left {
      width:100%; padding:24px 24px 0;
      align-items:center; text-align:center; justify-content:flex-start;
    }
    .hb-right {
      width:100%; flex:1;
      min-height:200px; position:relative;
    }
    .hb-tag-accent, .hb-tag-round, .hb-tag-star {
      font-size:11px;
    }
    .hb-badges { justify-content:center; }
    .hb-cta { font-size:13px; padding:12px 24px; }
    .hb-ground1 { height:60px; }
    .hb-ground2 { height:36px; }
  }

  /* ── SMALL MOBILE (≤480px) ── */
  @media (max-width:480px) {
    .hb-inner { padding-top:72px; }
    .hb-left { padding:20px 16px 0; }
    .hb-cta { font-size:12px; padding:11px 20px; }
  }
`;

const slides = [
  {
    id: 1,
    bg: 'linear-gradient(140deg,#FFD54F 0%,#FFE082 50%,#FFF9E0 100%)',
    ground: '#7CB342', ground2: '#558B2F',
    tagType: 'accent',
    tag: '🥇 #SahabatPertamaSiKecil',
    title: null, fontFamily: 'inherit',
    titleColor: '', ctaColor: '#EE5729',
    sub: 'Lezat & sehat untuk tumbuh kembang anak optimal',
    subColor: '#5D4037',
    badges: ['🌿 Tanpa Pengawet', '🌱 GMO Free', '🍃 Natural'],
    cta: 'Lihat Semua Produk →',
    shopLink: 'https://shopee.co.id/yummybites_official',
    hasSun: true,
    // desktop items (absolute positioned)
    items: [
      { src: '/images/mascot_papa.webp',  w: 160, h: 315, floatClass: 'fl1', style: { bottom: 52, left: '1%' } },
      { src: '/images/mascot_yuyu.webp',  w: 138, h: 188, floatClass: 'fl3', style: { bottom: 52, left: '26%' } },
      { src: '/images/mascot_bibi.webp',  w: 138, h: 179, floatClass: 'fl2', style: { bottom: 52, left: '51%' } },
      { src: '/images/mascot_mama.webp',  w: 160, h: 299, floatClass: 'fl4', style: { bottom: 52, right: '1%' } },
    ],
    // mobile: show only 2 center mascots
    mobileItems: [
      { src: '/images/mascot_yuyu.webp', w: 90, h: 122, floatClass: 'fl3', style: { bottom: 36, left: '20%' } },
      { src: '/images/mascot_bibi.webp', w: 90, h: 116, floatClass: 'fl2', style: { bottom: 36, right: '20%' } },
    ],
    decos: [
      { icon: '🌟', delay: '0s',    dur: '4.1s', top: '15%', left: '40%' },
      { icon: '✨', delay: '1.3s',  dur: '3.8s', top: '12%', right: '7%' },
      { icon: '⭐', delay: '2.1s',  dur: '4.6s', top: '32%', right: '5%' },
    ],
  },
  {
    id: 2,
    bg: 'linear-gradient(140deg,#87CEEB 0%,#B8E4F5 50%,#E8F7FF 100%)',
    ground: '#5DBB40', ground2: '#48A030',
    tagType: 'accent',
    tag: '🏆 Wafer Favorit Si Kecil #1',
    title: 'BEBEWAFER', fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
    titleColor: '#FF6B9D', ctaColor: '#FF6B9D',
    sub: 'Melty, Creamy, Yummy!',
    subColor: '#0D47A1',
    badges: ['🥛 High in Calcium','💊 Vitamin C','🧬 High in DHA','🩸 High in Iron','__HALAL__'],
    cta: 'Beli Sekarang →',
    shopLink: 'https://shopee.co.id/yummybites_official',
    hasSun: false,
    items: [
      { src: '/images/bebe_milk.webp',       w: 175, h: 175, floatClass: 'fl1', style: { bottom: 55, left: '1%' } },
      { src: '/images/bebe_choco.webp',       w: 220, h: 220, floatClass: 'fl2', style: { bottom: 55, left: '22%' } },
      { src: '/images/bebe_strawberry.webp',  w: 215, h: 215, floatClass: 'fl3', style: { bottom: 55, left: '50%' } },
      { src: '/images/bebe_banana.webp',      w: 175, h: 175, floatClass: 'fl4', style: { bottom: 55, right: '1%' } },
    ],
    mobileItems: [
      { src: '/images/bebe_choco.webp',      w: 140, h: 140, floatClass: 'fl2', style: { bottom: 36, left: '8%' } },
      { src: '/images/bebe_strawberry.webp', w: 150, h: 150, floatClass: 'fl3', style: { bottom: 36, left: '35%' } },
      { src: '/images/bebe_banana.webp',     w: 120, h: 120, floatClass: 'fl4', style: { bottom: 36, right: '6%' } },
    ],
    decos: [
      { icon: '🍫', delay: '0s',   dur: '4.3s', top: '14%', left: '40%' },
      { icon: '🥛', delay: '1.6s', dur: '3.9s', top: '10%', right: '6%' },
      { icon: '🍓', delay: '0.9s', dur: '5.0s', bottom: '30%', left: '39%' },
    ],
  },
  {
    id: 3,
    bg: 'linear-gradient(140deg,#7ED17E 0%,#A8E6A3 50%,#E0F5E0 100%)',
    ground: '#43A047', ground2: '#2E7D32',
    tagType: 'accent',
    tag: '🚀 Start 10 Bulan+',
    title: 'CRUNCHIES', fontFamily: "'Super Moods', cursive",
    titleColor: '#E65100', ctaColor: '#E65100',
    sub: 'Cemilan Penuh Rasa, untuk Senyum Pertama',
    subColor: '#1B5E20',
    badges: ['🐟 Omega 3 & 6','🔥 Baked','💧 Easy to Melt','__HALAL__'],
    cta: 'Beli Sekarang →',
    shopLink: 'https://shopee.co.id/yummybites_official',
    hasSun: false,
    items: [
      { src: '/images/crunch_cheese.webp',   w: 185, h: 224, floatClass: 'fl1', style: { bottom: 55, left: '4%' } },
      { src: '/images/crunch_stroberi.webp', w: 220, h: 267, floatClass: 'fl3', style: { bottom: 55, left: '30%' } },
      { src: '/images/crunch_choco.webp',    w: 185, h: 224, floatClass: 'fl2', style: { bottom: 55, right: '4%' } },
    ],
    mobileItems: [
      { src: '/images/crunch_cheese.webp',   w: 95, h: 115, floatClass: 'fl1', style: { bottom: 36, left: '5%' } },
      { src: '/images/crunch_stroberi.webp', w: 115, h: 140, floatClass: 'fl3', style: { bottom: 36, left: '30%' } },
      { src: '/images/crunch_choco.webp',    w: 95, h: 115, floatClass: 'fl2', style: { bottom: 36, right: '5%' } },
    ],
    decos: [
      { icon: '🌽', delay: '0s',   dur: '4.2s', top: '13%', left: '40%' },
      { icon: '🧀', delay: '1.5s', dur: '3.8s', top: '10%', right: '5%' },
      { icon: '🍫', delay: '2.8s', dur: '4.0s', bottom: '28%', right: '6%' },
    ],
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const go = (n: number) => {
    setActive(n);
    setKey(k => k + 1);
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive(a => (a + 1) % slides.length);
      setKey(k => k + 1);
    }, 4800);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActive(a => (a + 1) % slides.length);
      setKey(k => k + 1);
    }, 4800);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const s = slides[active];
  const tabletItems = s.mobileItems.map(item => ({
    ...item,
    w: Math.round(item.w * 1.3),
    h: Math.round(item.h * 1.3),
  }));
  const displayItems = isMobile ? s.mobileItems : isTablet ? tabletItems : s.items;

  const Tag = () => {
    const cls = s.tagType === 'round' ? 'hb-tag-round' : s.tagType === 'star' ? 'hb-tag-star' : 'hb-tag-accent';
    return <span className={cls}>{s.tag}</span>;
  };

  return (
    <section className="hb-section">
      <style>{css}</style>

      <div className="hb-inner" style={{ background: s.bg, transition: 'background 0.7s' }}>

        <div className="hb-ground1" style={{ background: s.ground }} />
        <div className="hb-ground2" style={{ background: s.ground2 }} />

        {s.hasSun && !isMobile && (
          <div style={{ position:'absolute', top:55, right:52, width:70, height:70, background:'#FFD600', borderRadius:'50%', animation:'sunGlow 3s ease-in-out infinite', zIndex:0 }} />
        )}

        {/* Deco emojis */}
        {!isMobile && s.decos.map((d, i) => (
          <span key={`${active}-e${i}`} className="fle" style={{
            position:'absolute',
            top: (d as any).top, bottom: (d as any).bottom,
            left: (d as any).left, right: (d as any).right,
            fontSize: 20, opacity: 0.6, zIndex:4, pointerEvents:'none',
            animationDuration: d.dur, animationDelay: d.delay,
          }}>{d.icon}</span>
        ))}

        {/* LEFT TEXT */}
        <div key={`t${key}`} className="hb-txt-enter hb-left">
          <Tag />

          {s.title ? (
            <h1 style={{
              fontSize: isMobile ? 'clamp(36px,9vw,52px)' : 'clamp(42px,4.8vw,70px)',
              fontWeight:900, lineHeight:1, color:s.titleColor,
              textShadow:'3px 3px 0 rgba(255,255,255,0.4)',
              marginBottom:12, letterSpacing:-1, fontFamily:s.fontFamily,
            }}>{s.title}</h1>
          ) : (
            <div style={{ marginBottom:14, display:'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <Image src="/images/logo_yb.webp" alt="Yummy Bites" width={260} height={104}
                style={{ objectFit:'contain', width:'auto', height: isMobile ? 80 : 104 }} />
            </div>
          )}

          <p style={{
            fontSize: isMobile ? 13 : 14, fontWeight:600,
            color:s.subColor, lineHeight:1.65, marginBottom:16,
          }}>{s.sub}</p>

          <div className="hb-badges">
            {s.badges.map(b => b === '__HALAL__' ? (
              <span key={b} className="hb-badge hb-badge-halal">
                <img src="/images/halal-logo.jpg" alt="Halal Indonesia" style={{ width:20, height:20, objectFit:'contain', display:'block' }} />
                Halal
              </span>
            ) : (
              <span key={b} className="hb-badge">{b}</span>
            ))}
          </div>

          <button
            className="hb-cta"
            style={{ color: s.ctaColor, margin: isMobile ? '0 auto' : undefined }}
            onClick={() => {
              trackEvent('banner_cta', { slide: s.id });
              trackMetaEvent('ViewContent', { content_name: s.title || 'YB' });
              window.open(s.shopLink, '_blank');
            }}
          >{s.cta}</button>
        </div>

        {/* RIGHT / IMAGES */}
        <div key={`r${key}`} className="hb-img-enter hb-right">
          {displayItems.map((item, i) => (
            <div key={i} className={item.floatClass} style={{ position:'absolute', ...item.style }}>
              <Image src={item.src} alt="" width={item.w} height={item.h}
                style={{ width:item.w, height:'auto', objectFit:'contain', display:'block' }} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="hb-arrow" onClick={() => go((active-1+slides.length)%slides.length)} style={{ left:14 }}>‹</button>
        <button className="hb-arrow" onClick={() => go((active+1)%slides.length)} style={{ right:14 }}>›</button>

        {/* Dots */}
        <div className="hb-dots">
          {slides.map((_,i) => (
            <button key={i} className={`hb-dot ${i===active?'on':'off'}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
