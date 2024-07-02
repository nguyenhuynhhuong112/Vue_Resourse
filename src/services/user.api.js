import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, {
      email,
      password,
    });
    return response
  } catch (error) {
    return error;
  }
};

export const loadDataUser = async () => {
  try {
    // const response = await axios.get(
    //   "https://667054bc0900b5f8724a3ee9.mockapi.io/user/user"
    // );
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}get-all-users`
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
export const createUser = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}create-user`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const updateUser = async (id, data) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}update-user/${id}`,
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
      `${import.meta.env.VITE_BASE_URL}delete-user/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
