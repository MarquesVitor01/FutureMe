const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.TYPE_2,
    project_id: process.env.PROJECT_ID_2,
    private_key_id: process.env.PRIVATE_KEY_ID_2,
    private_key: process.env.PRIVATE_KEY_2,
    client_email: process.env.CLIENT_EMAIL_2,
    client_id: process.env.CLIENT_ID_2,
    auth_uri: process.env.AUTH_URI_2,
    token_uri: process.env.SERVICE_TOKEN_URI_2,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL_2,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL_2,
    universe_domain: process.env.UNIVERSE_DOMAIN_2,
  },
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = "1eNtfLLqweCQJNV6-E3JspPCgRn1HIV1YZVWIhItBxTc";

const getExistingIdsFromSheet = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Projetos!A2:A",
    });

    return response.data.values?.map((row) => row[0]) || [];
  } catch (error) {
    console.error("Erro ao buscar IDs existentes:", error);
    return [];
  }
};

const writeToSheet = async (data) => {
  if (!data || data.length === 0) return;

  try {
    const range = "Projetos!A2";
    const valueInputOption = "RAW";

    const batchedData = data.map((row) => [
      row.id || "",
      row.name || "",
      row.description || "",
      row.textColor || "",
    ]);

    const resource = { values: batchedData };

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });

    console.log("Planilha atualizada:", result.data);
  } catch (error) {
    console.error("Erro ao atualizar a planilha:", error);
    throw error;
  }
};

module.exports = {
  writeToSheet,
  getExistingIdsFromSheet,
};
