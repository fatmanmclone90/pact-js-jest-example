const { pactWith } = require ('jest-pact/dist/v3');
const { getProducts } = require('./productClient.js');
const { allProductsResponse } = require('./pact.fixtures.js');

pactWith({ consumer: 'APIConsumer', provider: 'ProductsAPI' }, (interaction) => {
  interaction('When a GET request is made to /products', ({ provider, execute }) => {
    beforeEach(() =>
      provider
        .given('Products exist')
        .uponReceiving('A request for products')
          .withRequest({
          method: 'GET',
          path: '/products',
          headers: { Accept: 'application/json' },
        })
        .willRespondWith(allProductsResponse)
    );

    execute('All products are returned', async (mockServer) => {
      process.env.PROVIDER_API_PORT = mockServer.port;
      const products = await getProducts();

      products.forEach(product => { 
        expect(product.id).toBeGreaterThanOrEqual(1);
        expect(product.name).toBeTruthy();
      });
      expect(products.length).toBe(1);
    })
  });
});