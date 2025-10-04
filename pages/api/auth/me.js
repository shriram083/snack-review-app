import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { verifyTokenFromReq } from '../../../utils/auth';

export default async function handler(req, res){
  const data = verifyTokenFromReq(req);
  if (!data) return res.status(401).json({ message: 'Not authenticated' });
  await dbConnect();
  const user = await User.findById(data.id).select('-password');
  if (!user) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ user });
}
