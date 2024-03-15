var express = require("express");

var app = express();

app.get("/health", async (req, res, next) => {
    return res.json({
        providerPort: process.env.PROVIDER_API_PORT
    });
});
app.get("/products", async (req, res, next) => {
    const text = await getProducts();
    return res.json(text);
});
app.get("/products/:id", async (req, res, next) => {
    const text = await getProduct(req.params.id);
    return res.json(text);
});
app.listen(process.env.PROVIDER_API_PORT, () => {
 console.log(`Provider running on port ${process.env.PROVIDER_API_PORT}`);
});

async function getProduct(id) {
return {
    id: parseInt(id),
    name: 'Fork'
}};

async function getProducts() {
    return [
        {
            id: 1,
            name: "Fork"
        },
        {
            id: 2,
            name: "Spoon"
        },
        {
            id: 3,
            name: "Knife"
        },
        {
            id: 4,
            name: "Spork"
        }
    ]
};

module.exports = {
  app
};