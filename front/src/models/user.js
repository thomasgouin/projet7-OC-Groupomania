//Voici notre modèle User qui prend les mêmes caractéristiques que dans notre BDD. 

export default class User {
    constructor(firstname, lastname, email, password) {
      this.firstrname = firstname;
      this.lastrname = lastname;
      this.email = email;
      this.password = password;
    }
}

  