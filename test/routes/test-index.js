process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../../src/server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('index.js Routes', function(){

  describe('GET /', function(){
    it('should return a view', function(done){
      chai.request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.contain.contain('<h1>Home</h1>');
        done();
      });
    });
  });

  describe('GET /ping', function(){
    it('should return a view', function(done){
      chai.request(app)
      .get('/ping')
      .end(function(err, res){
        res.should.have.status(200);
        res.text.should.contain.equal('pong!');
        done();
      });
    });
  });

});