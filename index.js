console.log('Running');

const bcrypt = require('bcrypt');
var control = require("./controllers/UserController");
var projectController = require("./controllers/ProjectController");
const noteController = require('./controllers/NoteController');
var express = require('express');
var bodyParser = require('body-parser');
var application = new express;
var multer = require('multer');
var path = require('path');
var Auth = require("./controllers/AuthController");


application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));
// program.use('/upload',express.static(path.join(__dirname, 'upload')));
var publicDir = require('path').join(__filename,'/upload');
application.use(express.static(publicDir));

application.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
application.use('/upload', express.static(__dirname + '/upload'));

application.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
    next();
});



var mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
var upload = multer({storage:mystorage});


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

application.post('/v1/upload',upload.single("Nimage"), noteController.addNote,function (req, res)  {
console.log(req.body);

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json(req.file);
    // res.status(200);
    console.log("Note added")
 });

// application.use(function(err,req,res,next){
//     res.status(err.status);
//     res.send({"message":err.message});
// });


application.get("/v1/note/:UserId",noteController.getNote,
    function(req,res,next){
    });

application.get('/v1/snote/:id',noteController.getSeperateNote,function(req,res){
    console.log(req.params.id);
    res.status(201);
    //message after successful
    res.send({"message": "pulled note"});

});

application.put('/v1/note/:id',noteController.updateNote,function(req, res) {
    console.log(req.params.id);
});





application.listen(3000);

module.exports = application;

