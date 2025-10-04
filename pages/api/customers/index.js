import dbConnect from '../../../lib/dbConnect';
import Customer from '../../../models/Customer';
import { verifyTokenFromReq } from '../../../utils/auth';

export default async function handler(req, res){
  if (req.method === 'GET') {
    const auth = verifyTokenFromReq(req);
    if (!auth) return res.status(401).json({ message: 'Not authenticated' });
    await dbConnect();
    const customers = await Customer.find().sort({ createdAt: -1 }).limit(200);
    res.json(customers);
    return;
  }
  if (req.method === 'POST') {
    const auth = verifyTokenFromReq(req);
    if (!auth) return res.status(401).json({ message: 'Not authenticated' });
    await dbConnect();
    try {
      const data = req.body;
      const created = await Customer.create(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    return;
  }
  res.status(405).end();
}
