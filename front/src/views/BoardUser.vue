<template>
  <div class="container">
    <header class="jumbotron">
      <button @click="goToPublish" class="btn btn-primary btn-block button">Créer une publication</button>
      <Publication v-for="publication in publications" :key="publication.id" :publication="publication" @infosPublication="setDataInPublication"/>
    </header>
    
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Publication from '../components/Publication';


export default {
  name: 'User',
  components: {
    Publication
  },
  data(){
    return {
      publication:{
        id: "",
        title: "",
        attachment:"",
        userId:"",
        createdAt:"",
      }
    }
  },
  computed: {
    ...mapState([
      'publications'
    ])
  },
  methods: {
    setDataInPublication(payload){
      this.publication = payload.publication;
    },
    goToPublish(){
      this.$router.push('/publier');
    }
  },
  mounted(){
    this.$store.dispatch('loadPublications')
  }
};

</script>


<style lang="scss">
.container{
  display: flex;
  justify-content: center;
}
.jumbotron{
  background-color: #fff;
  max-width: 500px;
  border: none;
}
.button{
  background-color: #e70435;
  border: none;
  transition: all .5s;
  transition-timing-function: cubic-bezier(.2, 3, .4, 1);
  margin-bottom: 20px;
  &:hover{
    transform: scale(1.1, 1.1);
    background-color: #e70435;
  }
}
</style>
