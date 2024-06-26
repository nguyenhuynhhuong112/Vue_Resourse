import axios from "axios";
export const loadDataUser = async () => {
  const response = await axios.get(
    "https://667054bc0900b5f8724a3ee9.mockapi.io/user/user"
  );
  return response.data;
};
