# 🍊 Yummy Bites — Landing Page

Next.js landing page dengan Google Analytics & Meta Pixel, siap deploy ke Vercel.

---

## 🚀 Setup & Deploy

### 1. Clone & Install

```bash
npm install
```

### 2. Buat file `.env.local`

Copy dari template:
```bash
cp .env.local.example .env.local
```

Isi dengan ID tracking kamu:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXXX
```

### 3. Run Lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy ke Vercel

### Cara 1: Via GitHub (Recommended)

1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) → **New Project**
3. Import repo GitHub kamu
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = ID GA4-mu
   - `NEXT_PUBLIC_META_PIXEL_ID` = ID Pixel-mu
5. Klik **Deploy** ✅

### Cara 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Tambahkan env vars saat proses setup atau via dashboard Vercel.

---

## 📊 Cara Dapat ID Tracking

### Google Analytics (GA4)
1. Buka [analytics.google.com](https://analytics.google.com)
2. Buat akun → Buat Property baru
3. Pilih **Web** → masukkan URL situsmu
4. Salin **Measurement ID** (format: `G-XXXXXXXXXX`)

### Meta Pixel
1. Buka [business.facebook.com](https://business.facebook.com)
2. Events Manager → **Connect Data Sources** → Web
3. Buat Pixel baru → salin **Pixel ID** (angka 15-16 digit)

---

## 📁 Struktur Project

```
yummy-bites/
├── app/
│   ├── layout.tsx        ← Root layout + GA + Meta Pixel
│   ├── page.tsx          ← Landing page utama
│   ├── page.module.css   ← Styles
│   └── globals.css       ← Global CSS
├── components/
│   ├── GoogleAnalytics.tsx  ← GA4 component + trackEvent()
│   └── MetaPixel.tsx        ← Meta Pixel + trackMetaEvent()
├── .env.local.example    ← Template env vars
├── vercel.json           ← Vercel config
└── next.config.mjs
```

---

## 🎯 Event Tracking yang Sudah Ada

| Event | GA4 | Meta Pixel |
|-------|-----|------------|
| Klik tombol CTA | `cta_click` | `InitiateCheckout` |
| Submit email form | `lead_submit` | `Lead` |
| Page view | otomatis | otomatis |

Untuk tambah event custom, gunakan:
```ts
import { trackEvent } from '@/components/GoogleAnalytics';
import { trackMetaEvent } from '@/components/MetaPixel';

trackEvent('nama_event', { key: 'value' });
trackMetaEvent('Purchase', { value: 28000, currency: 'IDR' });
```
