console.log('Running');

const bcrypt = require('bcrypt');
var control = require("./controllers/UserController");
var express = require('express');
var bodyParser = require('body-parser');
var application = new express;




application.post("/v1/users/",control.validator,control.hashGenerator, control.registerUser, function (req,res,next) {
    res.status(200);
    res.send(
        {
            "message": "Register Success",
            // "token": req.genToken,
        });
    next();

});



//login
application.post('/v1/verify',Auth.verify,Auth.check,Auth.jwtTokenGen,Auth.loginData, function(req,res,next){
    // console.log(req.body);
    res.status(200);
    // res.send({'message':'token generated',"token":req.genToken,"email":req.body.username ,'message':'login success'});
    res.json({'token': req.genToken,"email":req.email,"id":req.id,'message':'succesfully login'});


});


application.put('/v1/users/:uid',control.updateProfile,function(req, res) {
    console.log(req.params.id);

});

application.get('/v1/users/:id',control.getMyProfile,function(req,res){
    console.log(req.params.id);
    res.status(201);
    //message after successfully post
    res.send({"message": "profile displayed"});

});

application.put('/v1/users/:uid',control.updateProfile,function(req, res) {
    console.log(req.params.id);

});

application.post("/v1/project",projectController.addProject,function (req,res,next) {
    res.status(201);
    res.send({
        "message": "project created"
    })

});

application.get("/v1/project/:UserId",projectController.getProject,function(req,res,next){

});

application.delete("/v1/project/:id",projectController.deleteProject,function(req,res,next){
    // console.log(req.params.id);
    res.status(201);
    //message after successfully post
    res.send({"message": "project deleted"});
    next();
});

application.get('/v1/sproject/:id',projectController.getIndividualProject,function(req,res){
    console.log(req.params.id);
    res.status(201);
    //message after successfully post
    res.send({"message": "project displayed"});

});

application.put('/v1/project/:id',projectController.updateProject ,function(req, res) {
    console.log(req.params.id);

});



application.listen(3000);

module.exports = application;

