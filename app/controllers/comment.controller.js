const db = require('../models');
const Commentaire = db.comments;

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
exports.delete = (req, res) => {
  let id = req.params.id
  console.log(id)
  Commentaire.destroy({
      where: {id:id}
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
