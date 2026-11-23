"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    fetch("/../api/users")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setTotalUser(result.data.length);
        }
      });
  }, []);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard Admin</h1>
      <p style={{ color: "#475569" }}>Selamat datang di Panel Admin UKK.</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            minWidth: "200px",
          }}
        >
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Total Data User</p>
          <h2 style={{ margin: "10px 0", fontSize: "32px", color: "#0f172a" }}>{totalUser}</h2>
          <Link href="/admin/users" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none" }}>
            Lihat Detail →
          </Link>
        </div>
      </div>
    </div>
  );
}
