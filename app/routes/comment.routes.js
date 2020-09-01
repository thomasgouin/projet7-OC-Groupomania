const { authJwt } = require("../middlewares");

module.exports = app => {
    const commentaires = require("../controllers/comment.controller");
  
    var router = require("express").Router();
  
    // Route pour créer une nouvelle publication
    router.post("/", commentaires.createComment);
  
    // Route pour supprimer une publication
    //router.delete("/:id", commentaires.delete);
  
  
    app.use('/api/commentaires', router);
};