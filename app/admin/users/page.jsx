"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function getUsers() {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        alert("Data berhasil dihapus!");
        getUsers();
      } else {
        alert(result.message || "Gagal menghapus data");
      }
    } catch (error) {
      alert("Terjadi kesalahan pada server.");
    }
  }

  // Filter data berdasarkan pencarian
  const filteredUsers = users.filter((user) => {
    const keyword = searchTerm.toLowerCase();
    return (
      (user.nama && user.nama.toLowerCase().includes(keyword)) ||
      (user.email && user.email.toLowerCase().includes(keyword)) ||
      (user.kodeUser && user.kodeUser.toLowerCase().includes(keyword))
    );
  });

  // Helper untuk mengambil inisial nama
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: "#ffffff",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        border: "1px solid #f1f5f9",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* CSS Internal untuk Hover & Animasi */}
      <style>{`
        .btn-primary:hover { background-color: #1d4ed8 !important; transform: translateY(-1px); }
        .btn-success:hover { background-color: #15803d !important; transform: translateY(-1px); }
        .btn-edit:hover { background-color: #dbeafe !important; }
        .btn-delete:hover { background-color: #fee2e2 !important; }
        .table-row:hover { background-color: #f8fafc; }
        .search-input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "700", color: "#0f172a" }}>
            Manajemen Data User
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
            Kelola informasi pengguna, hak akses, dan cetak laporan sistem.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/admin/users/laporan"
            className="btn-success"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              background: "#16a34a",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)",
            }}
          >
            <span>🖨️</span> Cetak Laporan
          </Link>

          <Link
            href="/admin/users/tambah"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
            }}
          >
            <span>+</span> Tambah User
          </Link>
        </div>
      </div>

      {/* Filter & Info Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama, email, atau kode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
          Menampilkan <strong style={{ color: "#0f172a" }}>{filteredUsers.length}</strong> dari{" "}
          <strong style={{ color: "#0f172a" }}>{users.length}</strong> user
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #2563eb",
              borderRadius: "50%",
              margin: "0 auto 14px auto",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ margin: 0, fontSize: "15px", fontWeight: "500" }}>Sedang memuat data user...</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "14px 16px", fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase", textAlign: "center", width: "50px" }}>
                  No
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase" }}>
                  Kode User
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase" }}>
                  Nama Pengguna
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase" }}>
                  Email
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase" }}>
                  Alamat
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase", textAlign: "center" }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="table-row"
                    style={{ borderBottom: "1px solid #f1f5f9", transition: "background-color 0.15s ease" }}
                  >
                    <td style={{ padding: "14px 16px", textAlign: "center", fontSize: "14px", color: "#64748b" }}>
                      {index + 1}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {user.kodeUser || "-"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: "#e0e7ff",
                            color: "#3730a3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(user.nama)}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
                          {user.nama}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#475569" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#475569", maxWidth: "250px" }}>
                      {user.alamat || <span style={{ color: "#94a3b8", fontStyle: "italic" }}>Belum diisi</span>}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <Link
                          href={`/admin/users/edit/${user.id}`}
                          className="btn-edit"
                          style={{
                            padding: "6px 12px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            transition: "background 0.2s",
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn-delete"
                          style={{
                            padding: "6px 12px",
                            background: "#fef2f2",
                            color: "#dc2626",
                            cursor: "pointer",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            transition: "background 0.2s",
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>📭</div>
                    <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                      {searchTerm ? "User tidak ditemukan" : "Belum ada data user"}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px" }}>
                      {searchTerm
                        ? `Tidak ada hasil yang cocok dengan pencarian "${searchTerm}".`
                        : "Silakan klik tombol '+ Tambah User' untuk menambahkan data baru."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}