// /api/get-file-content.js

import { parse } from 'cookie';

export default async function handler(req, res) {
  const { fileId } = req.query;

  // Step 1: Check if fileId is present
  if (!fileId) {
    return res.status(400).json({ error: 'Missing fileId query parameter' });
  }

  // Step 2: Get the access token from cookie
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies['access_token'];

  if (!token) {
    return res.status(401).json({ error: 'Missing access token' });
  }

  // Step 3: Fetch the file content from Google Drive
  try {
    const driveRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const content = await driveRes.text(); // or .arrayBuffer() for binary files
    res.status(200).send(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch file content', details: err.message });
  }
}
