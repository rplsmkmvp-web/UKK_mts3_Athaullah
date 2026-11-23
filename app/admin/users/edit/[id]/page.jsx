"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function EditUser({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [form, setForm] = useState({
    kodeUser: "",
    nama: "",
    email: "",
    alamat: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setForm({
            kodeUser: result.data.kodeUser || "",
            nama: result.data.nama || "",
            email: result.data.email || "",
            alamat: result.data.alamat || "",
          });
        }
      });
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("User berhasil diperbarui!");
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#fff", padding: "25px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", maxWidth: "500px" }}>
      <h1 style={{ marginTop: 0 }}>Edit User</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Kode User</label>
          <input
            type="text"
            value={form.kodeUser}
            readOnly
            style={{ width: "100%", padding: "8px", backgroundColor: "#e2e8f0", fontWeight: "bold", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={loading} style={{ padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            {loading ? "Menyimpan..." : "Update"}
          </button>

          <button type="button" onClick={() => router.back()} style={{ padding: "8px 16px", background: "#64748b", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
