import axios from "axios";
export const loadDataUser = async () => {
  try {
    const response = await axios.get(
      "https://667054bc0900b5f8724a3ee9.mockapi.io/user/user"
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const createUser = async (data) => {
  try {
    const response = await axios.post(
      "https://667054bc0900b5f8724a3ee9.mockapi.io/user/user",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(
      `https://667054bc0900b5f8724a3ee9.mockapi.io/user/user/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `https://667054bc0900b5f8724a3ee9.mockapi.io/user/user/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
