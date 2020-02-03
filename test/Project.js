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
    serverRun = server.listen(3008, done);
});

after(done => {
    serverRun.close(done);
});


//Add Project Test
describe('Project', function(){
    describe('post add Project ', function(){
        it('it should add a project', function(done){
            chai.request(server)
                .post('/v1/project')
                .send({
                    'Pname':'TestProjectName',
                    'Pdesc':'This is a test description',
                    'Pstatus':'50'
                })
                .end(function (err,res) {
                    // res.should.have.status(200)
                });
            done()
        })
    })
});


//
// //update project test
// describe('Project', function(){
//     describe('update project ', function(){
//         id = 4;
//         it('it should update the project', function(done){
//             chai.request(server)
//                 .put('/v1/project/' + id)
//                 .send({
//                     'Pname':'TestName',
//                     'Pdesc':'This is a updated description',
//                     'Pstatus':'90'
//                 })
//                 .end(function (err,res) {
//                     res.should.have.status(201);
//                     res.body.should.be.an('object');
//                     done()
//
//                 });
//
//         })
//     })
// });
//
//
// //delete project test
// describe('delete Project', function() {
//     id = 10;
//     it('it should delete the project', function(done) {
//         chai.request(server)
//             .delete('/v1/project/' + id)
//             .end(function(err, res) {
//                 res.should.have.status(201);
//                 res.body.should.have.property('message');
//                 done();
//             })
//     })
//
//
// });



//fetching Project data
// describe('Fetch Project', () => {
//     describe('/GET Project Detail', () => {
//         it('it should GET all the Projects', (done) => {
//             chai.request(server)
//                 .get('/v1/sproject/14')
//                 .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlzaG1ocjJAZ21haWwuY29tIiwiYWNjZXNzTGV2ZWwiOiJhZG1pbiIsImlhdCI6MTU2MjU5MDQ5OSwiZXhwIjoxNTYyNjI2NDk5fQ.QpYCRbLd_bq7gpPgaM2hmVF7Kdx6JFFFuy5u4sbH1OM')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('array');
//                     res.body.should.all.have.property('id');
//                     res.body.should.all.have.property('Pname');
//                     res.body.should.all.have.property('Pdesc');
//                     res.body.should.all.have.property('Pstatus');
//                     res.body.length.should.be.above(0);
//                     done();
//                 })
//         })
//     })
// });



