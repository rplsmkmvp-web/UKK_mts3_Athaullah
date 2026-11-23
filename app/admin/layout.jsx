"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", href: "/admin" },
    { name: "Data User", href: "/admin/users" },
    { name: "Tambah User", href: "/admin/users/tambah" },
    { name: "Cetak Laporan", href: "/admin/users/laporan" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* SIDEBAR */}
      <aside
        className="no-print"
        style={{
          width: "240px",
          background: "#1e293b",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ borderBottom: "1px solid #334155", paddingBottom: "15px", marginBottom: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>ADMIN UKK</h2>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Sistem Informasi User</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {menus.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: isActive ? "#fff" : "#cbd5e1",
                  background: isActive ? "#2563eb" : "transparent",
                  textDecoration: "none",
                  padding: "10px 14px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* KONTEN UTAMA */}
      <main style={{ flex: 1, background: "#f8fafc", padding: "30px" }}>
        {children}
      </main>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            background: #fff !important;
          }
        }
      `}</style>
    </div>
  );
}
