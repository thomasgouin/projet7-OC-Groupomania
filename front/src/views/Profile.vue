<!-- 
    Cette page récupère les différentes informations depuis Vuex Store grace à la fonction currentUser. 
    Si l'utilisateur n'est pas connecté au service alors il est redirigé vers la vue Login
-->

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.firstname}}{{currentUser.lastname}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
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
