import axios from "axios";
import { HEADERS } from "@/apis/apiConfig";

export const getExchangeRate = async () => {
  const apiUrl = "https://purchasebizapi.herokuapp.com/GetExchangeRate";
  const response = await axios.post(apiUrl, { HEADERS });
  return response.data;
};
