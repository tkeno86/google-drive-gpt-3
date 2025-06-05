// /api/files/content.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ New hardcoded access token — for testing only
  const accessToken = "ya29.a0AW4XtxgFC5b_ybEhSaVZKprv3xdk6WrnYf8D6VDmG46BI9oGUg3f1WwbAALTVoceZ8hovj35zdF2sZCGcklURLojkOsg4LcJU5du0R5Zuz_qEnD0vH7ZWi2cAJSVTmMFeWgdhTaAe8opWtA5V3iQb12mpNaauVcy3q9vVP76aCgYKATYSARYSFQHGX2MiR8HwTe7Vhvd2hnOYBHNzFA0175";

  // ✅ Known good Google Drive file ID (ASOS Annual Report 2024)
  const fileId = "1xwMgwhqw2lK7ifrCVveRVKFJ6muBUWccQ9ZaI93N2U0";

  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API Error:", errorText);
      return res.status(response.status).send(`Google API Error: ${errorText}`);
    }

    const content = await response.text();
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(content);

  } catch (err) {
    console.error("Function crash:", err);
    res.status(500).send(`Internal error: ${err.message}`);
  }
}
