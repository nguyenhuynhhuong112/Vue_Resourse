import axios from "axios";

export const loadDataProduct = async () => {
  try {
    const response = await axios.get(
      "https://6671626fe083e62ee43b5f5b.mockapi.io/product/product"
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axios.post(
      "https://6671626fe083e62ee43b5f5b.mockapi.io/product/product",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(
      `https://6671626fe083e62ee43b5f5b.mockapi.io/product/product/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `https://6671626fe083e62ee43b5f5b.mockapi.io/product/product/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
