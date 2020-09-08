//Modèle utilisateur défini à travers Sequelize. 
//A noter que les colonnes id, createdAt et modifiedAt seront créées automatiquement

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };