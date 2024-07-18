import axios from "axios";

async function loadDataProduct() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}product/get-all-products`
    );
    return response.data.result;
  } catch (error) {
    return error;
  }
}

async function createProduct(data) {
  const { productName, price, type, website } = data;
  const body = {
    productName,
    price,
    type,
    website,
  };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}product/create-product`,
      body
    );
    return response;
  } catch (error) {
    return error;
  }
}

async function updateProduct(id, body) {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}product/update-product/${id}`,
      body
    );
    return response;
  } catch (error) {
    return error;
  }
}

async function deleteProduct(id) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}product/delete-product/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export default { loadDataProduct, createProduct, updateProduct, deleteProduct };
