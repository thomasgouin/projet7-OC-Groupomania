const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

//fonction qui vérifie le token

verifyToken = (req, res, next) => {
    //nous isolons le Token envoyé dans les headers
    let token = req.headers["x-access-token"];
    //Si il n'y a pas de token nous envoyons un message d'erreur avec le code 403
    if (!token) {
        return res.status(403).send({
            message: "Aucun token n'est renseigné"
        });
    }
    //Si le token existe on utilise la clé pour le décoder 
    jwt.verify(token, config.secret, (err, decoded) => {
        //si le token est faux, on envoie une erreur
        if (err) {
            return res.status(401).send({
                message: "Vous n'êtes pas authorisé à effectuer cette action"
            });
        }
        //si le token est valable alors on reseigne la valeur de l'identifiant de l'utilisateur dans le champ req.userId
        req.userId = decoded.id;
        //On passe au controller avec next
        next();
    });
};
//Pour définir si un utilisateur est admin
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                return;
                }
            }
            res.status(403).send({
                message: "Vous ne pouvez pas faire cette action, elle requiert un rôle administrateur"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
module.exports = authJwt;
  
