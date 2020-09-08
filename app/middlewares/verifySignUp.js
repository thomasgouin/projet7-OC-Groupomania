const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  
    // On cherche l'eamil dans la base de données
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        //Si on trouve déjà un mail, on renvoie une erreur
        if (user) {
            res.status(400).send({
                message: "Erreur, ce mail est déjà utilisé, merci d'en choisir un autre"
            });
            return;
        }
        //Sinon on passe à la suite
        next();
    });
};
//Pour vérifier si les roles existent 
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                message: "Erreur, ce rôle n'existe pas = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
};
  
module.exports = verifySignUp;