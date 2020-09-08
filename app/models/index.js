//Fichier principal pour Sequlize Nous y intégrons les différents 
//modèles et définissons les liens entre eux. 

const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.publication = require("../models/publication.model.js")(sequelize, Sequelize);
db.comments = require("../models/comments.model.js")(sequelize, Sequelize);

/*La relation role / utilisateur est ici de plusieurs à plusieurs : 
  - un utilisateur peut avoir plusieurs rôles,
  - un rôle peut être détenu par plusieurs utilisateurs. 
*/
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

/* La relation des publications avec l'utilisateur et les commentaires
 - les utilisateurs peuvent faire plusieurs publications,
 - une publication n'appartient qu'à un utilisateur, 
 - une publication peut avoir plusieurs commentaires
 - un commentaire n'appartient qu'à une seule publication
*/
db.user.hasMany(db.publication, {
  foreignKey: 'userId',
  
});
db.publication.belongsTo(db.user)

db.publication.hasMany(db.comments)

db.comments.belongsTo(db.publication, {
  foreignKey: "publicationId", 
  as: "publication",
})

/* relation des commentaires avec les utilisateurs 
  - Un utilisateur peut faire plusieurs commentaires,
  - Un commentaire n'appartient qu'à un seul utilisateur
*/
db.user.hasMany(db.comments, {
  foreignKey: 'userId'
  
});
db.comments.belongsTo(db.user)




db.ROLES = ["user", "admin"];

module.exports = db;
