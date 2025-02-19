fetch('http://localhost:5201/api/mycontroller/getproductsadmin')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));