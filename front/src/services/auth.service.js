import axios from 'axios';

//ON récupère l'url de base de l'api
const API_URL = 'http://localhost:8081/api/auth/';

//On crée une class pour y ranger les méthodes login/logout et register

class AuthService {
    
    login(user) {
        //Pour se connecter au service on fait une requête axios 
        //  1e paramètre Url du backend concernée
        //  2e paramètre un objet avec les données issues du formulaire 
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            //Une fois la réponse obtenue nous stockons le token dans le localstorage si nous obtenons une réponse
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
            });
    }

    logout() {
        //Nous vidons le localstorage pour le pas garder le token en mémoire
        localStorage.removeItem('user');
        
    }

    register(user) {
        //Pour inscrire l'utilisateur nous lui envoyons les informations dont le backend a besoin
        //2e paramètre : firstname, lastname, email, password
        return axios.post(API_URL + 'signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
