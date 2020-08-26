import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


import { auth } from './auth.module';
//import { publication } from './publication.module';


Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    publications: []
  },
  mutations: {
    SET_PUBLICATIONS(state, publications){
      state.publications = publications
    }
  },
  actions: {
    loadPublications({commit}){
      axios
        .get('http://localhost:8081/api/publications')
        .then(data =>{
          console.log(data.data);
          let publications = data.data
          commit('SET_PUBLICATIONS', publications)
        })
        .catch(error => console.log(error))
    }

  },
  modules: {
    auth,
    //publication
  }
})
