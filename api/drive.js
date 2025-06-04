// /api/drive.js
import { parse, serialize } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const tokenRaw = cookies.google_token;

  if (!tokenRaw) {
    return res.status(401).json({
      error: 'Not logged in. Please log in at /api/auth/login.'
    });
  }

  let tokenData;
  try {
    tokenData = JSON.parse(tokenRaw);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token in cookie.' });
  }

  async function fetchDriveData(accessToken) {
    const driveRes = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=10', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return driveRes.json();
  }

  let data = await fetchDriveData(tokenData.access_token);

  // 🔁 Token expired, try refresh
  if (data.error?.code === 401 && tokenData.refresh_token) {
    const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: tokenData.refresh_token,
        grant_type: 'refresh_token'
      }),
    });

    const newTokenData = await refreshRes.json();

    if (newTokenData.access_token) {
      // 🔄 Save new access token to cookie
      tokenData.access_token = newTokenData.access_token;

      res.setHeader('Set-Cookie', serialize('google_token', JSON.stringify(tokenData), {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax'
      }));

      // 🔁 Try fetching again with new token
      data = await fetchDriveData(newTokenData.access_token);
    } else {
      return res.status(401).json({ error: 'Failed to refresh token', details: newTokenData });
    }
  }

  if (data.error) {
    return res.status(400).json({ error: 'Google Drive API error', details: data });
  }

  res.status(200).json(data);
}

