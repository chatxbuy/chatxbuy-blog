import axios from 'axios';
import { API_URL, CLIENT_ID, USER, HEADERS } from '@/apis/apiConfig';

export const getAllArticles = async (perPage) => {
  const path = '/blog/articles';
  const response = await axios.get(
    `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}&per_page=${perPage}`,
    { HEADERS }
  );
  return response.data.articles;
};

export const getLatestArticles = async (limit) => {
  const path = '/blog/articles/latest';
  const response = await axios.get(
    `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}&limit=${limit}`,
    { HEADERS }
  );
  return response.data.articles;
};

export const getHotArticles = async (limit) => {
  const path = '/blog/articles/hot';
  const response = await axios.get(
    `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}&limit=${limit}`,
    { HEADERS }
  );
  return response.data.articles;
};

export const getSingleArticle = async (id) => {
  const path = `/blog/articles/${id}`;
  const response = await axios.get(
    `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}`,
    { HEADERS }
  );
  return response.data.article;
};

// export const getRelatedArticles = async (id) => {
//   const path = `/blog/articles/${id}/related`;
//   const response = await axios.get(
//     `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}`,
//     { HEADERS }
//   );
//   return response.data.articles;
// };

export const getBlogCategories = async () => {
  const path = '/blog/categories';
  const response = await axios.get(
    `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}`,
    { HEADERS }
  );
  return response.data.categories;
};

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
