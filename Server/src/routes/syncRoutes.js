const express = require("express");
const { writeToSheet, getExistingIdsFromSheet } = require("../services/googleSheetsService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "Nenhum dado fornecido para sincronização." });
    }

    const existingIds = await getExistingIdsFromSheet();

    const uniqueData = data.filter((item) => !existingIds.includes(item.id));

    if (uniqueData.length === 0) {
      return res.status(200).json({ message: "Nenhum dado novo para sincronizar." });
    }

    await writeToSheet(uniqueData);
    res.status(200).json({ message: "Sincronização concluída com sucesso!" });

  } catch (error) {
    console.error("Erro ao sincronizar com o Google Sheets:", error);
    res.status(500).json({ error: "Erro ao sincronizar com o Google Sheets." });
  }
});

module.exports = router;
