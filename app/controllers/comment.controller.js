const db = require('../models');
const { publication } = require('../models');
const Commentaire = db.comments;
const Role = db.role;
const User = db.user;

exports.createComment = (req,res)=>{
  const {userId, publicationId, text} = req.body
  if (userId && publicationId && text){
    Commentaire.create({
      text:text,
      publicationId:publicationId,
      userId:userId
    })  
    .then((data) => {
      res.status(201).json(data)  
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  }
}
exports.deleteComment = (req, res) => {
  let commentId = req.params.id
  let userIdForDelete = req.userId

  User.findOne({
    where: {id: userIdForDelete},
    include:[
      {
        model: Role
      }
    ]
  })
  .then(user =>{
    let userForDeleteRole = user.roles[0].name;
    Commentaire.findOne({
      where: {id: commentId}
    })
    .then(comment =>{
      if (comment.userId === userIdForDelete || userForDeleteRole === "admin"){
        Commentaire.destroy({
          where: {id:commentId}
        })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Tutorial was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
          });
        });
      }
    })
    .catch(err=>{
      res.status(500).send({
        message: "erreur lors de la recherche du commentaire"
      })
    })
  })
  .catch(err =>{
    res.status(400).send({
      message: "erreur lors de la recherche de l'utilisateur"
    })
  })
}

