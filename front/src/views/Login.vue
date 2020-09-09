<!-- 
Fichier vue principal pour le login. Nous y retrouvons : 
- le formulaire avec les champs email et mot de passe 
- des blocs inclus dans de formulaire qui ne s'affichent qu'en cas d'erreur

Nous utilisons VeeValidate pour vérifier les champs renseignés par l'utilisateur 

-->
<template>
  <div class="col-md-12">
    <div class="card card-container cardGroupomania">
      <img
        id="profile-img"
        src="@/assets/profile-pic.png"
        class="profile-img-card"
        alt="avatar par défaut d'un utilisateur"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Votre email</label>
          <input
            v-model="user.email"
            v-validate="'required'"
            type="email"
            class="form-control"
            name="email"
            id="email"
          />
          <div
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          >L'email est obligatoire pour se connecter!</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
            id="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Votre mot de passe est obligatoire pour se connecter</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading" id="btn-connexion">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Se connecter</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//Nous importons notre modèle de données
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  //Computed : les propriétés savent si les valeurs utilisées dans les fonctions changent 
  //donc elles n'ont pas besoin d'être lancées tout le temps. 
  //Ici les valeurs sont amenées à changer entre connecté ou non connecté, cette information
  // est renvoyée par VueX store. 
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  //Lors de la création de la page nous vérifions si l'utilisateur est connecté 
  //si c'est le cas alors nous le renvoyons vers la page de profil
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    //Utilisation de vee validator
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        //Si les champs email et mot de passe sont valides alors on  
        //propage les actions dans les composants avec this.$store.dispatch('xxx') 
        //puis on revoit vers la page de profil
        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user)
            .then(() => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss">
label {
  display: block;
  margin-top: 10px;
  color: #042255;
  text-decoration: underline;
}
input{
  background-color: #04225533;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.cardGroupomania {
  background-color: #FFF;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border: solid 5px #042255;
  border-radius: 25px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

#btn-connexion{
  background-color: #e70435;
  border: none;
  transition: all .5s;
  transition-timing-function: cubic-bezier(.2, 3, .4, 1);
  &:hover{
    transform: scale(1.1, 1.1);
    background-color: #e70435;
  }
}

.profile-img-card {
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
