import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ Use fileId from query param or default to ASOS report
  const fileId = req.query.fileId || '1xwMgwhqw2lK7ifrCVveRVKFJ6muBUWccQ9ZaI93N2U0';

  // ✅ Hardcoded latest access token for testing
  const accessToken = 'ya29.a0AW4XtxjhtcGzzHqElkyYFN3aG6vpZA5ApaKVZvg73qccGM-DdtOA6AG1czShC5i40ijqKorfRXVgEBK4vIV1ldUUXcNR4jbdr0vrTN8khUps7T7oIijwe1ebuUQXI_FW5Cjofz_2V9xPQC0N9sB8szH9PYp9sSBKpKKJU3-1aCgYKAS8SARYSFQHGX2Mi33dkqRTRjVIRIPqpxRsxSw0175';

  const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;

  try {
    const response = await fetch(driveUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: 'Failed to fetch file',
        detail: errorText,
      });
    }

    const text = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({
      error: 'Unexpected server error',
      message: err.message,
    });
  }
}
