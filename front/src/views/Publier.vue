<template>
  <div>
    <div class="block-post w-75 mt-5">
      <h3 class="mt-2"> Créer une Publication </h3>
      <form enctype="multipart/form-data" action="/create" method="post" @submit.prevent="sendPostData">
        <div class="input-group ">
          <label for="title">- Que voulez-vous nous dire ? -</label>
          <br />
          <textarea v-model="contentPost.title" class="input-text" rows="3" id="title" type="text" />
        </div>
        
        <div>
            <div class="attachment"> Télécharger une image
                <input 
                  name="attachment" 
                  placeholder="Choisir un fichier" 
                  id="attachment" 
                  type="file" 
                  class="inputFile" 
                  @change="onFileUpload"
                  accept="image/*">
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-poster mb-3 mt-3">Poster</button>
        <span id='msgReturnAPI' class="mx-3">{{msgError}}</span>
      </form>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {mapState} from 'vuex';

export default {
  name: "publier",
  data() {
    return {
      contentPost: {
        title: "",
        attachment: null,
        userId: ""
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
    onFileUpload(event){
      this.attachment = event.target.files[0]
    },
    sendPostData(){
      const formData = new FormData();
      formData.append('title', this.contentPost.title);
      formData.append('attachment', this.attachment);
      formData.append('id', this.$store.state.auth.user.id);

      axios.post('http://localhost:8081/api/publications', formData,{})
        .then((res)=>{
          console.log(res)
        });
    },

  }
};
</script>

<style scope>
.input-text {
  width: 100%;
}
</style>