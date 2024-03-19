// import { express } from 'express';
import { getProducts } from "./productsClient.js";
import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/health", async function handler(request, response) {
  return {
    consumerPort: process.env.CONSUMER_API_PORT,
    providerPort: process.env.PROVIDER_API_PORT,
  };
});
app.get("/products", async function handler(request, response) {
  const text = await getProducts();
  return text;
});

app.listen({ port: process.env.CONSUMER_API_PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    throw err;
  }
  app.log.info(`Listener on ${address}`);
});
