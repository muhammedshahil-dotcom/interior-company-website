import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">Register</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">Join Elora Interiors</h1>
        <p className="mt-1 text-sm text-gray-600">Create an account to submit real reviews.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Full name
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Password
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

