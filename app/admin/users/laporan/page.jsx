"use client";

import { useEffect, useState } from "react";

export default function LaporanUserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.data);
      });
  }, []);

  return (
    <div style={{ padding: "30px", background: "#fff", color: "#000", fontFamily: "Arial, sans-serif" }}>
      {/* KOP SURAT + LOGO */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", borderBottom: "3px double #000", paddingBottom: "15px", marginBottom: "30px" }}>
        <img src="../logo.png" alt="Logo Sekolah" style={{ width: "80px", height: "80px", objectFit: "contain" }} />
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: "18px" }}>PEMERINTAH PROVINSI JAWA BARAT</h2>
          <h1 style={{ margin: "4px 0", fontSize: "22px" }}>DINAS PENDIDIKAN - SEKOLAH MENENGAH KEJURUAN (SMK)</h1>
          <p style={{ margin: 0, fontSize: "13px" }}>Jl. Pendidikan No. 123 Telp. (022) 5551234 Email: info@smk.sch.id</p>
        </div>
      </div>

      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>LAPORAN DATA USER PENGGUNA SISTEM</h3>

      {/* TABEL LAPORAN */}
      <table border="1" cellSpacing="0" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>No</th>
            <th>Kode User</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Alamat</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{user.kodeUser || "-"}</td>
                <td>{user.nama}</td>
                <td>{user.email}</td>
                <td>{user.alamat || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* TANDA TANGAN */}
      <div style={{ marginTop: "50px", float: "right", textAlign: "center" }}>
        <p>Bandung, {new Date().toLocaleDateString("id-ID")}</p>
        <p>Mengetahui,</p>
        <br /><br /><br />
        <p><b>Kepala Lab / Penguji UKK</b></p>
      </div>

      {/* TOMBOL CETAK */}
      <div className="no-print" style={{ clear: "both", marginTop: "100px", textAlign: "center" }}>
        <button
          onClick={() => window.print()}
          style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Cetak / Download PDF Laporan
        </button>
      </div>
    </div>
  );
}
