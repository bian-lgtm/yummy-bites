'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/components/GoogleAnalytics';
import { trackMetaEvent } from '@/components/MetaPixel';
import styles from './page.module.css';
import HeroBanner from '@/components/HeroBanner';
import StoreList from '@/components/StoreList';
import PromoSlider from '@/components/PromoSlider';

const products = [
  {
    id: 1,
    name: 'Yummy Bites Rice Crackers 25gr',
    category: 'Snack • 6 Bulan+',
    desc: 'Biskuit beras renyah, mudah digenggam, lumer di mulut. Finger food pertama yang sempurna untuk si kecil.',
    img: '/images/products/rc.webp',
    badge: 'Best Seller',
    badgeColor: '#EE5729',
    shopee: 'https://s.shopee.co.id/universal-link/2qRBlIgtrV?deep_and_web=1&smtt=9&utm_campaign=s25212762_ss_id_webs_websiterc25gr&utm_medium=seller&utm_source=website',
  },
  {
    id: 2,
    name: 'Yummy Bites Beberoll 40gr',
    category: 'Snack • 9 Bulan+',
    desc: 'Wafer roll tipis dan renyah, kaya Calcium & Vitamin E. Tersedia dalam rasa Orange, Chocolate, dan Banana.',
    img: '/images/products/beberoll.webp',
    badge: 'Favorit',
    badgeColor: '#F5C842',
    shopee: 'https://s.shopee.co.id/universal-link/W3GzAs8XU?deep_and_web=1&smtt=9&utm_campaign=s25212762_ss_id_webs_websitebeberoll&utm_medium=seller&utm_source=website',
  },
  {
    id: 3,
    name: 'Yummy Bites Pancake & Waffle Mix 130gr',
    category: 'Makanan Utama • 9 Bulan+',
    desc: 'Tepung pancake & waffle instan, sumber Iron dan tinggi Phosphorus & Vitamin A. Praktis dan lezat untuk sarapan si kecil.',
    img: '/images/products/pancake.webp',
    badge: null,
    badgeColor: '',
    shopee: 'https://s.shopee.co.id/universal-link/20s4lopBXn?deep_and_web=1&smtt=9&utm_campaign=s25212762_ss_id_webs_websitepancake&utm_medium=seller&utm_source=website',
  },
  {
    id: 4,
    name: 'Yummy Bites Crunchies 25gr',
    category: 'Snack • 10 Bulan+',
    desc: 'Cemilan baked rendah sodium, bebas gluten, kaya DHA & 7 Vitamin Mineral. Tersedia dalam rasa Cheddar Cheese & Hokkaido Strawberry Banana.',
    img: '/images/products/crunchies.webp',
    badge: 'New',
    badgeColor: '#21B681',
    shopee: 'https://s.shopee.co.id/universal-link/50VgLNf61g?deep_and_web=1&smtt=9&utm_campaign=s25212762_ss_id_webs_websitecrunchies&utm_medium=seller&utm_source=website',
  },
  {
    id: 5,
    name: 'Yummy Bites Bebewafer 25gr',
    category: 'Snack • 9 Bulan+',
    desc: 'Wafer premium tinggi Iron & Calcium, mengandung DHA. Tersedia dalam rasa Milk, Chocolate, dan Banana.',
    img: '/images/products/bebewafer.webp',
    badge: 'New',
    badgeColor: '#21B681',
    shopee: 'https://s.shopee.co.id/universal-link/1gFEN4IhV7?deep_and_web=1&smtt=9&utm_campaign=s25212762_ss_id_webs_websitebebewafer&utm_medium=seller&utm_source=website',
  },
  {
    id: 6,
    name: 'Yummy Bites Kiddy Extra Virgin Olive Oil 250ml',
    category: 'MPASI • 7 Bulan+',
    desc: 'Extra Virgin Olive Oil cold-pressed dari Spanyol. Kaya Omega 3, 6 & Vitamin E untuk tumbuh kembang optimal si kecil.',
    img: '/images/products/evoo.webp',
    badge: null,
    badgeColor: '',
    shopee: 'https://s.shopee.co.id/universal-link/50VgLJDq4M?deep_and_web=1&smtt=9&utm_campaign=s25212762_ss_id_webs_websiteevoo&utm_medium=seller&utm_source=website',
  },
];

const testimonials = [
  { name: 'Bunda Mega', city: 'Jakarta', stars: 5, text: 'Rice Crackers Yummy Bites udah jadi snack wajib anakku dari 6 bulan! Teksturnya lembut, langsung lumer di mulut. Bahan-bahannya alami, tenang kasihnya.' },
  { name: 'Mama Ica', city: 'Surabaya', stars: 5, text: 'Beberoll favorit banget! Anakku susah makan tapi kalau dikasih Beberoll langsung lahap. Rasa coklatnya ga terlalu manis, pas banget buat bayi.' },
  { name: 'Bunda Risa', city: 'Bandung', stars: 5, text: 'Crunchies Strawberry Banana baru coba dan langsung ketagihan! Si kecil suka banget, habis 1 pack langsung minta lagi. Recommended banget!' },
  { name: 'Mama Nita', city: 'Semarang', stars: 5, text: 'Pancake Mix Yummy Bites praktis banget buat sarapan. Teksturnya fluffy, bayi suka. Udah langganan dari anakku 9 bulan sampai sekarang 2 tahun!' },
];

const updates = [
  { date: 'Apr 2025', tag: 'New Product', title: 'Yummy Bites Furikake Hadir!', desc: 'Topping nasi bergizi untuk si kecil yang sudah mulai makan nasi. Kaya omega-3 dan protein.' },
  { date: 'Mar 2025', tag: 'Event', title: 'Pameran Mother & Baby Expo', desc: 'Kami hadir di Mother & Baby Expo Jakarta! Temui kami dan dapatkan sample gratis.' },
  { date: 'Feb 2025', tag: 'Award', title: 'Juara 1 SWA Awards 2025', desc: 'Yummy Bites meraih Juara 1 Penjualan Biskuit Bayi terbaik di E-Commerce.' },
];

const offlineStores = [
  { name: 'Grand Lucky', address: 'Seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/grandlucky.webp', maps: 'https://maps.google.com/?q=Grand+Lucky+Grand+Indonesia+Jakarta' },
  { name: 'Superindo', address: 'Tersedia di berbagai cabang seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/superindo.png', maps: 'https://maps.google.com/?q=Superindo+Indonesia' },
  { name: 'AEON', address: 'Seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/aeon.png', maps: 'https://maps.google.com/?q=AEON+Mall+Indonesia' },
  { name: 'Indomaret', address: 'Tersedia di berbagai gerai seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/indomaret.png', maps: 'https://maps.google.com/?q=Indomaret+Indonesia' },
  { name: 'Alfamart', address: 'Tersedia di berbagai gerai seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/alfamart.webp', maps: 'https://maps.google.com/?q=Alfamart+Indonesia' },
  { name: 'Babywise', address: 'Tersedia di berbagai cabang seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/babywise.png', maps: 'https://maps.google.com/?q=Babywise+Indonesia' },
  { name: 'Raja Susu', address: 'Tersedia di berbagai cabang seluruh Indonesia', city: 'Seluruh Indonesia', logo: '/images/stores/rajasusu.webp', maps: 'https://maps.google.com/?q=Raja+Susu+Indonesia' },
];

const marketplaceLogos: Record<string, string> = {
  'Shopee': '/images/stores/shopee.png',
  'TikTok Shop': '/images/stores/tiktok.png',
  'Tokopedia': '/images/stores/tokopedia.svg',
  'Lazada': '/images/stores/lazada.png',
};

const marketplaces = [
  { name: 'Shopee', icon: '🛍️', color: '#EE4D2D', url: 'https://shopee.co.id/yummy.bites?entryPoint=ShopBySearch&searchKeyword=yummy%20bites', label: 'Beli di Shopee' },
  { name: 'TikTok Shop', icon: '🎵', color: '#000000', url: 'https://vt.tiktok.com/ZS93KdVtt/?page=Mall', label: 'Beli di TikTok' },
  { name: 'Tokopedia', icon: '🏪', color: '#00AA5B', url: 'https://tk.tokopedia.com/ZS93ww1cy/', label: 'Beli di Tokped' },
  { name: 'Lazada', icon: '📦', color: '#0F146D', url: 'https://www.lazada.co.id/shop/yummy-bites-id/?spm=a2o4j.pdp_revamp.seller.1.25533269090ef2&itemId=8175726761&channelSource=pdp', label: 'Beli di Lazada' },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleShopClick(marketplace: string, productName?: string) {
    trackEvent('marketplace_click', { marketplace, product: productName });
    trackMetaEvent('InitiateCheckout', { content_name: productName || marketplace, content_category: marketplace });
  }

  return (
    <main className={styles.main}>

      {/* NAV */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <a href="/" className={styles.logo}>
          <Image src="/images/logo_yb.webp" alt="Yummy Bites" width={140} height={56} style={{ objectFit: 'contain', width: 'auto', height: 48 }} />
        </a>
        <div className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#produk" onClick={() => setMenuOpen(false)}>Produk</a>
          <a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang Kami</a>
          <a href="#update" onClick={() => setMenuOpen(false)}>Update</a>
          <a href="#testimoni" onClick={() => setMenuOpen(false)}>Testimoni</a>
          <a href="#toko" onClick={() => setMenuOpen(false)}>Toko</a>
          <a href="#beli" className={styles.navCta} onClick={() => { setMenuOpen(false); handleShopClick('nav'); }}>Beli Sekarang</a>
        </div>
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO BANNER */}
      <HeroBanner />

      {/* PRODUCTS */}
      <section id="produk" className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Produk Unggulan</span>
          <h2 className={styles.sectionTitle}>Produk Kesukaan Moms & Si Kecil</h2>
          <p className={styles.sectionSub}>Dibuat dari bahan alami pilihan, aman dan lezat untuk bayi mulai 6 bulan</p>
        </div>
        <div className={styles.productGrid}>
          {products.map(p => (
            <div key={p.id} className={styles.productCard}>
              {p.badge && <span className={styles.badge} style={{ background: p.badgeColor }}>{p.badge}</span>}
              <div className={styles.productImg}><img src={p.img} alt={p.name} /></div>
              <div className={styles.productInfo}>
                <span className={styles.productCategory}>{p.category}</span>
                <h3 className={styles.productName}>{p.name}</h3>
              </div>
              <a
                href={p.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shopBtn}
                onClick={() => handleShopClick('Shopee', p.name)}
              >
                🛍️ Beli Sekarang
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO SLIDER */}
      <section className={styles.promoSection}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Promo Spesial</span>
          <h2 className={styles.sectionTitle}>Penawaran Terbaik untuk Bunda</h2>
        </div>
        <div className={styles.promoWrap}>
          <PromoSlider />
        </div>
      </section>

      {/* ABOUT */}
      <section id="tentang" className={styles.aboutSection}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Tentang Yummy Bites</h2>
        </div>
        <div className={styles.aboutInner}>

          {/* KIRI — Logo */}
          <div className={styles.aboutLogoCol}>
            <Image src="/images/logo_yb.webp" alt="Yummy Bites" width={220} height={88} style={{ objectFit:'contain', width:'100%', maxWidth:220, height:'auto' }} />
          </div>

          {/* KANAN — Teks */}
          <div className={styles.aboutText}>
            <p className={styles.aboutDesc}>
              Yummy Bites berdiri sejak <strong>2015</strong>, hadir untuk memberikan makanan terbaik bagi bayi dan balita — dibuat dari bahan-bahan alami pilihan, bebas alergen, dan tersedia dalam varian organik. Setiap produk dirancang sesuai tahap tumbuh kembang si kecil, dan telah tersertifikasi standar keamanan pangan internasional seperti HACCP, BRC, dan SQF, serta badan sertifikasi organik USDA (Amerika), ACOS Standards (Australia), EU Standards (Eropa), dan ECOCERT (Prancis).
            </p>
            <div className={styles.aboutVisionMission}>
              <div className={styles.vmCard}>
                <strong>Visi</strong>
                <p>Menjadi perusahaan makanan berkelas dunia yang menghadirkan produk dan layanan terbaik bagi pelanggan.</p>
              </div>
              <div className={styles.vmCard}>
                <strong>Misi</strong>
                <p>Menghadirkan produk berkualitas terbaik, memberikan pelayanan prima, dan terus memperluas distribusi ke seluruh Indonesia dan dunia.</p>
              </div>
            </div>
            <div className={styles.aboutStats}>
              {[
                { num: '2015', label: 'Berdiri Sejak' },
                { num: '100+', label: 'Varian Produk' },
                { num: '10+', label: 'Penghargaan' },
              ].map(s => (
                <div key={s.label} className={styles.stat}>
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND UPDATES */}
      <section id="update" className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Brand Update</span>
          <h2 className={styles.sectionTitle}>Berita & Aktivitas Terbaru</h2>
        </div>
        <div className={styles.updateGrid}>
          {updates.map((u, i) => (
            <div key={i} className={styles.updateCard}>
              <div className={styles.updateHeader}>
                <span className={styles.updateTag}>{u.tag}</span>
                <span className={styles.updateDate}>{u.date}</span>
              </div>
              <h3 className={styles.updateTitle}>{u.title}</h3>
              <p className={styles.updateDesc}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimoni" className={styles.testiSection}>
        <div className={styles.sectionHead}>
          <span className={styles.tag} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>Testimoni</span>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Kata Para Bunda</h2>
          <p className={styles.sectionSub} style={{ color: 'rgba(255,255,255,0.8)' }}>50.000+ keluarga sudah mempercayai Yummy Bites</p>
        </div>
        <div className={styles.testiGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testiCard}>
              <div className={styles.testiStars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.testiText}>"{t.text}"</p>
              <div className={styles.testiAuthor}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARKETPLACE */}
      <section id="beli" className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Tersedia di</span>
          <h2 className={styles.sectionTitle}>Beli di Marketplace Favoritmu</h2>
          <p className={styles.sectionSub}>Yummy Bites tersedia di semua marketplace terpercaya Indonesia</p>
        </div>
        <div className={styles.marketGrid}>
          {marketplaces.map(m => (
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.marketCard}
              style={{ '--market-color': m.color } as React.CSSProperties}
              onClick={() => handleShopClick(m.name)}
            >
              <img src={marketplaceLogos[m.name] || ''} alt={m.name} className={styles.marketLogo} />
              <span className={styles.marketCta}>{m.label} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* OFFLINE STORES */}
      <section id="toko" className={styles.storeSection}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Temukan Kami</span>
          <h2 className={styles.sectionTitle}>Tersedia di Toko Terdekatmu</h2>
          <p className={styles.sectionSub}>Yummy Bites sudah hadir di berbagai toko di seluruh Indonesia</p>
        </div>
        <StoreList stores={offlineStores} />
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Image src="/images/logo_yb.webp" alt="Yummy Bites" width={160} height={64} style={{ objectFit: 'contain', width: 'auto', height: 56 }} />
            <p>Makanan sehat dan lezat untuk tumbuh kembang optimal Si Kecil. Organik, tanpa pengawet, bersertifikat.</p>
          </div>
          <div className={styles.footerLinks}>
            <strong>Menu</strong>
            <a href="#produk">Produk</a>
            <a href="#tentang">Tentang Kami</a>
            <a href="#update">Brand Update</a>
            <a href="#testimoni">Testimoni</a>
            <a href="#toko">Toko</a>
          </div>
          <div className={styles.footerLinks}>
            <strong>Beli Sekarang</strong>
            {marketplaces.map(m => <a key={m.name} href={m.url} target="_blank" rel="noopener noreferrer">{m.name}</a>)}
          </div>
          <div className={styles.footerLinks}>
            <strong>Ikuti Kami</strong>
            <a href="https://www.instagram.com/yummybites_id" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@yummybites_id" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://yummybites.com" target="_blank" rel="noopener noreferrer">Website Resmi</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 Yummy Bites · PT. Leon Boga Sentosa · All rights reserved.</p>
        </div>
      </footer>

      {/* FLOATING CHAT BUTTON */}
      <a
        href="https://wa.me/6281110018022"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.waFloat}
        aria-label="Chat Kami"
      >
        <span className={styles.waIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
          </svg>
        </span>
        <span className={styles.waLabel}>Chat Kami</span>
      </a>

    </main>
  );
}
