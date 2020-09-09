const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const emailRegex = /^[a-zA-ZéèëïÏËÉÈàç\-]{2,30}@groupomania.com$/;
const passwordRegex  = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/;

exports.signup = (req, res) => {

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (firstname === null || lastname === null || email === null || password === null) {
    return res.status(400).send({ message: "Veillez renseigner tous les champs" });
  }

  if (firstname.length <= 2  || firstname.length >= 15) {
      return res.status(400).send({ message: "Votre prénom doit avoir entre 3 et 15 caractères" });
  }

  if (lastname.length <= 2 || lastname.length >= 15) {
      return res.status(400).send({ message: "Votre nom doit avoir entre 3 et 15 caractères" });
  }

  if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Votre adresse email doit être de type prenom@groupomania.com" });
  }

  if (!passwordRegex.test(password)) {
      return res.status(400).send({ message: "Votre mot de passe doit contenir au moins 1 chiffre, 1 lettre majuscule, 1 lettre minuscule et compter au moins 8 caractères" });
  }
  // Save User to Database
    User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: bcrypt.hashSync(password, 8)
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

exports.delete = (req,res)=>{
  const id = req.params.id
  console.log(id);
  User.findOne({
    where: {
      id:id
    }
  })
  .then(user =>{
    console.log(user)
    if (!user) {
      return res.status(404).send({ message: "L'utilisateur  n'a pas été trouvé." });
    }
    else{
      User.destroy({
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
  })
}