# Branding & Asset Guide

Halo Favian! Saya sudah menyiapkan tempat (placeholder) untuk Logo dan Foto Profil kamu. Berikut cara menggantinya:

## 1. Mengganti Logo
Buka file `src/components/Logo.jsx`.
- Cari blok komentar bertuliskan `TIPS UNTUK USER`.
- Ganti komponen `<Terminal />` dengan tag `<img />` yang mengarah ke file logo kamu di folder `public`.

## 2. Mengganti Foto Profil (di CV)
Buka file `src/components/Resume.jsx`.
- Cari blok komentar bertuliskan `TIPS UNTUK USER`.
- Ganti komponen `<User size={80} />` dengan tag `<img />` yang mengarah ke foto kamu.

## 3. Cara Masuk ke Admin
Saya sudah menaruh tombol **Gear (Gerigi)** kecil di **pojok kiri bawah** layar.
- Tombol ini sengaja dibuat transparan agar tidak mengganggu desain utama.
- Cukup arahkan mouse ke pojok kiri bawah, dan klik ikon Gear yang muncul untuk melihat log pesan realtime.

---
*Catatan: Semua file gambar sebaiknya ditaruh di dalam folder `/public` agar bisa diakses langsung melalui path `/nama_file.jpg`.*
