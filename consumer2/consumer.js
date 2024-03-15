var express = require("express");
const { getProduct } = require('./productClient.js');

var app = express();

app.get("/health", async (req, res, next) => {
    return res.json({
        consumerPort: process.env.CONSUMER_2_API_PORT,
        providerPort: process.env.PROVIDER_API_PORT
    });
});

app.get("/products/:id", async (req, res, next) => {
    const text = await getProduct(req.params.id);
    return res.json(text);
});
app.listen(process.env.CONSUMER_2_API_PORT, () => {
 console.log(`Consumer running on port ${process.env.CONSUMER_2_API_PORT}`);
});