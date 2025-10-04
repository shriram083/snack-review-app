import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function Sidebar({ open, onClose }) {
  const router = useRouter();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post("/api/auth/logout");
    } catch (err) {
      // ignore
    }
    onClose && onClose();
    router.push("/login");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold">SnackReview</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block p-2 rounded hover:bg-gray-50"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/customers/create"
                className="block p-2 rounded hover:bg-gray-50"
              >
                Create Customer
              </Link>
            </li>
            <li>
              <Link
                href="/customers"
                className="block p-2 rounded hover:bg-gray-50"
              >
                View Customers
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block p-2 rounded hover:bg-gray-50 text-left w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile slide-over + overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={open ? "false" : "true"}
      >
        {/* overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={onClose}
        />

        {/* sidebar panel */}
        <aside
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white shadow transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-6 flex items-center justify-between border-b">
            <h1 className="text-xl font-bold">SnackReview</h1>
            {/* small close icon (keeps logout in menu) */}
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="block p-2 rounded hover:bg-gray-50"
                  onClick={onClose}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/customers/create"
                  className="block p-2 rounded hover:bg-gray-50"
                  onClick={onClose}
                >
                  Create Customer
                </Link>
              </li>
              <li>
                <Link
                  href="/customers"
                  className="block p-2 rounded hover:bg-gray-50"
                  onClick={onClose}
                >
                  View Customers
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block p-2 rounded hover:bg-gray-50 text-left w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
