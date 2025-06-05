import { parse } from 'cookie';

export default async function handler(req, res) {
  const { fileId } = req.query;
  if (!fileId) return res.status(400).json({ error: 'Missing fileId' });

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const rawCookie = cookies['google_token'];
  if (!rawCookie) return res.status(401).json({ error: 'Missing token cookie' });

  let access_token;
  try {
    access_token = JSON.parse(rawCookie).access_token;
  } catch {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const text = await response.text();
    if (!response.ok) return res.status(response.status).json({ error: text });

    res.status(200).json({ content: text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch file content', details: err.message });
  }
}
