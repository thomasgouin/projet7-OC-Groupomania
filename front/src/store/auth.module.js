//Nous importons notre classe Authservice qui contient les requêtes axios
import AuthService from '../services/auth.service';

//On isole notre token utilisateur en l'enrestrant sous forme de JSON
const user = JSON.parse(localStorage.getItem('user'));

//Le state initial de l'utilisateur est soit égal à null soit égal à notre token
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };


export const auth = {
    namespaced: true,
    //voir ci dessus
    state: initialState,

    //Dans vuex:
    //action est la premère étape : on y récolte les données via notre methode login(axios),
    //cette action va entrainer un changement des données (mutations),
    //qui viendra changer le state de ces données.
    actions: {
        //Nous utilisons la fonction login(axios) pour envoyer l'user (réponse du server) 
        //dans un stade de mutation qui prend soit pour nom succes ou failure
        login({ commit }, user) {
            return AuthService.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
            );
        },//Nous supprimons le token de Authorization et renvoyons vers la mutation ayant pour nom 'logout'
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        //Meme structure que pour le login
        register({ commit }, user) {
            return AuthService.register(user).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
            );
        }
    },
    //C'est à ce stade que nous demandons les changements des données enregistrées dans le state
    //Nous mettons donc à jour les informations stockées dans la variable initialState soit 
    // - par null et fasle (état d'origine tant que l'utilisateur n'est pas connecté)
    //- par les données de l'utilisateur connecté. 
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};
