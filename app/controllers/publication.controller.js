const db = require("../models");
const Role = db.role;
const User = db.user;
const Publication = db.publication;
const Comment = db.comments
const Op = db.Sequelize.Op;

// Crée et enregistre une nouvelle publication 
exports.create = (req, res) => {
    const id = req.body.id
    let attachmentURL
    //identifier qui créé le message
    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname'],
        where: { id: id }

    })
        .then(user => {
            if (user !== null) {
                //Récupération du corps du post
                let title = req.body.title;
                //On crée l'url de la piece jointe si la piece jointe existe
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    
                }
                else {
                    attachmentURL == null
                }
                //Si nous avons un texte et une piece jointe, 
                if (title !== 'null' && attachmentURL !== null) {
                    //nous créons un objet avec les renseignement nécessaires
                    const publication = {
                        title: title,
                        attachment: attachmentURL,
                        userId: id
                    }
                    //nous utilisons Sequelize de demander de créer une publication
                    Publication.create(publication)
                        .then((data) => {
                            res.status(201).json(data)
                            
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
    
};



// Retourne l'ensemble des publications en incluant le nom et prénom de l'auteur et 
//l'ensemble des commentaires, eux aussi avec leur auteur. 
exports.findAll = (req, res) => {
    
    Publication.findAll({
        include: [
            {
                model: User,
                attributes: ['lastname', 'firstname']
            },
            {
                model: Comment,
                attributes: ['text','id'],
                include: {
                    model: User,
                    attributes: ['lastname', 'firstname', 'id']
                }
            }
        ],
        //On demande de renvoyer les résultats dans l'ordre decroissant 
        //pour afficher les publications les plus récentes en premier. 
        order: [['createdAt', 'DESC']]
    })
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



// Supprime une publication grâce à son id
exports.delete = (req, res) => {
    let publicationId = req.params.id;
    let userIdForDelete = req.userId
    //On recherche l'utilisateur à l'origine de la suppresion, nous voulons l'id et son rôle. 
    User.findOne({
        where: {id: userIdForDelete},
        include:[   
            {
                model: Role,
            }
        ]
    })
    .then(user =>{
        let userForDeleteRole = user.roles[0].name;
        //Nous sélectionnons la publication avec l'id qui est renvoyer dans les paramètres de l'URL.
        Publication.findOne({
            where: {id: publicationId},
        })
            .then(publication => {
                //Nous n'autorisons la suppressions que si l'utisateur est admin ou auteur de la publication
                if (publication.userId === userIdForDelete || userForDeleteRole === "admin"){
                    //Nous utilisons sequelize pour supprimer la publication
                    Publication.destroy({
                        where: {id: publicationId}
                    })
                    .then(num => {
                        if (num == 1) {
                          res.send({
                            message: "La publication a été supprimée avec succès!"
                          });
                        } else {
                            res.send({
                                message: `la publication avec l'id : ${publicationId} n'a pas été supprimée.`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "la publication avec l'id : ${publicationId} n'a pas été supprimée."
                        });
                    });
                } else {
                    res.status(401).send({
                        message: 'Vous ne pouvez supprimer ce message'
                    })
                }
                
            })
            .catch(err => {
                res.status(500).send({
                    message: "Erreur lors de la recherchde de la publication par id avec id=" + publicationId
                });
            });
    })
    .catch(err =>{
        res.status(500).send({
            message: "Erreur lors de la recherche de l'utilisateur"
        })
    })
}


