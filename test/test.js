let assert=require("chai").assert;
let expect=require("chai").expect;
let chai=require("chai")
let chaiHttp=require("chai-http")
let server=require("../index")
let should = require("chai").should()
chai.use(chaiHttp)

//landing page

describe("Landing page",function(){
it("Redirect to index.html",function(done){
    chai.request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })

})

//redirect to login page

describe("login page",function(){
    it("redirect to login",function(done){
        chai.request(server)
            .get('/login')
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            })
    })
})


//redirect to register page

describe("Register",function(){
    it("redirect to regiser page",function(done){
        chai.request(server)
            .get("/register")
            .end((err,res)=>{
                res.should.status(200)
                done();
            })

    })
})