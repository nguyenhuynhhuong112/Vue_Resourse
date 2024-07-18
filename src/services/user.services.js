import axios from "axios";

async function loginUser(email, password) {
  try {
    const body = {
      email,
      password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}user/login`,
      body
    );
    return response;
  } catch (error) {
    return error;
  }
}

async function loadDataUser() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}user/get-all-users`
    );
    return response.data.result;
  } catch (error) {
    return error;
  }
}

async function createUser(data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}user/create-user`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}

async function updateUser(id, data) {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}user/update-user/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}

async function deleteUser(id) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}user/delete-user/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export default {
  loginUser,
  loadDataUser,
  createUser,
  updateUser,
  deleteUser,
};
