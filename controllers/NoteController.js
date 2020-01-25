const NoteModel =require('../models/NoteModel');
const Joi = require('joi');

function validation(req,res,next){
    const schema = {
        Nname:Joi.string().max(15).required(),
        Ndesc:Joi.string().max(100).required(),

    };

    const result = Joi.validate(req.body,schema);
    // console.log(result);
    if(result.error){
        //bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    next();
}



function addNote(req,res,next){
    console.log(req.body)
    NoteModel.Note.create(
        {
            Nname:req.body.Nname,
            Ndesc:req.body.Ndesc,
            Nimage:req.body.Nimage,
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



//Get Function

function getNote(req, res, next) {


    // NoteModel.Note.findAll({
    //
    //     attributes: ['id', 'Nname', 'Ndesc', 'Nimage']
    // })
    //     .then(function (result) {
    //         res.json(result);
    //     })
    //     .catch(function (err) {
    //
    //     })

    NoteModel.Note.findAll({
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



//delete note
function deleteNote(req, res, next) {
    NoteModel.Note.destroy({
        where: { id: req.params.id }
    })
        .then(function () {
            res.status(200);
            res.send({
                "message": "deleted successfully"
            })

        })
        .catch(function (err) {
            next({ "status": 500, "message": "Not deleted" })
        });
    next()
}





function getSeperateNote(req,res){
    NoteModel.Note.findOne({
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


function updateNote(req,res){
    NoteModel.Note.update({
        Nname:req.body.Nname,
        Ndesc:req.body.Ndesc,

    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (result) {
            res.status(201);
            res.send({
                "message": "Note Updated"
            })
        })
        .catch(function (err) {

        })
}


module.exports ={

    addNote,
    validation,
    getNote,deleteNote,
    getSeperateNote,
    updateNote
};