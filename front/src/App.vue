<template>
  <div id="app">
    <nav class="navbar navbar-expand navbarGroupomania">
      <router-link to="/home">
        <img src="@/assets/Logo-blanc.png" alt="Logo de l'entreprise Groupomania en blanc" class="logo-header">
      </router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link navbarGroupomania__link" >wall</router-link>
        </li>
      </ul>

      <ul v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link navbarGroupomania__link">
            <font-awesome-icon icon="user-plus" />S'inscrire
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link navbarGroupomania__link">
            <font-awesome-icon icon="sign-in-alt" />Se connecter
          </router-link>
        </li>
      </ul>

      <ul v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link navbarGroupomania__link">
            <font-awesome-icon icon="user" />
            {{ currentUser.firstname }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link navbarGroupomania__link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />Logout
          </a>
        </li>
      </ul>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
    
  },
};
</script>
<style lang="scss">
.navbarGroupomania{
  background-color: #042255;
  border-bottom: solid 4px #e70435;
  &__link{
    color: #FFD7D7;
    &:hover{
      color: #F64C71;
    }
  }
}
.logo-header{
  width: 80px;
}
@media screen and (min-width: 500px){
  .logo-header{
    width: 150px;
  }
}
@media screen and (min-width: 820px){
  .logo-header{
    width: 200px;
  }
}
</style>
