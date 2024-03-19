const { pactWith } = require ('jest-pact/dist/v3');
const { getProduct } = require('./productClient.js');
const { singleProductResponse } = require('./pact.fixtures.js');

pactWith({ consumer: 'APIConsumer2', provider: 'ProductsAPI', logDir : "./pact/pacts" }, (interaction) => {
  interaction('When a GET request is made to /products/{:Id}', ({ provider, execute }) => {
    beforeEach(() =>
      provider
        .given('Product exists')
        .uponReceiving('A request for products')
          .withRequest({
          method: 'GET',
          path: '/products/1',
          headers: { 'Accept': 'application/json' },
        })
        .willRespondWith(singleProductResponse)
    );

    execute('it should return a single product', async (mockServer) => {
      process.env.PROVIDER_API_PORT = mockServer.port;

      const product = await getProduct(1);

      expect(product).toEqual(singleProductResponse.body);
    })
  });
});
