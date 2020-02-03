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
    serverRun = server.listen(3010, done);
});

after(done => {
    serverRun.close(done);
});





//update note test
// describe('Note', function(){
//     describe('update Note ', function(){
//         id = 2;
//         it('it should update the Note', function(done){
//             chai.request(server)
//                 .put('/v1/note/' + id)
//                 .send({
//                     'Nname':'testUpdatedname',
//                     'Ndesc':'This is a updated description',
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


// delete project test
// describe('delete Note', function() {
//     id = 4;
//     it('it should delete the Note', function(done) {
//         chai.request(server)
//             .delete('/v1/note/' + id)
//             .end(function(err, res) {
//                 res.should.have.status(201);
//                 res.body.should.have.property('message');
//                 done();
//             })
//     })
//
//
// });

