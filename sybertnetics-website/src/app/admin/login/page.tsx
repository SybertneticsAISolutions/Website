"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/.netlify/functions/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      // TODO: Store JWT in httpOnly cookie via API route (cannot set httpOnly from client)
      // For now, store in localStorage (not secure, replace in production)
      localStorage.setItem("admin_jwt", data.token);
      router.push("/admin");
    } else {
      setError(data.error || "Login failed");
    }
  }

  return (
    <main className="admin-login">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      {/* TODO: Harden security, use httpOnly cookies via API route */}
    </main>
  );
} 