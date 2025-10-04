import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateCustomer(){
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    purchaseDate: '',
    rating: 5,
    favoriteFlavor: '',
    wouldRecommend: true,
    comments: ''
  });
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const router = useRouter();

  function handleChange(e){
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function submit(e){
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/customers', {
        ...form,
        age: form.age ? Number(form.age) : undefined
      });
      setOk(true);
      setForm({
        name: '',
        email: '',
        age: '',
        purchaseDate: '',
        rating: 5,
        favoriteFlavor: '',
        wouldRecommend: true,
        comments: ''
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        router.replace('/login');
        return;
      }
      setError(err.response?.data?.message || 'Failed to create');
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Customer Review</h2>
      {ok && <div className="bg-green-50 text-green-700 p-2 rounded mb-4">Saved successfully</div>}
      {error && <div className="bg-red-50 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-lg">
        <div className="grid grid-cols-1 gap-3">
          <label>Name <input name="name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" /></label>
          <label>Email <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" /></label>
          <label>Age <input name="age" value={form.age} onChange={handleChange} type="number" className="w-full border p-2 rounded" /></label>
          <label>Purchase Date <input name="purchaseDate" value={form.purchaseDate} onChange={handleChange} type="date" className="w-full border p-2 rounded" /></label>
          <label>Rating
            <select name="rating" value={form.rating} onChange={handleChange} className="w-full border p-2 rounded">
              <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option><option value={5}>5</option>
            </select>
          </label>
          <label>Favorite Flavor <input name="favoriteFlavor" value={form.favoriteFlavor} onChange={handleChange} className="w-full border p-2 rounded" /></label>
          <label className="flex items-center gap-2"><input name="wouldRecommend" checked={form.wouldRecommend} onChange={handleChange} type="checkbox" /> Would recommend</label>
          <label>Comments <textarea name="comments" value={form.comments} onChange={handleChange} className="w-full border p-2 rounded" /></label>
          <button className="bg-yellow-400 py-2 rounded font-semibold">Save Review</button>
        </div>
      </form>
    </div>
  );
}
