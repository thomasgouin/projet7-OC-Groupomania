//On importe le middleware qui met de vérifier le token d'utilisation
//et le rôle (utilisateur ou admin)
const { authJwt } = require("../middlewares");

//On importe le controller qui va donner accès ou non aux ressources en fonction du rôle 
// rappel : 3 cas de figure : all, user, admin
const controller = require("../controllers/user.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //route qui donne l'accès à tout le monde
    app.get("/api/test/all", controller.allAccess);

    //route qui donne l'accès aux utilisateurs
    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    //route qui donne l'accès aux administrateurs
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
     );
};
