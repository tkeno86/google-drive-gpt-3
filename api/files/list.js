// /api/files/list.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ Hardcoded access token (temporary for testing only)
  const accessToken = "ya29.a0AW4XtxiSrP8D0yOK66pn1-VQ2ZswDXXJ3PEkWl7LYD85uwSpFs_bf73jXAp44PIz4Q46Vj9Z0Pa5Vf8b3MU8lXPDTezGmQjNNHrznhfhkX8THCYPwpaoORTX1uaO1h3JwlUz6MFboX2ohEi7H0pJTbA52h4pFv5bf_MvsNRKaCgYKAcASARYSFQHGX2MiO8JhZCgPmreK2xfTB2fcJA0175";

  // ✅ Folder ID — replace this with the one you want to list
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
