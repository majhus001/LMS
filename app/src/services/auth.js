import axios from "axios";
import { ENDPOINTS } from "../api/Endpoints";
import { storeToken, storeUser } from "../utils/storage";

export const Login = async (email, password) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, {
      email,
      password,
    });

    const { token, user } = response.data;

    await storeToken(token);
    await storeUser(user);

    console.log("Login successful");
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const Register = async (name, email, password, role) => {
  try {
    const response = await axios.post(ENDPOINTS.REGISTER, {
      name,
      email,
      password,
      role,
    });
    console.log("Registration successful:", response.data);
    return response.data; // Return the response data for further processing
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
