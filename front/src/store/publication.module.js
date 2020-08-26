
import PublicationService from '../services/publication.service';

export const publication = {
    state: {
        allPublications:[],
    },
    actions:{
        getAllPublications({commit}, allPublications){
            return PublicationService.getAll(allPublications)
            .then(allPublications =>{
                commit('allPublications', allPublications);
                return Promise.resolve(allPublications)
            })
        }
    },

    mutations:{
        allPublications(state, allPublications){
            state.allPublications = allPublications
        }
    },

}