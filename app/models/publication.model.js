module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publications", {
      title: {
        type: Sequelize.STRING
      },
      attachment: {
        type: Sequelize.STRING
      }
    });
  
    return Publication;
  };