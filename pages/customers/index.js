import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = url => axios.get(url).then(r => r.data);

export default function Customers(){
  const { data, error } = useSWR('/api/customers', fetcher);
  const router = useRouter();

  if (error && error.response && error.response.status === 401) {
    router.replace('/login');
    return null;
  }
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-3">
        {data.map(c => (
          <div key={c._id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between">
              <div><strong>{c.name}</strong> <span className="text-sm text-gray-500">({c.email || '—'})</span></div>
              <div>{c.rating} ⭐</div>
            </div>
            <div className="text-sm text-gray-600">{c.comments}</div>
            <div className="text-xs text-gray-400 mt-1">Bought on: {new Date(c.purchaseDate).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
