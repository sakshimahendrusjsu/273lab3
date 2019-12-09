var chai = require('chai'), 
chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
var assert = chai.assert;
    
describe('mongo-kafka test cases ', () => {
    it("Should check credentials and succesfully login with a json web token", function(done){
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

describe('Should able to update order status', () => {
    it("owner should be able to mark the order as delivered", function(done){
        chai.request('http://127.0.0.1:3001')
        .post('/morder/updateStatus')
        .send({ "status": "READY", "id": '5dc0a79e82a764ae8841591f' })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    })
});

describe('Search items in restaurants succesfully', () => {
    it("Should check restaurant id  and return status code with items set", function(done){
        chai.request('http://127.0.0.1:3001')
        .post('/mres/selectRestuarantByItems')
        .send({ text: 'butter' })
        .end(function (err, res) {
            console.log(res.body);
            expect(res).to.have.status(200);
            assert(res.body.message != null)
            done();
        });
    })
});



describe('Should able to filter by cuisine', () => {
    it("filtering should work", function(done){
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


describe('Should able to add a section', () => {
    it("filtering should work", function(done){
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