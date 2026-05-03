import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Token stored successfully");
  } catch (error) {
    console.log("Error storing token:", error);
  }
};

export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("User stored successfully");
  } catch (error) {
    console.log("Error storing user:", error);
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeAuthData = async () => {
  await AsyncStorage.multiRemove(["token", "user"]);
};