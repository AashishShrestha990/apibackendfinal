var database = require("../Configuraiondb/config");

const Note = database.sequelize.define('Note', {
        // attributes
        id:{
            type: database.Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true
        },

        Nname: {
            type: database.Sequelize.STRING,
            allowNull: false
        },
        Ndesc: {
            type: database.Sequelize.STRING,
            allowNull: false
            // allowNull defaults to true

        },


        Nimage: {
            type: database.Sequelize.STRING,
            allowNull: true
            // allowNull defaults to true

        },


        UserId: {
            type: database.Sequelize.STRING,
            allowNull: true
            // allowNull defaults to true

        },




    },

    {
        // options
        freezeTableName:true,
        tableName:"note_details"
    });

Note.sync({force:false})
    .then(function(result){
        console.log(result);
    })
    .catch(function(error){
        console.log(error)
    });

module.exports = {
    Note
};