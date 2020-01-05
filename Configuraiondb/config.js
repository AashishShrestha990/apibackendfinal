var Sequelize = require('sequelize');

var sequelize = new Sequelize('API','aashish', 'Aashish990', {
    host : 'localhost',
    dialect: 'mysql',
    logging: false

});

sequelize.authenticate()
    .then(function (){
        console.log('Database Connected');
    })
    .catch(function(err)
        {
            console.log(err);
        }
    );

module.exports = {
    Sequelize,
    sequelize
};