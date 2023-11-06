import instance from "./instace";

export const login = async (user: any) => {
  try {
    return await instance.post("/auth/login", user);
  } catch (error) {
    console.error(error);
  }
};

export const register = async (user: any) => {
  try {
    return await instance.post("/auth/register", user);
  } catch (error) {
    console.error(error);
  }
};
