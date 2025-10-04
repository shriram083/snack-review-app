import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";

const fetcher = (url) => axios.get(url).then((r) => r.data);

export default function Dashboard() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const { data, error } = useSWR("/api/stats", fetcher);

  // Check if user is logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        await axios.get("/api/auth/me");
        setLoadingAuth(false);
      } catch (err) {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router]);

  if (loadingAuth || !data) return <div>Loading...</div>;

  const { total, avgRating, recent } = data;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Reviews</div>
          <div className="text-3xl font-bold">{total}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Avg Rating</div>
          <div className="text-3xl font-bold">
            {avgRating ? avgRating.toFixed(2) : "—"}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Recent Review</div>
          <div className="text-sm">
            {recent.length
              ? recent[0].name + " — " + recent[0].rating + "⭐"
              : "—"}
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-2">Recent Reviews</h3>
        <div className="space-y-3">
          {recent.map((r) => (
            <div key={r._id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <strong>{r.name}</strong> (
                  {new Date(r.purchaseDate).toLocaleDateString()})
                </div>
                <div>{r.rating} ⭐</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{r.comments}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
