const { MatchersV3 } = require('@pact-foundation/pact');

const {
  atLeastLike,
  eachLike,
  like,
  integer,
  string,
} = MatchersV3;

const EXPECTED_PRODUCT_LIKE = { 
    id: integer(), // random but between 0 to 10
    name: string()
}; 

const allProductsResponse = {
    status: 200,
    body: eachLike(EXPECTED_PRODUCT_LIKE),
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

module.exports = {
  allProductsResponse,
};