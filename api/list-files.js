// /api/list-files.js

import { parse } from 'cookie';

export default async function handler(req, res) {
  const { folderId } = req.query;

  if (!folderId) {
    return res.status(400).json({ error: 'Missing folderId query parameter' });
  }

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies['access_token'] || req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing access token' });
  }

  try {
    const query = encodeURIComponent(`'${folderId}' in parents`);
    const fields = encodeURIComponent('files(id,name,mimeType)');

    const driveRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await driveRes.json();

    if (!driveRes.ok) {
      return res.status(driveRes.status).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Google Drive', details: err.message });
  }
}
