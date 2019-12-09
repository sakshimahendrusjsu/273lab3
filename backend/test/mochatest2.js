var chai = require('chai'), 
chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
var assert = chai.assert;
    
describe('post /access/login ', () => {
    it("Should check credentials and return 200 status code and successful signin message", function(done){
        this.timeout(50000);
        chai.request('http://127.0.0.1:3001')
        .post('/mlogin/login')
        .send({email: "test@last1.com",
        password: "1234567890", 
        type: "buyer"})
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.eq('Successful login');
            expect(res.body).to.have.property('token');
            done();
        });
    })
});

describe('post /access/create ', () => {
    it("Should insert user in DB and return 200 status code and successful signup message", function(done){
        chai.request('http://127.0.0.1:3001')
        .post('/morder/updateStatus')
        .send({ "status": "READY", "id": '5dc0a79e82a764ae8841591f' })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    })
});


describe('post /orders/updateMenuItem', () => {
    it("Should update menu item in DB and return 200 status code and successfully updated menu item message", function(done){
        chai.request('http://127.0.0.1:3001')
        .post('/mres/selectRestuarantByItems')
        .send({ text: 'butter' })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            assert(res.body.message != null)
            done();
        });
    })
});


describe('post /profile/update', () => {
    it("Should update user profile in DB and return 200 status code and successful update message", function(done){
        chai.request('http://127.0.0.1:3001')
        .post('/mres/selectRestuarantByItemsAndCuisine')
        .send({ text: 'butter',cuisine: 'indian' })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.not.have.property('restaurant_name');
            done();
        });
    })
});

describe('post /access/createOwner', () => {
    it("Should create user in DB and return 200 status code and email id already exists message", function(done){
        chai.request('http://127.0.0.1:3001')
        .post('/msec//add')
        .send({ email: "test@last.com",name:'breakfast',id:'5db60b322a9c9ae92c799449',restaurant_name:'khao pio'})
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.not.have.property('restaurant_name');
            done();
        });
    })
});