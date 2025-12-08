# ChatXBuy 部落格專案設定

## 套件管理
本專案使用 **pnpm** 作為套件管理器

## 技術架構
- **CMS 後台**: decap-cms 搭建部落格管理後台
- **內容 API**: nuxt-content 作為 query API

## 重要檔案
- `public/admin/index.html` - 包含文章儲存之前的預處理邏輯

## 開發注意事項
- 所有套件安裝使用 `pnpm install`
- 執行腳本使用 `pnpm <script-name>`
