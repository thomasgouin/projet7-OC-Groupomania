
const { authJwt } = require("../middlewares");

module.exports = app => {
    const publications = require("../controllers/publication.controller");
    const multer = require('../middlewares/multer-config');
  
    var router = require("express").Router();
  
    // Route pour créer une nouvelle publication avec le middleware multer qui vient gérer les images et gifs
    router.post("/", multer, publications.create);
  
    // Route pour récupérer toutes les publications
    router.get("/", publications.findAll);
  
    // Route pour récupérer une publication par son identifiant
    router.get("/:id", publications.findOne);
  
    // Route pour supprimer une publication
    router.delete("/:id", [authJwt.verifyToken], publications.delete);
  
  
    app.use('/api/publications', router);
};