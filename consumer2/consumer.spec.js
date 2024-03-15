const path = require('path');
const { getProduct } = require('./productClient.js');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const {
  atLeastLike,
  eachLike,
  like,
  integer,
  string,
} = MatchersV3;

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'APIConsumer2',
  provider: 'ProductsAPI',
});

const EXPECTED_PRODUCT = { 
    id: 1,
    name: 'Fork'
}; 

describe('Products API', () => {
  describe('When a GET request is made to /products/{:Id}', () => {
    test('it should return a single product', async () => {
      provider
        .uponReceiving('a request to for a product')
        .withRequest({
          method: 'GET',
          path: '/products/1', // should this be hard coded?
          headers: { Accept: 'application/json' },
        })
        .willRespondWith({
          status: 200,
          body: EXPECTED_PRODUCT,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });

      await provider.executeTest(async mockServer => {
        process.env.PROVIDER_API_PORT = mockServer.port
        const product = await getProduct(1);

        expect(product).toEqual(EXPECTED_PRODUCT);
      });
    });
  });
});