
const { authJwt } = require("../middlewares");

module.exports = app => {
    const publications = require("../controllers/publication.controller");
    const multer = require('../middlewares/multer-config');
  
    var router = require("express").Router();
  
    // Route pour créer une nouvelle publication
    router.post("/", multer, publications.create);
  
    // Route pour récupérer toutes les publications
    router.get("/", publications.findAll);
  
    // Route pour récupérer une publication par son identifiant
    router.get("/:id", publications.findOne);
  
    // Route pour mettre à jour une publication
    router.put("/:id",multer, publications.update);
  
    // Route pour supprimer une publication
    router.delete("/:id", publications.delete);
  
  
    app.use('/api/publications', router);
};