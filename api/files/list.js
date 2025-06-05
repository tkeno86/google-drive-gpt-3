// /api/files/list.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ Hardcoded access token (temporary for testing only)
  const accessToken = "ya29.a0AW4Xtxi7A84W8zo5C8hHKJJsP7UBcg2CJUSJVMppdxEx9onYeO4F7cijP3KKlmWcKxWQRpqh-xdW0Ek-YPrG7ZU62b8baY4ORkxg8e0xPlzt61JMBDXlGj4PA7swBfPyrhy1cixAKz1M9_e8izh6Riw7tiDNq7s1iW3jDBELaCgYKAV4SARYSFQHGX2Mi6J7VJHSMGW6uEtQYU7jRqQ0175";

  // ✅ Folder ID — 
  const folderId = "1kHwi2Pd-9LDuV4OOY-9yw_v4jSbCZHhZ";

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)`;

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

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    console.error("Function crash:", err);
    res.status(500).send(`Internal error: ${err.message}`);
  }
}
