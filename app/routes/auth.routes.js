//Routes pour l'authentification = signup et signin

//On importe nos middlware permettant de vérifier si le mail n'est pas déjà utilisé
// et si le rôle existe bien
const { verifySignUp } = require("../middlewares");

//On importe notre controller qui gère le signup et signin
const controller = require("../controllers/auth.controller");

//ON permet l'accès aux headers pour y enregistrer les tokens et y avoir accès
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //On défini la route signup avec les middlewares importés ci dessus
    app.post(
        "/api/auth/signup", //la route
        [
            verifySignUp.checkDuplicateEmail, //1er middleware
            verifySignUp.checkRolesExisted //2nd middleware
        ],
        controller.signup //fonction qui permet à l'utilisateur de s'enregistrer
    );
    //On défini la route pour s'authentifier 
    //puis on appelle la fonction qui va vérifier l'utilisateur, son mot de passe, et enregistrer les données dans un JSON.
    app.post("/api/auth/signin", controller.signin);

    app.delete("/api/auth/:id", controller.delete)
};
