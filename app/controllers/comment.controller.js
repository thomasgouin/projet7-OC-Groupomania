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
