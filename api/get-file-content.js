// /api/files/content.js

export default async function handler(req, res) {
  // ✅ Hardcoded values for testing
  const accessToken = "ya29.a0AW4Xtxgn8VlqZ_JSfJ100twPWqyPNREwPSengDn8M7KgRbXQrHpbgALNFfLUPWT3LPXuqzCL0e6AUZsdE48Y2FWNSSVC2hNmEALTWfHbq4dQD5llTup4CHFBTTqeEk6gLK3OLPdeTKJtlNKY-rSZh3A9ZQjiInz7CmnLInbDaCgYKAYwSARYSFQHGX2MiG6oc543_HNlBYDr05__XYQ0175";
  const fileId = "1xwMgwhqw2lK7ifrCVveRVKFJ6muBUWccQ9ZaI93N2U0"; // ASOS_Annual_Report_2024 Google Doc

  try {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;

    const response = await fetch(exportUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(`Error fetching file content: ${errorText}`);
    }

    const text = await response.text();
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(text);

  } catch (error) {
    return res.status(500).send(`Internal server error: ${error.message}`);
  }
}
