import axios from 'axios';

//ON récupère l'url de base de l'api
const API_URL = 'http://localhost:8081/api';

class PublicationService {
    getAll() {
      return axios.get(API_URL + "/publications");
    }
  
    get(id) {
      return axios.get(API_URL + `/publications/${id}`);
    }
  
    create(data) {
      return axios.post(API_URL + "/publications", data);
    }
  
    update(id, data) {
      return axios.put(API_URL + `/publications/${id}`, data);
    }
  
    delete(id) {
      return axios.delete(API_URL + `/publications/${id}`);
    }
}

export default new PublicationService();