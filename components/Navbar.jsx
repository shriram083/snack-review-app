import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Navbar({ onOpenSidebar }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    axios
      .get("/api/auth/me")
      .then((res) => mounted && setUser(res.data.user))
      .catch(() => mounted && setUser(null));
    return () => (mounted = false);
  }, []);

  async function handleLogout() {
    try {
      await axios.post("/api/auth/logout");
    } catch (err) {
      // ignore
    }
    router.replace("/login");
  }

  return (
    <header className="bg-white border-b p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* hamburger - visible on mobile */}
        <button
          onClick={onOpenSidebar}
          className="p-2 md:hidden mr-2 rounded hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-6" />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 p-1 rounded hover:bg-gray-50"
          aria-label="Profile"
        >
          <img
            src="/profile.png"
            alt="avatar"
            className="w-9 h-9 rounded-full bg-gray-200"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
            <div className="p-3 border-b">
              <div className="text-sm font-semibold">
                {user ? user.name : "Guest"}
              </div>
              <div className="text-xs text-gray-500">
                {user ? user.email : ""}
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
