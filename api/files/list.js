import { parse } from 'cookie';

export default async function handler(req, res) {
  const { folderId } = req.query;

  if (!folderId) {
    return res.status(400).json({ error: 'Missing folderId query parameter' });
  }

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  let token;

  if (cookies.google_token) {
    const tokenData = JSON.parse(cookies.google_token);
    token = tokenData.access_token;
  } else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Missing access token or cookie' });
  }

  try {
    const query = encodeURIComponent(`'${folderId}' in parents`);
    const fields = encodeURIComponent('files(id,name,mimeType)');

    const driveRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await driveRes.json();

    if (!driveRes.ok) {
      return res.status(driveRes.status).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Google Drive', details: err.message });
  }
}
