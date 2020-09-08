//Ici hormis l'id et les dates de création et modification et le user Id généré par les relations, 
//le seul champs à paramétrer est le commentaire. 

module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("comments", {
      text: {
        type: Sequelize.STRING
      }
    });
  
    return Commentaire;
  };