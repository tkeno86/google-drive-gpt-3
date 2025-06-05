import { parse } from 'cookie';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { fileId } = req.query;
  if (!fileId) return res.status(400).json({ error: 'Missing fileId' });

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
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/html`;
    const response = await fetch(exportUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const html = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to export file (likely not a Google Doc)',
        details: html,
      });
    }

    // ✅ Clean the HTML into plain text using jsdom
    const dom = new JSDOM(html);
    const textContent = dom.window.document.body.textContent;

    res.status(200).json({ content: textContent.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to export and clean file', details: err.message });
  }
}


