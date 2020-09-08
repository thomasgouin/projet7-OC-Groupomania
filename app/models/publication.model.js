//Modèle utilisateur défini à travers Sequelize. 
//A noter que les colonnes id, createdAt et modifiedAt seront créées automatiquement
//Pour l'image nous n'enregistrons ici que le chemin absolu sous forme de string (voir middleware multer)

//NB : nous développons ici le module partage d'images et commentaires. 
//Nous souhaitons des interractions courtes d'ou le choix du type string (Varchar (255))


module.exports = (sequelize, Sequelize) => {
  const Publication = sequelize.define("publications", {
    title: {
      type: Sequelize.STRING
    },
    attachment: {
      type: Sequelize.STRING
    }
  });

  return Publication;
};