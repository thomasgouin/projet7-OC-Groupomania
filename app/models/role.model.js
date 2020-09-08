//Modèle roles défini à travers Sequelize. 
//A noter que les colonnes id, createdAt et modifiedAt seront créées automatiquement

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
  
    return Role;
};