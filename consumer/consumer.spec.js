const path = require('path');
const { getProducts } = require('./productClient.js');
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
  consumer: 'APIConsumer',
  provider: 'ProductsAPI',
});

const EXPECTED_PRODUCT_LIKE = { 
    id: integer(), // random but between 0 to 10
    name: string()
}; 

describe('Products API', () => {
  describe('When a GET request is made to /products', () => {
    test('it should return all products', async () => {
      provider
        .uponReceiving('a request to all products')
        .withRequest({
          method: 'GET',
          path: '/products',
          headers: { Accept: 'application/json' },
        })
        .willRespondWith({
          status: 200,
          body: eachLike(EXPECTED_PRODUCT_LIKE),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })

      await provider.executeTest(async mockServer => {
        process.env.PROVIDER_API_PORT = mockServer.port
        const products = await getProducts();

        products.forEach(product => { 
          expect(product.id).toBeGreaterThanOrEqual(1);
          expect(product.name).toBeTruthy();
        });
        expect(products.length).toBe(1);
      });
    });
  });
});