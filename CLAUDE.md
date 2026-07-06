# CLAUDE.md — chatxbuy-blog 速覽卡

## 定位

ChatXBuy（代買幫）主站（`../officailwebsite`，`chatxbuy.com`）的**部落格子站**，獨立部署於 `blog.chatxbuy.com`。只負責文章頁面渲染與部落格 sitemap；內建 Decap CMS（`/admin`）供編輯人員發文。詳見 `.claude/CLAUDE.md`（既有的架構備忘）與 `README.md`（完整說明）。

## 技術棧摘要

Nuxt `^3.17.2` + `@nuxt/content ^3.5.1`（Markdown 內容查詢）+ `@nuxtjs/sitemap` + Tailwind CSS v4（`@tailwindcss/vite`）。套件管理器固定 **pnpm**（`packageManager: pnpm@10.20.0`），只有 `pnpm-lock.yaml`，不要用 npm/yarn。實際版本一律以 `package.json` 為準。

## 目錄重點

- `content/blog/*.md` — 文章來源，schema 見 `content.config.ts`（`articleId`、`draft`、`title`、`cover`、`date`、`tags`、`pinned`）
- `pages/page/blogPage/[slug].vue` — 文章內頁路由 `/page/blogPage/:articleId`
- `server/middleware/blog-redirect.ts` — 舊網址格式 301 轉址到新格式
- `server/api/articles/{latest,all,pinned,related}.ts` — 文章查詢 API
- `server/api/__sitemap__/urls.ts` — sitemap 來源
- `public/admin/` — Decap CMS 後台（`config.yml` 由部署腳本依環境覆寫，不進版控）
- `apis/` — 對外部服務的呼叫封裝（見下方整合點）

## 開發／部署指令

- 開發：`pnpm install` → `pnpm dev`
- 建置：`pnpm build`；產生內容：`pnpm generate`（Docker build 兩者皆會執行）
- 部署：正式機以 `deploy-if-updated.sh`（cron 排程）偵測 `origin/main` 有新 commit 時，`git pull` → 覆寫 `public/admin/config.yml`（複製自 `config.prod.yml`）→ `docker-compose up --build -d`。容器對外埠 `3003`。

## 與其他 ChatXBuy 服務的整合點

- **主站連結／CORS 白名單**：環境變數 `VITE_CHATXBUY_HOST`（`.env`，未納入版控）
  - `components/AppHeader.vue:6`、`components/AppFooter.vue:3`、`pages/page/blogPage/[slug].vue:6` — 用於連回主站首頁
  - `server/middleware/cors.ts:6` — 作為 CORS 允許來源
- **匯率查詢**：`apis/exchangeRate.js:5` 呼叫 `https://purchasebizapi.herokuapp.com/GetExchangeRate`，由 `components/AppHeader.vue` 顯示於頁首
- **部落格訂閱**：`apis/blog.js:5` 呼叫 n8n webhook `https://n8n.transferhelper.com/webhook/chatxbuy_subscribe`，由 `components/BlogSubscribeDesktop.vue` 觸發
- **Messenger 導流**：`components/AppHeader.vue` 內 `goChatbot()` 開啟 `https://m.me/chatXbuy`（帶 `utm_ref`）

## 注意事項

- 修改程式碼前先確認是否影響 Decap CMS 的 `content.config.ts` schema（欄位為必填，CMS 表單與 schema 需同步）
- `public/admin/config.yml` 不要直接改版控內容，正式環境由部署腳本覆寫
