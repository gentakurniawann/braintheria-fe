import axios from "@/lib/axios";
import { TPayloadLogin, TResponseLogin, TResponseMe } from "@/types";

export async function login(data: TPayloadLogin): Promise<TResponseLogin> {
  try {
    const response = await axios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error from login: ", error);
    throw error;
  }
}

export async function logout(): Promise<TResponseLogin> {
  try {
    const response = await axios.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error from logout: ", error);
    throw error;
  }
}

export async function getMe(): Promise<TResponseMe> {
  try {
    const response = await axios.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error from getMe: ", error);
    throw error;
  }
}
