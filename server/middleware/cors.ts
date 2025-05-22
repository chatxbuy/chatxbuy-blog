import * as dotenv from 'dotenv';

dotenv.config();

export default defineEventHandler((event) => {
  const ORIGIN = process.env.VITE_CHATXBUY_HOST ?? '';

  event.node.res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  event.node.res.setHeader('Access-Control-Allow-Methods', 'GET');
  event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理 OPTIONS 預檢請求
  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204; // No Content
    return;
  }
});
