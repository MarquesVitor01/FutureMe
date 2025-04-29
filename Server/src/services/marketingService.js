const firebaseAdmin = require("./firebaseService");

const fetchProjetoData = async () => {
  try {
    const ProjectRef = firebaseAdmin.firestore().collection("projetos");
    const snapshot = await ProjectRef.get();

    if (snapshot.empty) {
      console.log("Nenhum documento encontrado.");
      return [];
    }

    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Erro ao pegar dados do Firestore:", error);
    throw error;
  }
};


module.exports = { fetchProjetoData };
