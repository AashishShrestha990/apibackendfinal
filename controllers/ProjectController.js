const ProjectModel =require('../models/ProjectModel');
const Joi = require('joi');
//

function addProject(req,res,next){
    ProjectModel.Project.create(
        {
            Pname:req.body.Pname,
            Pdesc:req.body.Pdesc,
            Pstatus:req.body.Pstatus,
            UserId:req.body.UserId


        })
        .then(function(result){
            next();
        })
        .catch(function(err)
        {

            next({"status":500, "message":"Something went wrong"});
            console.log(err)
        })

}


function getProject(req,res,next){

    // ProjectModel.Project.findAll({
    //
    //     attributes:['id','Pname','Pdesc','Pstatus','createdAt','updatedAt']
    // })
    //     .then(function (result){
    //         res.json(result);
    //     })
    //     .catch(function (err){
    //
    //     })

    ProjectModel.Project.findAll({
        where :{UserId:req.params.UserId}
    })
        .then(function (result) {
            // console.log(result)

            res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        })
}

function getIndividualProject(req,res){
    ProjectModel.Project.findOne({
        where:{id:req.params.id}
    })
        .then(function (result) {
            res.status(200);
            res.json(result);

        })
        .catch(function(err){
            res.json(err);
        })
}




module.exports ={
     // validation,
     addProject,
    getProject,
    updateProject,
    getIndividualProject,
    deleteProject

};