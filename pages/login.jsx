import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", { email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="center-container w-full max-w-md bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome back</h2>
        {error && (
          <div className="bg-red-50 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              type="email"
            />
          </div>

          {/* Password with show/hide */}
          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C5 3 1.73 7.11 1.07 10c.66 2.89 3.93 7 8.93 7 5 0 8.27-4.11 8.93-7-.66-2.89-3.93-7-8.93-7zM10 15a5 5 0 100-10 5 5 0 000 10z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.94 2.94a.75.75 0 011.06 0l13 13a.75.75 0 11-1.06 1.06l-1.07-1.07A8.963 8.963 0 0110 17c-5 0-8.27-4.11-8.93-7a8.963 8.963 0 012.94-4.99L2.94 2.94zM10 5c1.9 0 3.5 1.28 4.06 3a4.992 4.992 0 00-6.12 6.12A4.992 4.992 0 0010 5z" />
                </svg>
              )}
            </button>
          </div>

          <button className="w-full bg-yellow-400 py-2 rounded font-semibold">
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Use seeded admin: <strong>admin@example.com</strong> /{" "}
          <strong>Admin123!</strong>
        </p>
      </div>
    </div>
  );
}

Login.noLayout = true;
