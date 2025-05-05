const http = require('node:http')
const url = require('url')

const requestHandler = (req,res)=>{
  const passedUrl = url.parse(req.url,true)
  const reqMethod = req.method
  const writeSuccessHead = (statusCode, statusText, contentType) => {
    res.writeHead(statusCode, statusText, { 'Content-Type': contentType })
  }
  
  if(passedUrl.pathname == '/' && reqMethod == 'GET'){
    writeSuccessHead(200, 'OK', 'text/plain');
    res.end("Welcome to Routing Dashboard Module")
  }
  else if(passedUrl.pathname == '/home' && reqMethod == 'GET'){
    writeSuccessHead(200, 'OK', 'text/plain');
    res.end("Welcome to Routing Home Module")
  }
  else if(passedUrl.pathname == '/contact' && reqMethod == 'GET'){
    writeSuccessHead(200, 'OK', 'text/plain');
    res.end("Welcome to Routing Contact Module")
  }
  else if(passedUrl.pathname == '/about' && reqMethod == 'GET'){
    writeSuccessHead(200, 'OK', 'text/plain');
    res.end("Welcome to Routing About Module")
  }else{writeSuccessHead(404, 'Not Found', 'text/plain')
    res.end('404 Not Found')
  }
}

const server = http.createServer(requestHandler)

const port = 4000;
server.listen(port,()=>{
  console.log("server is running on port " + port + ' successfully')
})