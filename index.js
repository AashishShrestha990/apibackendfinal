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

//for swagger
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");

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





var swaggerDefinition = {

    info: {
        // API informations (required)
        title: 'Smart Project Visualization', // Title (required)
        version: 'v1', // Version (required)
        description: 'API documentation By Aashish_Shrestha', // Description (optional)
    },
    host: 'localhost:3000', // Host (optional)
    basePath: '/', // Base path (optional)
    securityDefinitions : {
        bearerAuth : {
            type: 'apiKey',
            name: 'authorization',
            scheme : 'bearer',
            in : 'header'
        }
    }

};

var options = {
    swaggerDefinition,
    apis:['./index.js']
};

const swaggerSpec = swaggerJSDoc(options);
application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));










//register

/**
 * @swagger
 * /v1/users/:
 *   post:
 *     tags:
 *      - Register
 *     name: Add User
 *     summary: This API add a single User
 *     description: Add a single User
 *     produces: application/json
 *     parameters:
 *     - name: project
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          name:
 *           type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *     responses:
 *       201:
 *         description: User Registered
 *       500:
 *        description: DB Error
 *
 */


application.post("/v1/users/",control.validator,control.hashGenerator, control.registerUser, function (req,res,next) {
    res.status(200);
    res.send(
        {
            "message": "Register Success",
            // "token": req.genToken,
        });
    next();

});


/**
 * @swagger
 * /v1/verify:
 *   post:
 *     tags:
 *      - Login
 *     name: Resigister name
 *     summary: This API login a single  user
 *     description: login a single user
 *     produces: application/json
 *     parameters:
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *          password:
 *           type: string
 *     responses:
 *       200:
 *         description: Login success
 *       500:
 *        description: DB Error
 *
 */




//login
application.post('/v1/verify',Auth.verify,Auth.check,Auth.jwtTokenGen,Auth.loginData, function(req,res,next){
    // console.log(req.body);
    res.status(200);
    // res.send({'message':'token generated',"token":req.genToken,"email":req.body.username ,'message':'login success'});
    res.json({'token': req.genToken,"email":req.email,"id":req.id,'message':'succesfully login'});


});


/**
 * @swagger
 * /v1/users/{email}:
 *   get:
 *     tags:
 *      - Users
 *     description: Fetch all user data by email
 *     produces: application/json
 *     parameters:
 *     - name: email
 *       in: path
 *       required: true
 *       type: string
 *       description: user email
 *     responses:
 *       200:
 *         description: Successfully fetched
 */

application.get("/v1/users/:email",control.getUser,function(req,res,next){
});


/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     tags:
 *      - Users
 *     description: Fetch a info of a user
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: user id
 *     responses:
 *       200:
 *         description: Successfully fetched
 */

application.get('/v1/users/:id',control.getMyProfile,function(req,res){
    console.log(req.params.id);
    res.status(201);
    //message after successfully post
    res.send({"message": "profile displayed"});

});





/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     tags:
 *      - Users
 *     description: Updates a single user info
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: User id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          uname:
 *           type: string
 *          email:
 *           type: string
 *          FirstName:
 *           type: string
 *          LastName:
 *           type: string
 *          country:
 *           type: string
 *          address:
 *           type: string
 *          state:
 *           type: string
 *          city:
 *           type: string
 *          postalcode:
 *           type: string
 *          phoneNumber:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */

application.put('/v1/users/:uid',control.updateProfile,function(req, res) {
    console.log(req.params.id);

});






//Project----------------------------------------------------------------------

/**
 * @swagger
 * /v1/project:
 *   post:
 *     tags:
 *      - Project
 *     name: Add Project
 *     summary: This API add a single project
 *     description: Add a single project
 *     produces: application/json
 *     parameters:
 *     - name: project
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Pname:
 *           type: string
 *          Pdesc:
 *           type: string
 *          Pstatus:
 *           type: string
 *     responses:
 *       201:
 *         description: Project added
 *       500:
 *        description: DB Error
 *
 */

application.post("/v1/project",projectController.addProject,function (req,res,next) {
    res.status(201);
    res.send({
        "message": "project created"
    })

});


/**
 * @swagger
 * /v1/project/{UserId}:
 *   get:
 *     tags:
 *      - Project
 *     description: Fetch a project info of a user
 *     produces: application/json
 *     parameters:
 *     - name: UserId
 *       in: path
 *       required: true
 *       type: integer
 *       description: user id
 *     responses:
 *       200:
 *         description: Successfully fetched
 */

application.get("/v1/project/:UserId",projectController.getProject,function(req,res,next){

});


/**
 * @swagger
 * /v1/project/{id}:
 *   delete:
 *     tags:
 *       - Project
 *     description: Deletes a single Project Information
 *     summary: Delete a single Project Detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: project's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

application.delete("/v1/project/:id",projectController.deleteProject,function(req,res,next){
    // console.log(req.params.id);
    res.status(201);
    //message after successfully post
    res.send({"message": "project deleted"});
    next();
});


/**
 * @swagger
 * /v1/sproject/{id}:
 *   get:
 *     tags:
 *      - Project
 *     description: Fetch a single project info
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: project id
 *     responses:
 *       200:
 *         description: Successfully fetched
 */



application.get('/v1/sproject/:id',projectController.getIndividualProject,function(req,res){
    console.log(req.params.id);
    res.status(201);
    //message after successfully post
    res.send({"message": "project displayed"});

});


/**
 * @swagger
 * /v1/project/{id}:
 *   put:
 *     tags:
 *      - Project
 *     description: Updates a single project info
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: project id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Pname:
 *           type: string
 *          Pdesc:
 *           type: string
 *          Pstatus:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */

application.put('/v1/project/:id',projectController.updateProject ,function(req, res) {
    console.log(req.params.id);

});








// Note-------------------------------------------------------------

/**
 * @swagger
 * /v1/upload:
 *   post:
 *     tags:
 *      - Note
 *     name: Add Note
 *     summary: This API add a single Note data
 *     description: Add a single Note
 *     produces: application/json
 *     parameters:
 *     - name: project
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Nimage:
 *           type: string
 *          Nname:
 *           type: string
 *          Ndesc:
 *           type: string
 *     responses:
 *       201:
 *         description: Note added successful
 *       500:
 *        description: DB Error
 *
 */


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





/**
 * @swagger
 * /v1/note/{UserId}:
 *   get:
 *     tags:
 *      - Note
 *     description: Fetch all note detail of a user
 *     produces: application/json
 *     parameters:
 *     - name: UserId
 *       in: path
 *       required: true
 *       type: integer
 *       description: User id
 *     responses:
 *       200:
 *         description: Successfully fetched
 */



application.get("/v1/note/:UserId",noteController.getNote,
    function(req,res,next){
    });


/**
 * @swagger
 * /v1/note/{id}:
 *   delete:
 *     tags:
 *       - Note
 *     description: Deletes a single Note Information
 *     summary: Delete a single Note Detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Note id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

application.delete("/v1/note/:id",noteController.deleteNote,function(req,res,next){
    // console.log(req.params.id);
    res.status(201);
    //message after successful
    res.send({"message": "Note deleted"});
    next();

});


/**
 * @swagger
 * /v1/snote/{id}:
 *   get:
 *     tags:
 *      - Note
 *     description: Fetch a single Note info
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: Note id
 *     responses:
 *       200:
 *         description: Successfully fetched
 */


application.get('/v1/snote/:id',noteController.getSeperateNote,function(req,res){
    console.log(req.params.id);
    res.status(201);
    //message after successful
    res.send({"message": "pulled note"});

});


/**
 * @swagger
 * /v1/note/{id}:
 *   put:
 *     tags:
 *      - Note
 *     description: Updates a single Note info
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: project id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Nname:
 *           type: string
 *          Ndesc:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */


application.put('/v1/note/:id',noteController.updateNote,function(req, res) {
    console.log(req.params.id);
});






application.listen(3000);

module.exports = application;

//terminal mocha --watch