import axios from "axios";

export async function getProducts() {
  const response = await axios.get(
    `http://localhost:${process.env.PROVIDER_API_PORT}/products`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return response.data;
}