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



application.listen(3000);

module.exports = application;

