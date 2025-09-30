# 🎮 Deltarune Website

เว็บไซต์ธีม Deltarune ที่สร้างด้วย React และ Tailwind CSS พร้อมเพลงพื้นหลังและดีไซน์แบบเกม

## ✨ Features

- 🎵 เครื่องเล่นเพลงพื้นหลังแบบอัตโนมัติ
- 🎨 ธีม Deltarune สีน้ำเงิน/ม่วงสวยงาม
- 📱 รองรับทั้ง Desktop และ Mobile
- 🃏 ระบบแสดงการ์ด Addon และ BetMcUi
- 🖥️ Terminal Error Log จำลอง
- 🎯 Navigation แบบ SPA (Single Page Application)

## 🚀 การติดตั้ง

1. Clone repository นี้:
   ```bash
   git clone https://github.com/yourusername/deltarune-website.git
   cd deltarune-website
   ```

2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

3. เพิ่มภาพพื้นหลัง Deltarune:
   - วางไฟล์ภาพ Deltarune ของคุณในโฟลเดอร์ `src/assets/`
   - เปลี่ยนชื่อเป็น `deltarune-bg.png`

4. รันโปรเจกต์:
   ```bash
   npm run dev
   ```

## 🛠️ การใช้งาน

### เพิ่มการ์ดใหม่

ในไฟล์ `src/components/AddonPage.tsx` หรือ `BetMcUiPage.tsx`:

```tsx
const cards = [
  {
    title: "ชื่อการ์ด",
    image: "URL_ภาพ",
    name: "ชื่อ",
    description: "คำอธิบาย",
    link: "https://example.com"
  },
  // เพิ่มการ์ดใหม่ตรงนี้...
];
```

### ปรับแต่งเพลงพื้นหลัง

ในไฟล์ `src/components/MusicPlayer.tsx` สามารถเปลี่ยน URL เพลงได้:

```tsx
const musicTracks = [
  "URL_เพลง_1",
  "URL_เพลง_2",
  // เพิ่มเพลงใหม่ตรงนี้...
];
```

## 📁 โครงสร้างโปรเจกต์

```
src/
├── components/
│   ├── AddonPage.tsx      # หน้า Addon
│   ├── BetMcUiPage.tsx    # หน้า BetMcUi
│   ├── Card.tsx           # คอมโพเนนต์การ์ด
│   ├── LandingPage.tsx    # หน้าแรก
│   ├── MusicPlayer.tsx    # เครื่องเล่นเพลง
│   ├── Navigation.tsx     # แถบนำทาง
│   └── OtherPage.tsx      # หน้า Other
├── styles/
│   └── globals.css        # CSS หลัก
├── assets/
│   └── deltarune-bg.png   # ภาพพื้นหลัง
└── App.tsx                # คอมโพเนนต์หลัก
```

## 🎨 การปรับแต่งธีม

ธีมหลักอยู่ในไฟล์ `src/styles/globals.css`:

- `.pixel-font` - ฟอนต์พิกเซล
- `.deltarune-bg` - พื้นหลังไล่สี
- `.blur-bar` - แถบนำทางเบลอ
- `.deltarune-card` - การ์ดแบบเกม

## 🚀 การ Deploy

### Vercel
```bash
npm run build
# อัปโหลดโฟลเดอร์ dist ไปยัง Vercel
```

### Netlify
```bash
npm run build
# ลากโฟลเดอร์ dist ไปวางใน Netlify
```

## 🤝 การมีส่วนร่วม

1. Fork โปรเจกต์นี้
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. สร้าง Pull Request

## 📄 License

โปรเจกต์นี้เป็น open source ภายใต้ MIT License

## 🎵 Credits

- ธีมจาก Deltarune (Toby Fox)
- สร้างด้วย React + Vite + Tailwind CSS
- ฟอนต์ "Press Start 2P" จาก Google Fonts