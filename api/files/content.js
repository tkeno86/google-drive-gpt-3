// /api/files/content.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ Hardcoded token — FOR TESTING ONLY
  const accessToken = "ya29.a0AW4XtxjhtcGzzHqElkyYFN3aG6vpZA5ApaKVZvg73qccGM-DdtOA6AG1czShC5i40ijqKorfRXVgEBK4vIV1ldUUXcNR4jbdr0vrTN8khUps7T7oIijwe1ebuUQXI_FW5Cjofz_2V9xPQC0N9sB8szH9PYp9sSBKpKKJU3-1aCgYKAS8SARYSFQHGX2Mi33dkqRTRjVIRIPqpxRsxSw0175";

  // ✅ Hardcoded Google Drive file ID (ASOS Annual Report 2024)
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
