const { fetchProjetoData } = require("./marketingService");
const { writeToSheet, getExistingIdsFromSheet } = require("./googleSheetsService");

const checkForChanges = async () => {
  try {
    const projetosData = await fetchProjetoData();
    const existingIds = await getExistingIdsFromSheet();

    const newData = projetosData.filter((item) => {
      const isNotDuplicate = !existingIds.includes(item.id);
      const isRecentlyModified =
        !item.dataAlteracao || new Date(item.dataAlteracao).getTime() > Date.now() - 60 * 60 * 1000;

      return isNotDuplicate && isRecentlyModified;
    });

    if (newData.length > 0) {
      await writeToSheet(newData);
      console.log("Planilha atualizada com novos dados!");
    } else {
      console.log("Nenhuma alteração ou dado novo detectado.");
    }
  } catch (error) {
    console.error("Erro ao verificar alterações no marketing:", error);
  }
};
