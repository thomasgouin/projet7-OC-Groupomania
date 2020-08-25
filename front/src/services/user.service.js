//C'est ici que nous sécurisons les URLs en fonction des roles utilisateurs.

import axios from 'axios';
import authHeader from './auth-header';

//Nous isolons toujours notre route principale pour plus de lisibilité
const API_URL = 'http://localhost:8081/api/test/';

//Nous créons une class qui répértorie les fonctions filtrant l'accès aux différentes ressources. 
//Nous envoyons donc le token d'accès en deuxième paramètre des requêtes axios pour user et admin. 

class UserService {
    
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();
