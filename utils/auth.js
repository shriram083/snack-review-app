import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 8; // 8 hours

export function createSessionCookie(res, user) {
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: MAX_AGE });
  res.setHeader('Set-Cookie', cookie.serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
    sameSite: 'lax',
  }));
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', cookie.serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  }));
}

export function verifyTokenFromReq(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;
  const parsed = cookie.parse(cookies || '');
  const token = parsed[TOKEN_NAME];
  if (!token) return null;
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (err) {
    return null;
  }
}
