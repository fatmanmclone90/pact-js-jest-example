var express = require("express");
const { getProducts} = require('./productClient.js');

var app = express();

app.get("/health", async (req, res, next) => {
    return res.json({
        consumerPort: process.env.CONSUMER_API_PORT,
        providerPort: process.env.PROVIDER_API_PORT
    });
});
app.get("/products", async (req, res, next) => {
    const text = await getProducts();
    return res.json(text);
});

app.listen(process.env.CONSUMER_API_PORT, () => {
 console.log(`Consumer running on port ${process.env.CONSUMER_API_PORT}`);
});