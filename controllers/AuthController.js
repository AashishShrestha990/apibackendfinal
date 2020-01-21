// checking user Register or Not??

var usermodel = require('../models/UserModel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');





function verify(req, res, next) {

    usermodel.User.findOne({

        where: {
            email: req.body.email
        }
    })
    //user have been rergistered
        .then(function(result){
            if(result != null){
                next();
            }else{
                next({"status":409,"message":"Credential did not match"});
            }
        })
        .catch(function(err){
            next({"status":409 ,"message":err});
        })


}


function check(req, res, next) {
    usermodel.User.findOne({
        where: {email:req.body.email}
    })

        .then(function(result){
            if(result != null){
                bcrypt.compare(req.body.password, result.dataValues.password, function(err, res) {
                    if(res) {

                        next();

                    }

                    else {
                        next({"status":500,"message":"Credential didn't match."});
                    }
                });
            }else{
                next({"status":500,"message":"Credential didn't match."});
            }

        })
        .catch(function(err){
            next({"status":500, "message":"Error Occured"});
        })

}


function jwtTokenGen(req, res, next) {

    jwt.sign({
            email: req.body.email,
            accessLevel: 'admin'
        }, 'mySecretKey', {
            expiresIn: "10h"
        },

        function(err, token) {
            if(err != null || undefined ){
                console.log(err);
                next({"status":401, "message":"Unauthorized token"})
            }
            else{
                req.genToken=token;
                next();
                console.log(token)
            }

        }
    )

}





function tokenVerify(req,res,next){
    console.log(req.headers.authorization);
    let token = req.headers.authorization.slice(6,req.headers.authorization.length)
    jwt.verify(token,'mySecretKey',function(err,decoded){
        if(err !=null){
            next({status:500,message:err.message});
            console.log(err)
        }else{
            next()
        }
        console.log(decoded);
    })
}

function loginData(req,res,next) {
    usermodel.User.findOne({
        where:{email:req.body.email}
    })
        .then(function (result) {
            if(result != null){
                // res.json(result)
                res.send(
                    {
                        status:201,
                        "message": "Login success",
                        // "token": req.genToken,
                        "result":result
                    });
            }
        })


        .catch(function(err){
            // res.json(err);
            next({"status":500 ,"message":err});
        })
    // next()
}



module.exports = {
    verify,
    check,
    jwtTokenGen,
    tokenVerify,
    loginData
};