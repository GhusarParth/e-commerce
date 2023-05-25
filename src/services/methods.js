import axios from "axios";
import AxiosCreator, { nodeApiUrl } from "./httpServices";

export const GET = async (url) => {
  try {
    const res = await AxiosCreator.get(url);
    return res.data;
  } catch (error) {
    console.log("🚀 ~ file: methods.js:8 ~ GET ~ error:", error);
    throw error;
  }
};

export const POST = async (url, payload) => {
  try {
    const res = await AxiosCreator.post(url, payload);
    return res.data;
  } catch (error) {
    console.log("🚀 ~ file: methods.js:8 ~ GET ~ error:", error);
    throw error;
  }
};

export const FORM_DATA_POST = async (url, payload) => {
  console.log("🚀 ~ file: methods.js:25 ~ constFORM_DATA_POST= ~ url:", url);
  try {
    const res = await axios({
      method: "post",
      url: `${nodeApiUrl}${url}`,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage?.getItem("accessToken") || "",
      },
    });
    console.log("form data res", res);
    return res.data;
  } catch (error) {
    console.log("🚀 ~ file: methods.js:8 ~ GET ~ error:", error);
    throw error;
  }
};

export const PUT = async (url, payload) => {
  try {
    const res = await AxiosCreator.put(url, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const DELETE = async (url) => {
  try {
    const res = await AxiosCreator.delete(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
