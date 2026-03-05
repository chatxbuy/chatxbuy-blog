# ChatXBuy 部落格專案設定

## 專案架構

- 本專案是主專案 `../officailwebsite`（網域：chatxbuy.com）的子專案
- 本專案網域：**blog.chatxbuy.com**
- 本專案只負責：提供所有文章頁面、部落格專用的 sitemap
- `robots.txt` 由主專案管理，不在本專案範圍內

## 套件管理

本專案使用 **pnpm** 作為套件管理器

## 技術架構

- **CMS 後台**: decap-cms 搭建部落格管理後台
- **內容 API**: nuxt-content 作為 query API
- **Sitemap**: @nuxtjs/sitemap 產生部落格專用 sitemap

## 重要檔案

- `public/admin/index.html` - 包含文章儲存之前的預處理邏輯
- `server/api/__sitemap__/urls.ts` - sitemap URL 來源
- `pages/page/blogPage/[slug].vue` - 文章頁面

## 開發注意事項

- 所有套件安裝使用 `pnpm install`
- 執行腳本使用 `pnpm <script-name>`
