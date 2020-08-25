//Nous créons une fonction qui va rechercher dans le local storage la donnée user associée au token 
// Si un token est trouvé alors il va etre retourné dans le header Authorization HTTP
// Sinon retourne un objet vide qui va alors bloquer l'accès aux ressources privées. 
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}