const { authJwt } = require("../middlewares");

module.exports = app => {
    const commentaires = require("../controllers/comment.controller");
  
    var router = require("express").Router();
  
    // Route pour créer un nouveau commentaire
    router.post("/", commentaires.createComment);
  
    // Route pour supprimer un commentaire
    router.delete("/:id", [authJwt.verifyToken], commentaires.deleteComment);
  
  
    app.use('/api/commentaires', router);
};