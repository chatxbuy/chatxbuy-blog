import axios from 'axios';
import { HEADERS } from '@/apis/apiConfig';

export const subscribeBlog = async ({ nickName, email }) => {
  const apiUrl = 'https://n8n.transferhelper.com/webhook/chatxbuy_subscribe';
  const response = await axios.post(
    apiUrl,
    {
      email,
      nick_name: nickName,
    },
    { HEADERS }
  );

  return response;
};
