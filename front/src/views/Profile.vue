<!-- 
    Cette page récupère les différentes informations depuis Vuex Store grace à la fonction currentUser. 
    Si l'utilisateur n'est pas connecté au service alors il est redirigé vers la vue Login
-->

<template>
  <div class="container">
    <header class="jumbotron">
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
          <strong>Id:</strong><br/>
          {{currentUser.id}}
          </p>
          <p>
            <strong>Email:</strong><br/>
            {{currentUser.email}}
          </p>
          <strong>Authorities:</strong><br/>
          <ul>
            <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
          </ul>
        </div>
      </div>
    </header>
    <!--
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    -->
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

<style lang="scss">
.jumbotron{
  max-width: 450px;
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
</style>
