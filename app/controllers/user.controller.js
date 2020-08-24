
//Permet l'accès à tous, même ceux qui ne sont pas identifés
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
//Permet l'accès aux utilisateurs identifés
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
//Permet l'accès aux administrateurs
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
