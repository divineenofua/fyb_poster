'use client'
import { useEffect, useState } from "react";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
   const isLoggedIn = localStorage.getItem("LoggedIn") === 'true';
   if (isLoggedIn) onLogin();
  
   }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = "1212"; 
    if (password === adminPassword) {
      onLogin(); 
      localStorage.setItem('LoggedIn', 'true')
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000337] to-[#003366] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-[#000337] mb-6">
          Admin Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000337]"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-[#000337] text-white py-2 rounded hover:bg-[#002855] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
