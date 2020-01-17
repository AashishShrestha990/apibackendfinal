var usermodel = require("../models/UserModel");

var bcrypt = require('bcrypt');
var saltRounds = 10;



function validator (req,res,next){
    usermodel.User.findOne({
        where : {email:req.body.email}
    })
        .then(function(result){
            console.log(result.dataValues);
            if (result.dataValues != '') {
                next({"status":409,"message":'email already exists'})
            }
        })
        .catch(function(err){
            next();
        })

}


function hashGenerator(req,res,next){

     req.body.password  // this is plain text password
    bcrypt.hash(req.body.password, saltRounds)
        .then(function(hash)
        {
            console.log(hash);
            req.hashvalue = hash;
            next();
        })
        .catch(function(err){
            console.log(err)
        })
}


function registerUser(req, res, next) {
    usermodel.User.create({
        uname: req.body.name,
        email: req.body.email,
        password: req.hashvalue

    })
        .then(function (result) {

            next();

        })
        .catch(function (err) {

            next({"status": 500, "message": "Database Error"});
            console.log(err)

        })

}


function getLogin(req,res,next){

    usermodel.User.findAll({

        attributes:['id','email','password']
    })
        .then(function (result){
            // console.log('rere')
            // req.id= result.dataValues.id;
            // req.email= result.dataValues.email;

            // res.send({'message':'token generated',"token":req.genToken,"email":req.body.username ,'message':'login success'});
            res.json({'token': req.genToken,"email":req.email,"id":req.id,'message':'succesfully login'});
next();
        })
        .catch(function (err){

        })
}



function getUser(req,res,next){

    // usermodel.User.findAll({
    //
    //     attributes:['id','uname','email','FirstName','LastName',
    //         'country','address','state','city','postalcode','phoneNumber']
    // })
    //     .then(function (result){
    //         res.json(result);
    //     })
    //     .catch(function (err){
    //
    //     })

    usermodel.User.findAll({
        where :{email:req.params.email}
    })
        .then(function (result) {
            // console.log(result)

            res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        })
}






function getMyProfile(req,res){
    usermodel.User.findOne({
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



function updateProfile(req,res){
    usermodel.User.update({
        uname:req.body.uname,
        email:req.body.email,
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        country:req.body.country,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        postalcode:req.body.postalcode,
        phoneNumber:req.body.phoneNumber,

    }, {
        where: {
            id: req.params.uid
        }
    })
        .then(function (result) {
            res.status(201);
            res.send({
                "message": "Profile Updated"
            })
        })
        .catch(function (err) {

        })
}





module.exports = {
    validator,
    registerUser,
    hashGenerator,
    getUser,
    getMyProfile,
    getLogin,
    updateProfile
};
// registerUser();

