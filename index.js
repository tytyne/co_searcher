const express=require('express')
const app = express()
const mongoose=require('mongoose')
const users=require('./routes/users')
const auth=require('./routes/auth')
const config=require('config')

mongoose.connect('mongodb://localhost/searcher')
    .then(()=>console.log('Now you are connected to mongodb'))
    .catch(err=>console.log('something went wrong',err))


if(!config.get('privateKey')){
    console.error('Fatal error:privateKey is not defined.');
    process.exit(1)
}


app.use('/api/users',users);
app.use('api/auth',auth);
app.use(express.json());


const port= process.ENV||5000
app.listen(port,() =>{
console.log(`listen at http://localhost:${port}`)
})