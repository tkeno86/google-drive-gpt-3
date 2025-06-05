// /api/files/content.js

export default async function handler(req, res) {
  // ⚠️ Hardcoded token (for testing only — remove before production)
  const accessToken = "ya29.a0AW4XtxjhtcGzzHqElkyYFN3aG6vpZA5ApaKVZvg73qccGM-DdtOA6AG1czShC5i40ijqKorfRXVgEBK4vIV1ldUUXcNR4jbdr0vrTN8khUps7T7oIijwe1ebuUQXI_FW5Cjofz_2V9xPQC0N9sB8szH9PYp9sSBKpKKJU3-1aCgYKAS8SARYSFQHGX2Mi33dkqRTRjVIRIPqpxRsxSw0175";

  const fileId = "1xwMgwhqw2lK7ifrCVveRVKFJ6muBUWccQ9ZaI93N2U0";

  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(response.status).json({ error: "Failed to fetch file", details: errorData });
    }

    const content = await response.text();
    res.status(200).send(content);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}

