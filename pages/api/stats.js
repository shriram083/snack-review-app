import dbConnect from '../../lib/dbConnect';
import Customer from '../../models/Customer';
import { verifyTokenFromReq } from '../../utils/auth';

export default async function handler(req, res){
  const auth = verifyTokenFromReq(req);
  if (!auth) return res.status(401).json({ message: 'Not authenticated' });
  await dbConnect();
  const total = await Customer.countDocuments();
  const agg = await Customer.aggregate([
    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
  ]);
  const avgRating = agg[0] ? agg[0].avgRating : 0;
  const recent = await Customer.find().sort({ createdAt: -1 }).limit(5).lean();
  res.json({ total, avgRating, recent });
}
