const express=require('express')
const app = express()
const mongoose=require('mongoose')
var bodyParser = require("body-parser")
const path=require('path')
const users=require('./routes/users')
const auth = require('./routes/auth')
const config=require('config')
const serveStatic=require('serve-static')

mongoose.connect("mongodb://localhost:27017/trial", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})


app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");
app.set("views", path.join(__dirname, "public"));
app.use(serveStatic(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));


app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/assets", express.static("public/assets"));

//showing landing page

app.get("/",(req,res)=>{
  return res.render('index.html')
})
//showing login page
app.get("/login",(req,res)=>{
  return res.render('login.html')
})
//showing registration page
app.get("/register",(req,res)=>{
  return res.render('registration.html')
})



if(!config.get('PrivateKey')){
    console.error('Fatal error:PrivateKey is not defined.');
    process.exit(1)
}

app.use(bodyParser.json()) //support json
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use(express.json());


const port= process.ENV||5000

//server starting

const server=app.listen(port,function(){
console.log(`listen at http://localhost:${port}`)
})

module.exports=server;