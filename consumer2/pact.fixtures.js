const { MatchersV3 } = require('@pact-foundation/pact');

const {
  atLeastLike,
  eachLike,
  like,
  integer,
  string,
} = MatchersV3;

const EXPECTED_PRODUCT = { 
    id: 1,
    name: 'Fork'
}; 

const singleProductResponse = {
    status: 200,
    body: EXPECTED_PRODUCT,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

module.exports = {
  singleProductResponse,
};