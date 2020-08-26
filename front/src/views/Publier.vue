<template>
  <div>
    <div class="block-post w-75 mt-5">
      <h3 class="mt-2"> Créer une Publication </h3>
      <form enctype="multipart/form-data" action="/create" method="post">
        <div class="input-group ">
          <label for="title">- Que voulez-vous nous dire ? -</label>
          <br />
          <textarea v-model="contentPost.title" class="input-text" rows="3" id="title" type="text" />
        </div>
        
        <div>
            <div class="attachment"> Télécharger une image
                <input name="attachment" placeholder="Choisir un fichier" id="attachment" type="file" class="inputFile" accept="image/*">
            </div>
        </div>
        <button type="submit" @click.prevent="createPublication" class="btn btn-secondary btn-poster mb-3 mt-3">Poster</button>
        <span id='msgReturnAPI' class="mx-3">{{msgError}}</span>
      </form>
    </div>
  </div>
</template>

<script>
// import d'axios pour les requêtes et de la bibliothèque vuex

import axios from "axios";
import {mapState} from 'vuex';

export default {
  name: "publier",
  data() {
    return {
      contentPost: {
        title: null,
        postImage: null,
        imageData: "",
        userId: this.$store.state.auth.user.id
      },
      msgError: ""
    };
  },
  computed: {
      ...mapState([
      'auth'
    ]),
  },
  methods: {
        createPublication() {
        const fd = new FormData();
        //on déclare une constante FormData pour stocker les infos du Post

        fd.append("attachment", this.contentPost.postImage); // L'image postée
        fd.append("title", this.contentPost.title); // Le texte posté
        if (fd.get("attachment") == "null" && fd.get("title") == "null") { 
            // si il n'y à rien a publier on affiche un texte d'erreur 
            let msgReturn = document.getElementById('msgReturnAPI')
            msgReturn.classList.add('text-danger')
            this.msgError = "Vous devez au moins nous dire quelque chose !!";
        } else {
            axios // On effectue la requête grâce à axios et grâce au Token d'identification de l'User
                .post("http://localhost:8081/api/publications", fd)
                .then(response => {
                // Si la requête fonctionne, on recharge la page pour afficher le dernier post dans le Wall
                if (response) {
                    window.location.reload();
                }
                }) // Sinon, on affiche une erreur de requête
                .catch(error => (this.msgError = error));
        }
    },
    
  }
};
</script>

<style scope>
.input-text {
  width: 100%;
}
</style>