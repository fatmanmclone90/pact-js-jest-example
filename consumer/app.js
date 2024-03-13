var express = require("express");
const axios = require('axios');

var app = express();
app.get("/products", async (req, res, next) => {
    const text = await GetProducts();
    return res.json(text);
});
app.get("/products/:id", async (req, res, next) => {
    const text = await GetProduct(req.params.id);
    return res.json(text);
});
app.listen(3000, () => {
 console.log("Consumer running on port 3000");
});

async function GetProducts() {
    
    const response = await axios.get('http://localhost:3001/products');
    return response.data;
};

async function GetProduct(id) {
    const response = await axios.get(`http://localhost:3001/products/${id}`);
    return response.data;
}