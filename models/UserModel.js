var db = require('../Configuraiondb/config');

const User = db.sequelize.define('User', {
        // attributes

        id: {
            type: db.Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey:true

        },

        uname: {
            type: db.Sequelize.STRING,
            allowNull: true
        },

        email: {
            type: db.Sequelize.STRING,
            allowNull: false

        },

        password: {
            type: db.Sequelize.STRING,
            allowNull:false
            // allowNull defaults to true
        },

        FirstName: {
            type: db.Sequelize.STRING,
            allowNull: true
        },
        LastName: {
            type: db.Sequelize.STRING,
            allowNull: true
        },
        country: {
            type: db.Sequelize.STRING,
            allowNull:true
            // allowNull defaults to true
        },
        address: {
            type: db.Sequelize.STRING,
            allowNull:true
            // allowNull defaults to true
        },

        state: {
            type: db.Sequelize.STRING,
            allowNull:true
            // allowNull defaults to true
        },
        city: {
            type: db.Sequelize.STRING,
            allowNull:true
            // allowNull defaults to true
        },
        postalcode: {
            type: db.Sequelize.STRING,
            allowNull:true
            // allowNull defaults to true
        },
        phoneNumber: {
            type: db.Sequelize.STRING,
            allowNull:true
            // allowNull defaults to true
        }

    },

    {
        // options
        freezeTableName:true,
        tableName:'my_users'
    }

);

User.sync({force:false})
    .then(function(result){
        console.log(result);
    })
    .catch(function(err){
        console.log(err)
    });

module.exports= {
    User
};