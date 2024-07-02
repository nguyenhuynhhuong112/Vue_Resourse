import axios from "axios";

export const loadDataProduct = async () => {
  try {
    // const response = await axios.get(
    //   "https://6671626fe083e62ee43b5f5b.mockapi.io/product/product"
    // );
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}product`);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}create-product`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}product/${id}`,
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
      `${import.meta.env.VITE_BASE_URL}product/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
