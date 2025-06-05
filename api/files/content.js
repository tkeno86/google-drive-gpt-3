// /api/files/content.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ New hardcoded access token — for testing only
  const accessToken = "ya29.a0AW4XtxiSrP8D0yOK66pn1-VQ2ZswDXXJ3PEkWl7LYD85uwSpFs_bf73jXAp44PIz4Q46Vj9Z0Pa5Vf8b3MU8lXPDTezGmQjNNHrznhfhkX8THCYPwpaoORTX1uaO1h3JwlUz6MFboX2ohEi7H0pJTbA52h4pFv5bf_MvsNRKaCgYKAcASARYSFQHGX2MiO8JhZCgPmreK2xfTB2fcJA0175";

  // ✅ Known good Google Drive file ID (ASOS Annual Report 2024)
  const fileId = "1GuRvtLFfA1fSeKjGVZY5SfEyPtpBZoCOa8Jkt5-vXaU";

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
