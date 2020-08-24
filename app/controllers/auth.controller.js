const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "L'utilisateur a été enregistré avec succès" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "L'utilisateur a été enregistré avec succès" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    //on recherche si le mail rentré correspond à un mail de la bdd
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        //puis si il n'y a pas de correspondance alors on envoit une erreur
        if (!user) {
            return res.status(404).send({ message: "L'email n'a pas été trouvé." });
        }
        //puis si il y a une correspondance alors: 
        //On regarde si le mot de passe renseigné est valide
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        //si il n'est pas valide, on ne génère pas de token et on renvoie l'erreur mot de passe 
        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Le mot de passe n'est pas correct"
            });
        }
        //Si il est valide alors une crée une valiable token; 
        let token = jwt.sign(
            { id: user.id }, 
            config.secret, 
            {expiresIn: 86400} // valable 24 heures
        );

        //On vient rechercher le rôle de l'utilisateur dans la variable authorities
        let authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
            //On renvoie une réponse de statut200 avec l'ensemble des éléments liés à l'utilisateur dans un objet. 
            res.status(200).send({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    })
    .catch(err => {
    res.status(500).send({ message: err.message });
    });
};