var express = require("express");

var app = express();
app.get("/products", async (req, res, next) => {
    const text = await GetProducts();
    return res.json(text);
});
app.listen(3001, () => {
 console.log("Provider running on port 3001");
});

async function GetProducts() {
    return ["Tony","Lisa","Michael","Ginger","Bob"];
};