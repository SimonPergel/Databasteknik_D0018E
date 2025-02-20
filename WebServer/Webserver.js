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

// Array of routes to forward requests to corresponding API

// 
const routes = [
    { method: 'get', path: '/getproductsadmin', target: 'getproductsadmin' },
    { method: 'get', path: '/getproductsuser', target: 'getproductsuser' },
    { method: 'get', path: '/insertuser', target: 'insertuser' },
    { method: 'get', path: '/running', target: 'running' },  // This should forward to the correct backend API
    { method: 'get', path: '/balanceusermath', target: 'balanceusermath' },
    { method: 'get', path: '/insertproduct', target: 'insertproduct' },
    { method: 'get', path: '/notForSale', target: 'notForSale' },
    { method: 'get', path: '/forSale', target: 'forSale' },
    { method: 'get', path: '/insertintocart', target: 'insertintocart'},
    { method: 'get', path: '/deletefromcart', target: 'deletefromcart'},
    { method: 'get', path: '/updatecarts', target: 'updatecarts'},
    { method: 'get', path: '/addproductquantity', target: 'addproductquantity'},
    { method: 'get', path: '/depleteproductquantity', target: 'depleteproductquantity'},
    // Add other routes as needed
];

// Dynamically create the routes
routes.forEach(route => {
    app[route.method](route.path, async (req, res) => {
        try {
            // Construct the full URL of the backend API
            const url = `http://localhost:5201/api/mycontroller/${route.target}`;
            console.log(`Forwarding request to: ${url}`);  // Debugging log to see where the request is going
            const response = await axios.get(url, { params: req.query });  // Pass the query params to the target
            res.json(response.data);  // Send the response from the target API back to the client
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