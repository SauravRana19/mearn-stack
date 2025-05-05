
const express = require('express')
const studentModule = require('./studentRouting')
const Authanticates = require('./middleware')
const app = express()
const port = 8080
// Middleware to parse JSON
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('welcome to the Express routing')
})
app.use('/student',Authanticates, studentModule)

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})