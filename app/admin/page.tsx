"use client";

import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/verify");
      const data = await res.json();
      setLogged(data.logged);
    } catch {
      setLogged(false);
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Password non corretta");
        return;
      }

      setLogged(true);
    } catch {
      alert("Errore durante il login.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    setLogged(false);
    setPassword("");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Caricamento...
      </main>
    );
  }

  if (!logged) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
            Area Admin
          </h1>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-white"
          />

          <button
            onClick={login}
            className="w-full mt-5 bg-yellow-500 text-black py-3 rounded-lg font-bold"
          >
            ACCEDI
          </button>

        </div>
      </main>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          Logout
        </button>
      </div>

      <Dashboard />
    </>
  );
}