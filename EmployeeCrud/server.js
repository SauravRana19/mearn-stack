const http = require('node:http')

const {requestHandler} = require('./requestHandler.js')

const server = http.createServer(requestHandler)

const port = 4000;
server.listen(port,()=>{
  console.log("server is running on port " + port + ' successfully')
})