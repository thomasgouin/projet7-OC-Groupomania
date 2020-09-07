<!--
    Rendu de la page publique 
-->

<template>
  <div class="container">
    <header class=" jumbotron-home">
      <h3 class="jumbotron-home__h3">Bienvenue sur AtWork!</h3>
      <h4 class="jumbotron-home__h4">L'espace pour les salariés de Groupomania.</h4>
      <p class="jumbotron-home__p">
      Une fois connecté au service avec votre mail professionnel, 
      vous aurez accès à un espace de partage de photos et gifs avec vos collègues.
      Nous espérons que ces echanges permettront de mieux connaître vos collègues et 
      d'échanger sur des sujets autres que les bilans marketing et commerciaux. 
    </p>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
<style lang="scss">
.jumbotron-home{
  margin-top: 80px;
  background-color: #fff;
  color: #042255;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  border: 5px solid #042255;
  &__h3{
    color: #F64C71;
    font-size: 30px;
    padding: 30px 20px;
  }
  &__h4{
    margin: 0 0 40px 0;
    padding: 0 20px;
  }
  &__p{
    padding: 0 20px;
  }
}


</style>
