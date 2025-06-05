// /api/files/list.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ Hardcoded access token (temporary for testing only)
  const accessToken = "ya29.a0AW4XtxgAlZV4N1HYucsKNkXmqzi64GYmeapYHPv-Ilv1v5-Pcvgm24Jm0_VCB8Ih6jndZ0cXsU94dRoa4bRQHMQOg8MCNJRL_9ZWLlKTtbINorvvFjyI_7_pD7QHSj0HzUFTbH_bnBzlmV670Ew5iJbmllaQOK7z5_fLz8i8aCgYKAeYSARYSFQHGX2Mi15Z5ymxF8yXkrUwPv0WaDw0175";

  // ✅ Folder ID — replace this with the one you want to list
  const folderId = "1kC7fkhY0aETchfNKXOEhr-9H7J4Rl9fHicna1yevOUY";

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
