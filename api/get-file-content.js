// /api/files/content.js

export default async function handler(req, res) {
  // ✅ Hardcoded values for testing
  const accessToken = "ya29.a0AW4XtxgAlZV4N1HYucsKNkXmqzi64GYmeapYHPv-Ilv1v5-Pcvgm24Jm0_VCB8Ih6jndZ0cXsU94dRoa4bRQHMQOg8MCNJRL_9ZWLlKTtbINorvvFjyI_7_pD7QHSj0HzUFTbH_bnBzlmV670Ew5iJbmllaQOK7z5_fLz8i8aCgYKAeYSARYSFQHGX2Mi15Z5ymxF8yXkrUwPv0WaDw0175";
  const fileId = "1kC7fkhY0aETchfNKXOEhr-9H7J4Rl9fHicna1yevOUY"; // Ferrari_NV_Annual_Report Google Doc

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
