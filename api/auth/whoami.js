import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const rawCookie = cookies['google_token'];
  if (!rawCookie) return res.status(401).json({ error: 'Missing google_token cookie' });

  let access_token;
  try {
    access_token = JSON.parse(rawCookie).access_token;
  } catch {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: user });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user info', details: err.message });
  }
}
