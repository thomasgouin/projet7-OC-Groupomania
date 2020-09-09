Bonjour,

Ce travail est réalisé dans le cadre de la formation OPENCLASSROOMS. 
Le but de ce 7e projet est de créer un réseau social d'entreprise qui permet aux personnes connectées au service de publier et commenter des photos et gifs. 

Pour se connecter un espace d'inscription et de connexion sécurisé doit être mis en place avant l'accès au réseau social. 

## NB : Construction de la BDD avec Sequelize : 

Dans le fichier app/server.js se trouve la fonction qui actualise la base de données (db.sequelize.sync();). Si vous avez besoin de réinitialiser les tables de voter base de données, vous pouvez utiliser la synchronisation forcée qui est en commentaire dans ce même fichier app/server.js

/!\ Bien penser à créer la base de données sur MySql en amont 

## Les technologies utilisées sont : 

Backend : 
- NodeJS, 
- Express,
- jsonwebtoken,
- Multer. 

Base de donnée : 
- MySql avec l'ORM Sequelize 

Frontend : 
- Vuejs
- VueX

## POUR LANCER L'API, se rendre dans le dossier app puis : 

    - créer un dossier config, 
    - créer un fichier auth.config.js 
    - créer un fichier db.config.js

    -créer un dossier images dans le dosiser app pour enregistrer les images

    Sur le fichier db.config.js renseigner les données suivantes : 

    module.exports = {
        HOST: "NOM_DE_L'HOST",
        USER: "NOM_DE_l'USER",
        PASSWORD: "PASSWORD",
        DB: "Groupomania",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };

    Sur le fichier auth.config.js renseigner les données suivantes : 

    module.exports = {
        secret: "votrecodesecretjsonwebtoken"
    };

    Pour lancer le server : 

    cd app
    npm install
    nodemon run serve

## POUR LANCER L'APPLICATION FRONT : 

cd front 
npm install
npm run serve




