<!-- 
    Cette page récupère les différentes informations depuis Vuex Store grace à la fonction currentUser. 
    Si l'utilisateur n'est pas connecté au service alors il est redirigé vers la vue Login
-->

<template>
  <div class="container">
    <header class="jumbotron jumbotron-profile">
      <h3>
        <strong>{{currentUser.firstname}} {{currentUser.lastname}}</strong>
      </h3>
      <div class="profile-container">
        <img
        id="profile-img"
        src="@/assets/profile-pic.png"
        class="profile-img-card"
        />
        <div class="profile-info">
          <p>
          <strong>Id de l'utilisateur:</strong><br/>
          {{currentUser.id}}
          </p>
          <p>
            <strong>Votre email:</strong><br/>
            {{currentUser.email}}
          </p>
          <strong>Votre role :</strong><br/>
          <ul>
            <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
          </ul>
        </div>
      </div>
      <button @click="deleteUser" class="deleteUser">
        Supprimer votre compte
      </button>
    </header>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Profile',
  
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods:{
    deleteUser() {
      console.log(this.$store.state.auth.user.id);
      axios
          .delete(`http://localhost:8081/api/auth/${this.$store.state.auth.user.id}`)
          .then(() => {
              this.$store.dispatch('auth/logout');
              this.$router.push('/login');
          }) // ...Si non on envoi une erreur
          .catch(error => console.log(error));
    },
  },
  //Ici on utilise l'étape mounted, 
  //puisque l'on a besoin d'attendre l'arrivée des données (utilisateur connecté ou non)
  //avant d'effectuer la redirection
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
.jumbotron-profile{
  border: solid #042255 3px;
  max-width: 500px;
  background-color: #fff;
  border-radius: 25px;
  
}
img{
  width: 120px;

}
strong{
  color:#F64C71; 
}
.profile-info{
  border: solid 3px #04225533;
  border-radius: 15px;
  margin-top: 20px;
  padding-left: 10px;
}
.deleteUser{
  margin: 5% 0 0 0;
  height: 40px;
  width: 100%;
  border-radius: 25px;
  background-color: #F64C71;
  border: none;
  color: #fff;
  transition: all .5s;
  transition-timing-function: cubic-bezier(.2, 3, .4, 1);
  &:hover{
    transform: scale(1.1, 1.1);
    background-color: #F64C71;
  }
}
</style>
