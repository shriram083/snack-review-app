import { clearSessionCookie } from '../../../utils/auth';
export default function handler(req, res){
  clearSessionCookie(res);
  res.json({ ok: true });
}
