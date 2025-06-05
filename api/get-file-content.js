// /api/files/content.js

export default async function handler(req, res) {
  // ✅ Hardcoded values for testing
  const accessToken = "ya29.a0AW4Xtxi7A84W8zo5C8hHKJJsP7UBcg2CJUSJVMppdxEx9onYeO4F7cijP3KKlmWcKxWQRpqh-xdW0Ek-YPrG7ZU62b8baY4ORkxg8e0xPlzt61JMBDXlGj4PA7swBfPyrhy1cixAKz1M9_e8izh6Riw7tiDNq7s1iW3jDBELaCgYKAV4SARYSFQHGX2Mi6J7VJHSMGW6uEtQYU7jRqQ0175";
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
