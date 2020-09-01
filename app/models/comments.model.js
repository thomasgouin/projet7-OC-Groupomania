module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("comments", {
      text: {
        type: Sequelize.STRING
      }
    });
  
    return Commentaire;
  };