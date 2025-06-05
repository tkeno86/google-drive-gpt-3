// /api/files/content.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ✅ New hardcoded access token — for testing only
  const accessToken = "ya29.a0AW4XtxiSrP8D0yOK66pn1-VQ2ZswDXXJ3PEkWl7LYD85uwSpFs_bf73jXAp44PIz4Q46Vj9Z0Pa5Vf8b3MU8lXPDTezGmQjNNHrznhfhkX8THCYPwpaoORTX1uaO1h3JwlUz6MFboX2ohEi7H0pJTbA52h4pFv5bf_MvsNRKaCgYKAcASARYSFQHGX2MiO8JhZCgPmreK2xfTB2fcJA0175","expires_in":3599,"refresh_token":"1//05WSn96Ev15tuCgYIARAAGAUSNwF-L9IrrS3MSb6eyU4zuxbOwuBooedAkD6QjSFcg6wXUconYTKtAxpREvd_Dun6rTZjb6jg85g","scope":"https://www.googleapis.com/auth/drive.readonly openid https://www.googleapis.com/auth/userinfo.email","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJiNDM0Njk1OTQ0NTE4MjAxNDhiMzM5YzU4OGFlZGUzMDUxMDM5MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1Mzc2NTExNjY1MTYtYXYxdmkwYmpmZHAwMmpsOTdyNzQ0MTE1djFhc2VqY28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1Mzc2NTExNjY1MTYtYXYxdmkwYmpmZHAwMmpsOTdyNzQ0MTE1djFhc2VqY28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1NzE0OTE4NzYyNjcyMzk4MzciLCJlbWFpbCI6InRob21hcy5rZW5uZWR5OTg2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibTNCVGlUd2szV3Z4LWZtdlBYY0VoQSIsImlhdCI6MTc0OTEzMDE1NywiZXhwIjoxNzQ5MTMzNzU3fQ.e7iliWN94T44S7iMRC-mlY5OqYKDH_60PA2_pC7tJUafhM148uET_wodmr5-thUXN2QGXi3Bm8iE1-WOUFWUrtUz6IRZ830h_0ENDB-7l87luTA5CIJQ_7hnhKGQ7SRBawlOlSOm4ey2CC3wV-3IpG3HuXD5MXnJ4BJ4R65E8zjSJpiuO2igfx5Qw1tmfJ18mH9ufRB48Kt2VfqRs_PDdTPQB6cgkhGaqblOpHaC8vdMR7vOQlaS6MvUC_rhkGjY1WMfp_llfB3bK0CraXyEsizUOi63UveyVR2I1ksQ-6nZd3bcxDOYovJo9XTUg2CDr3YF7OLUFiFOHapwByONeA";

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
