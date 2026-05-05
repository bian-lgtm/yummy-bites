'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/components/GoogleAnalytics';
import { trackMetaEvent } from '@/components/MetaPixel';
import styles from './page.module.css';

const products = [
  {
    name: 'Crispy Tempe Chips',
    desc: 'Tempe pilihan, digoreng garing tanpa MSG. Gurih, renyah, nagih!',
    emoji: '🌿',
    price: 'Rp 28.000',
    badge: 'Best Seller',
  },
  {
    name: 'Almond Choco Cluster',
    desc: 'Almond panggang dibalut dark chocolate premium. Camilan mewah setiap hari.',
    emoji: '🍫',
    price: 'Rp 45.000',
    badge: 'New',
  },
  {
    name: 'Sambal Cashew Mix',
    desc: 'Kacang mete dengan bumbu sambal kering khas Nusantara. Pedas, gurih, krispi.',
    emoji: '🌶️',
    price: 'Rp 38.000',
    badge: 'Spicy Fav',
  },
];

const testimonials = [
  { name: 'Aisha R.', city: 'Jakarta', text: 'Udah berbulan-bulan langganan. Chips tempe-nya emang beda, gak ada yang ngalahin!', stars: 5 },
  { name: 'Budi S.', city: 'Bandung', text: 'Snack kantor favorit tim gue. Sehat, enak, dan packagingnya lucu banget.', stars: 5 },
  { name: 'Citra M.', city: 'Surabaya', text: 'Akhirnya nemu camilan sehat yang rasanya gak kalah sama yang biasa. Worth it banget!', stars: 5 },
];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleCTAClick(label: string) {
    trackEvent('cta_click', { button_label: label });
    trackMetaEvent('InitiateCheckout', { content_name: label });
  }

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    trackEvent('lead_submit', { email });
    trackMetaEvent('Lead', { content_name: 'Email Signup' });
    setSubmitted(true);
  }

  return (
    <main className={styles.main}>

      {/* NAV */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navLogo}>🍊 Yummy Bites</div>
        <a href="#order" className={styles.navCta} onClick={() => handleCTAClick('Nav Order')}>
          Pesan Sekarang
        </a>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />
          <div className={styles.blob3} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>✨ 100% Natural Ingredients</span>
          <h1 className={styles.heroTitle}>
            Snack yang <em>Enak</em><br />
            Tubuh yang <em>Sehat</em>
          </h1>
          <p className={styles.heroDesc}>
            Camilan premium tanpa pengawet buatan. Dibuat dari bahan alami pilihan,
            langsung dari dapur ke tanganmu. Nikmati hidup sehat tanpa kompromi rasa.
          </p>
          <div className={styles.heroCtas}>
            <a href="#order" className={styles.btnPrimary} onClick={() => handleCTAClick('Hero Order')}>
              Mau Coba? Pesan Dulu →
            </a>
            <a href="#products" className={styles.btnSecondary}>
              Lihat Produk
            </a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}><strong>12.000+</strong><span>Pelanggan Puas</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>4.9 ★</strong><span>Rating Rata-rata</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>0</strong><span>Bahan Pengawet</span></div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.productCard}>
            <div className={styles.productEmoji}>🍊</div>
            <div className={styles.productInfo}>
              <span>Crispy Tempe Chips</span>
              <strong>Rp 28.000</strong>
            </div>
          </div>
          <div className={styles.floatingTag1}>🌿 No MSG</div>
          <div className={styles.floatingTag2}>❤️ No Preservatives</div>
          <div className={styles.floatingTag3}>🔥 High Protein</div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className={styles.trustBar}>
        {['BPOM Certified', 'Free Ongkir > Rp 150rb', 'Garansi Freshness', 'Kemasan Ramah Lingkungan'].map(t => (
          <div key={t} className={styles.trustItem}>✓ {t}</div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section id="products" className={styles.products}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Menu Favorit</span>
          <h2 className={styles.sectionTitle}>Pilihan Camilan Sehat</h2>
          <p className={styles.sectionDesc}>Dibuat tiap hari — fresh, crispy, dan bikin kangen.</p>
        </div>
        <div className={styles.productGrid}>
          {products.map((p) => (
            <div key={p.name} className={styles.productItem}>
              {p.badge && <span className={styles.productBadge}>{p.badge}</span>}
              <div className={styles.productEmojiLarge}>{p.emoji}</div>
              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productDesc}>{p.desc}</p>
              <div className={styles.productFooter}>
                <span className={styles.productPrice}>{p.price}</span>
                <button
                  className={styles.addBtn}
                  onClick={() => handleCTAClick(`Add to Cart: ${p.name}`)}
                >
                  + Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className={styles.whyUs}>
        <div className={styles.whyGrid}>
          <div className={styles.whyText}>
            <span className={styles.sectionTag}>Kenapa Yummy Bites?</span>
            <h2 className={styles.sectionTitle}>Camilan yang Kamu Bisa Percaya</h2>
            <div className={styles.whyPoints}>
              {[
                { icon: '🌾', title: 'Bahan Alami 100%', desc: 'Dipilih langsung dari petani lokal terpercaya.' },
                { icon: '🏭', title: 'Dapur Bersertifikat', desc: 'Produksi di dapur bersertifikat BPOM dan higienis.' },
                { icon: '📦', title: 'Kemasan Kedap Udara', desc: 'Freshness terjaga hingga 3 bulan tanpa pengawet.' },
                { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Same-day delivery untuk area Jabodetabek.' },
              ].map(p => (
                <div key={p.title} className={styles.whyPoint}>
                  <span className={styles.whyIcon}>{p.icon}</span>
                  <div>
                    <strong>{p.title}</strong>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.whyVisual}>
            <div className={styles.whyBigEmoji}>🌿</div>
            <div className={styles.whyCircle} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Kata Mereka</span>
          <h2 className={styles.sectionTitle}>12.000+ Pelanggan Bahagia</h2>
        </div>
        <div className={styles.testiGrid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.testiCard}>
              <div className={styles.testiStars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.testiText}>"{t.text}"</p>
              <div className={styles.testiAuthor}>
                <div className={styles.testiAvatar}>{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER / LEAD CAPTURE */}
      <section id="order" className={styles.orderSection}>
        <div className={styles.orderInner}>
          <div className={styles.orderText}>
            <span className={styles.sectionTag} style={{ color: '#FFF8F0', opacity: 0.8 }}>Jangan Sampai Kehabisan</span>
            <h2 className={styles.sectionTitle} style={{ color: '#FFF8F0' }}>
              Dapatkan <em>Diskon 20%</em><br />untuk Pesanan Pertama
            </h2>
            <p style={{ color: '#FFE0C8', marginTop: '12px', lineHeight: 1.7 }}>
              Masukkan emailmu dan dapatkan kode promo eksklusif langsung di inbox-mu. Terbatas!
            </p>
          </div>
          {!submitted ? (
            <form className={styles.orderForm} onSubmit={handleLeadSubmit}>
              <input
                type="email"
                placeholder="emailkamu@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.emailInput}
              />
              <button type="submit" className={styles.submitBtn}>
                Klaim Diskon Sekarang 🎉
              </button>
              <p className={styles.formNote}>Tidak ada spam. Unsubscribe kapan saja.</p>
            </form>
          ) : (
            <div className={styles.successMsg}>
              <span>🎉</span>
              <strong>Yay! Cek emailmu ya!</strong>
              <p>Kode promo sudah dikirim ke <em>{email}</em></p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>🍊 Yummy Bites</div>
        <p>Camilan sehat untuk hidup yang lebih baik.</p>
        <div className={styles.footerLinks}>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">WhatsApp</a>
          <a href="#">Email</a>
        </div>
        <p className={styles.footerCopy}>© 2025 Yummy Bites. All rights reserved.</p>
      </footer>
    </main>
  );
}
