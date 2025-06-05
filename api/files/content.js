// /api/files/content.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const fileId = '1xwMgwhqw2lK7ifrCVveRVKFJ6muBUWccQ9ZaI93N2U0'; // ASOS_Annual_Report_2024
  const accessToken = 'ya29.a0AW4XtxjhtcGzzHqElkyYFN3aG6vpZA5ApaKVZvg73qccGM-DdtOA6AG1czShC5i40ijqKorfRXVgEBK4vIV1ldUUXcNR4jbdr0vrTN8khUps7T7oIijwe1ebuUQXI_FW5Cjofz_2V9xPQC0N9sB8szH9PYp9sSBKpKKJU3-1aCgYKAS8SARYSFQHGX2Mi33dkqRTRjVIRIPqpxRsxSw0175","expires_in":3599,"refresh_token":"1//05v4AVy_HwDETCgYIARAAGAUSNwF-L9IryQiPKJuew76Rzx0vXCpKG2v2bInuIEzJDpGwvxU8n2n8nncNRp7vJmsIs2WtKSRFFBo","scope":"https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/drive.readonly","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJiNDM0Njk1OTQ0NTE4MjAxNDhiMzM5YzU4OGFlZGUzMDUxMDM5MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1Mzc2NTExNjY1MTYtYXYxdmkwYmpmZHAwMmpsOTdyNzQ0MTE1djFhc2VqY28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1Mzc2NTExNjY1MTYtYXYxdmkwYmpmZHAwMmpsOTdyNzQ0MTE1djFhc2VqY28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1NzE0OTE4NzYyNjcyMzk4MzciLCJlbWFpbCI6InRob21hcy5rZW5uZWR5OTg2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVGY5VTZ2ckU4SDBsTVZiQ1JreG1pQSIsImlhdCI6MTc0OTEyMTE3OCwiZXhwIjoxNzQ5MTI0Nzc4fQ.LEcjaEcXT_VpEnseI7GdqWLFpcdQPvm2zyipo9w8PYuDKocvLDTm2XyDw9kdozMkDXfkXKDt4gDn11UNzbb_XEUtU4z0auVYHClWRV10unIZpAUDjgNyEYC0LeD9lviyTlZi2SK8ajPedgjfmnLVxVKm845wWQZbE95XLfJObrmngkg9Ta4fdVFeUtB165Ct4dvHREaTSwaDvrvx-sukGOqYTl78vH0UQBMJnTZ4XGJviGcRugJEM-kVtjFNbLqCn4Fyi7Z1cCF9kdKnX2PghnwumcQmsD5_ArfrNU5SJs8fXcQVmt_kNlCt5ZPSIGDz15Xx9NqRwAEScvX7PtP7VQ","refresh_token_expires_in":604799}'
  const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;

  const response = await fetch(driveUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(response.status).json({ error: 'Failed to fetch file', detail: errorText });
  }

  const text = await response.text();
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(text);
}