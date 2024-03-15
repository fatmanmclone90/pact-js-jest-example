const axios = require('axios');

async function getProduct(id) {
    const response = await axios.get(`http://localhost:${process.env.PROVIDER_API_PORT}/products/${id}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
    
    return response.data;
}

module.exports = {
  getProduct
};