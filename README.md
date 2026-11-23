# Paket Lengkap CRUD User + Auto Number + Laporan + Dashboard Sidebar (Next.js App Router)

## Langkah Pemasangan:
1. Ekstrak ZIP ini.
2. Pastikan di `prisma/schema.prisma` model `User` sudah memiliki kolom `kodeUser String @unique` (lihat `prisma/schema_contoh.prisma`), lalu jalankan `npx prisma db push`.
3. Salin folder `app/` ke dalam root project Next.js kamu (timpa jika diminta).
4. Simpan gambar logo sekolah di `public/logo.png`.
5. Jalankan `npm run dev` dan akses:
   - Dashboard Admin: `http://localhost:3000/admin`
   - Data User: `http://localhost:3000/admin/users`
