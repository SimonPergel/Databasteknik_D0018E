const http = require('http')
const port = 3000

const server = http.createServer(function(req, res) {
res.write('Its working baby')
res.end()
})


server.listen(port, function(error) {
        if (error){
                console.log('somthing went wrong', error)
        
        } else {
                console.log('Server is listenning on port ' + port)
        }
})

