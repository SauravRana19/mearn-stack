const express = require('express')
const studentRouter = express.Router()
const books = require('../StudentsBooks/studentsBooks')


studentRouter.get('/',(req,res)=>{
    res.send('student Routing enter')
})

studentRouter.get('/books',(req,res)=>{
    res.json(books)
})

module.exports = studentRouter