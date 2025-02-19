/*

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

*/

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Array of routes to forward requests to corresponding API

// 
const routes = [
    { method: 'get', path: '/getproductsadmin', target: 'getproductsadmin' },
    { method: 'get', path: '/getproductsuser', target: 'getproductsuser' },
    { method: 'get', path: '/insertuser', target: 'insertuser' },
    { method: 'get', path: '/running', target: 'running' },  // This should forward to the correct backend API
    { method: 'get', path: '/balanceusermath', target: 'balanceusermath' },
    { method: 'put', path: '/insertproduct', target: 'insertproduct' },
    { method: 'get', path: '/notForSale', target: 'notForSale' },
    { method: 'get', path: '/forSale', target: 'forSale' },
    // Add other routes as needed
];

// Dynamically create the routes

routes.forEach(route => {
    app[route.method](route.path, async (req, res) => {
        try {
            const url = `http://localhost:5201/api/mycontroller/${route.target}`;
            console.log(`Forwarding request to: ${url}`);  // Log to see where the request is going

            if (route.method === 'get') {
                // For GET requests, forward query parameters
                const response = await axios.get(url, { params: req.query });
                res.json(response.data);  // Return the data from backend
            } else if (route.method === 'post') {
                // For POST requests, forward the request body
                const response = await axios.post(url, req.body);
                res.json(response.data);  // Return the data from backend
            } else if (route.method === 'put') {
                // For PUT requests, forward the request body
                console.log("Forwarding PUT request with body:", req.body);
                const response = await axios.put(url, req.body);
                console.log("heres the returning body", response.data);
                res.json(response.data);  // Return the data from backend
            }
        } catch (error) {
            console.error('Error:', error.message);  // Log the error if something goes wrong
            res.status(500).json({ error: `Error fetching data from ${route.target}` });
        }
    });
});


// Start the Express server
app.listen(3000, () => {
    console.log("Node.js server running on port 3000");
});