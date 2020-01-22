const ProjectModel =require('../models/ProjectModel');
const Joi = require('joi');
//
// function validation(req,res,next){
//     const schema = {
//         Pname:Joi.string().max(15).required(),
//         Pdesc:Joi.string().required(),
//         Pstatus:Joi.string().max(100)required(),
//
//     };
//
//     const result = Joi.validate(req.body,schema);
//     // console.log(result);
//     if(result.error){
//         //bad request
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }
//     next()
// }

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


function updateProject(req,res){
    ProjectModel.Project.update({
        Pname:req.body.Pname,
        Pdesc:req.body.Pdesc,
        Pstatus:req.body.Pstatus,


    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (result) {
            res.status(201);
            res.send({
                "message": "Project Updated"
            })
        })
        .catch(function (err) {

        })
}



function deleteProject(req,res,next){
    ProjectModel.Project.destroy({
        where:{id:req.params.id}
    })
        .then(function(){
            res.status(200);
            res.send({
                "message":"Project deleted"
            })

        })
        .catch(function (err) {
            next({"status":500,"message":"could not deleted"})
        });
    next()
}







module.exports ={
     // validation,
     addProject,
    getProject,
    updateProject,
    getIndividualProject,
    deleteProject

};