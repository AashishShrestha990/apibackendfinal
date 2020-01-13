var database = require("../Configuraiondb/config");

const Project = database.sequelize.define('Project', {
        // attributes
        id:{
            type: database.Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true
        },

        Pname: {
            type: database.Sequelize.STRING,
            allowNull: false
        },
        Pdesc: {
            type: database.Sequelize.STRING,
            allowNull: false
            // allowNull defaults to true

        },
        Pstatus: {
            type: database.Sequelize.STRING,
            allowNull: false
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
        tableName:"project_details"
    });

Project.sync({force:false})
    .then(function(result){
        console.log(result);
    })
    .catch(function(error){
        console.log(error)
    })

module.exports = {
    Project
};