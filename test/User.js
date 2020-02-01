const  chai = require('chai');
const  chaiHttp = require('chai-http');
const  chaiLike = require('chai-like');
const  chaiThings = require('chai-things');
const should = chai.should();


const server = require('../index');
var serverRun;
chai.use(chaiLike);
chai.use(chaiThings);
chai.use(chaiHttp);

before(done =>{
    serverRun = server.listen(3004, done);
});

after(done => {
    serverRun.close(done);
});


// Commented register test as same email does not passes everytime

// describe('Users', function(){
//     describe('post user register ', function(){
//         it('it should register a user', function(done){
//             chai.request(server)
//                 .post('/v1/users/')
//                 .send({
//                     'name':'Test',
//                     'email':'aashis8a@gmail.com',
//                     'password':'password'
//                 })
//                 .end(function (err,res) {
//                     // res.should.have.status(200)
//                 });
//             done()
//         })
//     })
// });

//
// describe('PUT Users', function() {
//     userid = 2;
//     it('it should edit the user with new values', function(done) {
//         chai.request(server)
//             .put('/v1/users/' + userid)
//             .send({
//                 'uname': 'Uname3',
//                 'email':'updatedemailtest@gmail.com',
//                 'FirstName':'Aashish',
//                 'LastName':'Shrestha',
//                 'address':'updatedemail@gmail.com',
//                 'country':'Nepal',
//                 'state':'3',
//                 'city':'Kathmandu',
//                 'postalcode':'44600',
//                 'phoneNumber':'9841012345',
//             })
//             .end(function(err, res) {
//                 res.should.have.status(201);
//                 res.body.should.have.property('message');
//                 done();
//             })
//     })
//
//
// });






