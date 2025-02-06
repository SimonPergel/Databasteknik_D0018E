// loads the built in http - module
const http = require('http')  
const port = 3000
// this Node.js code creates a simple HTTP server using the built in http module 
// function inside createServer handles incoming request and responses 
const server = http.createServer(function(req, res) {
res.write('Its working baby') // sends response to client 
res.end() // signals that the rsponse is completed
})

// this starts the server and listening for incoming connections
server.listen(port, function(error) {
        if (error){
                console.log('somthing went wrong', error)
        
        } else {
                console.log('Server is listenning on port ' + port)
        }
})

