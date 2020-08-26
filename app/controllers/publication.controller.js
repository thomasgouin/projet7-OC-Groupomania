const db = require("../models");
const User = db.user;
const Publication = db.publication;
const Op = db.Sequelize.Op;

// Crée et enregistre une nouvelle publication 
exports.create = (req, res) => {
    
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Tutorial
      const publication = {
        title: req.body.title,
        attachment: req.body.attachment,
        userId: req.body.userId
      };
    
      // Save Tutorial in the database
      Publication.create(publication)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the publication."
          });
        });
    
};



// Retourne l'ensemble des publications avec une option de filtrage par utilisateur
exports.findAll = (req, res) => {
    const userid = req.body.userid;
    let condition = userid ? {userid: {[Op.like]: `%${userid}%`}} : null;
    Publication.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Des erreurs sont survenues lors de la récupération des publications de l'utilisateur"
            })
        })
}

// Retourne une publication grâce à son id
exports.findOne = (req, res) => {
    
    const id = req.params.id;
    
    Publication.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la recherchde de la publication par id avec id=" + id
            });
        });
};

// Modifie une publication grâce à son id
exports.update = (req, res) => {
    
    const id = req.params.id;

    Publication.update(req.body, {
        where: { id: id }
    })

    .then(num => {
    if (num == 1) {
        res.send({
            message: "La publication a été modifiée avec succès."
        });
    } else {
        res.send({
            message: `Nous ne pouvons modifier la publication avec id=${id}. Soit la publication n'a pas été trouvée, soit la requête est vide !`
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur lors du chargement de la publication avec id=" + id
        });
    });
      
};

// Supprime une publication grâce à son id
exports.delete = (req, res) => {
    
    const id = req.params.id;
    
    Publication.destroy({
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "La publication a été supprimée avec succès"
        });
    } else {
        res.send({
        message: `Nous ne pouvons supprimer cette publication avec id=${id}.`
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Nous n'avons pas pu supprimer la publication avec id=" + id
        });
    });
     
};

