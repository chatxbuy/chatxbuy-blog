# ChatXBuy Blog（代買幫部落格 CMS）

ChatXBuy（代買幫）跨境代購平台旗下的**部落格子站**，獨立部署於 `blog.chatxbuy.com`，是主站 `../officailwebsite`（`chatxbuy.com`）的子專案。負責提供所有文章頁面、部落格專用 sitemap，並內建 [Decap CMS](https://decapcms.org/) 作為後台編輯介面，供內容編輯人員無需碰程式碼即可發布文章。

## 核心功能

- 以 Nuxt Content 讀取 `content/blog/**/*.md` 的 Markdown 文章，渲染成文章頁（`/page/blogPage/:slug`）
- 內建 `/admin` 後台（Decap CMS），透過 GitHub backend 直接編輯並提交 Markdown 文章
- 自動產生部落格專用 sitemap（`/api/__sitemap__/urls`）
- 舊網址格式（`/blog/{id}-{title}`、`/page/blogPage/{id}-{title}`）301 轉址至新格式 `/page/blogPage/{id}`
- 文章頁與 Header/Footer 透過 `VITE_CHATXBUY_HOST` 連回主站（chatxbuy.com）
- Header 顯示即時匯率（呼叫代買幫既有的匯率 API）、部落格訂閱表單（呼叫 n8n webhook）

## 技術棧

版本一律以 `package.json` 為準，以下為目前查證到的版本：

| 項目 | 版本 |
| --- | --- |
| Nuxt | `^3.17.2` |
| @nuxt/content | `^3.5.1` |
| @nuxtjs/sitemap | `7.3.0` |
| Vue | `^3.5.13` |
| Vue Router | `^4.5.1` |
| Tailwind CSS | `^4.1.5`（透過 `@tailwindcss/vite`） |
| axios | `^1.9.0` |
| @nuxt/eslint | `1.3.0`（devDependency） |
| Node（Docker build image） | `22-alpine`（見 `Dockerfile`） |
| 套件管理器 | `pnpm@10.20.0`（見 `package.json` `packageManager` 欄位） |

> 詳細相依套件與確切版號請直接查看 `package.json`。

## 目錄結構

```
apis/            對外部 API 的呼叫封裝（匯率查詢、部落格訂閱）
components/      共用元件（AppHeader、AppFooter、Breadcrumbs、訂閱表單等）
content/blog/    部落格文章來源（Markdown，Decap CMS 編輯後寫入此處）
content.config.ts  Nuxt Content 的 collection schema 定義（blog collection）
layouts/         版面配置（default.vue）
pages/           路由頁面
  index.vue                     首頁
  page/blogPage/[slug].vue      文章內頁（/page/blogPage/:slug）
public/admin/    Decap CMS 後台靜態資源與環境設定（config.local/prod/yml）
server/
  api/articles/    文章查詢 API（latest / all / pinned / related）
  api/__sitemap__/ sitemap URL 產生邏輯
  middleware/       blog-redirect（舊網址 301 轉址）、cors（依 VITE_CHATXBUY_HOST 設定允許來源）
utils/           共用工具函式
scripts/         輔助腳本（如批次補 description）
```

## 本機開發

套件管理器固定使用 **pnpm**（`package.json` 已鎖定 `packageManager: pnpm@10.20.0`，且僅提供 `pnpm-lock.yaml`）。

```bash
# 安裝依賴（會自動觸發 postinstall: nuxt prepare）
pnpm install

# 啟動開發伺服器（預設 http://localhost:3000）
pnpm dev

# 建置正式版
pnpm build

# 產生靜態內容（Nuxt Content 需要，Docker build 也會執行此步）
pnpm generate

# 本機預覽 build 後的結果
pnpm preview
```

其餘 `package.json` 中定義的 script：`update-blog`（`git pull && git push dev`，用於同步部落格內容分支）。

環境變數（`.env`，未納入版控）：`VITE_CHATXBUY_HOST`，用於串接主站網址（Header/Footer 連結、CORS 允許來源）。

## 部署

正式環境採 **Docker 多階段建置 + docker-compose**，並由 cron 排程的 shell script 偵測 GitHub 是否有新 commit 來觸發自動部署。

### Dockerfile（多階段建置）

1. **Build stage**：`node:22-alpine`，`corepack enable` 後以 `pnpm i` 安裝依賴，接著執行 `pnpm generate && pnpm build`
2. **Runtime stage**：`node:22-alpine`，只複製 build stage 產出的 `.output/` 目錄，設定 `PORT=3003`、`HOST=0.0.0.0`，以 `node /app/server/index.mjs` 啟動（Nitro server）

### docker-compose.yml

- 服務名稱：`cms`
- 以當前目錄的 `Dockerfile` build image
- 對外開放連接埠 `3003:3003`
- `restart: always`，環境變數 `NODE_ENV=production`

### 自動部署腳本（`deploy-if-updated.sh`）

部署主機上以此腳本（搭配排程，如 cron）偵測更新並自動重新部署，流程如下：

1. `cd /home/happy/chatxbuy-blog`
2. `git fetch origin`，比對本機 `HEAD` 與 `origin/main` 的 commit hash
3. 若有差異：
   - `git checkout main && git pull`
   - 複製正式環境設定：`cp public/admin/config.prod.yml public/admin/config.yml`（`config.yml` 已被 `.gitignore` 排除，需依環境覆寫）
   - `docker-compose up --build -d` 重新建置並啟動容器
4. 若無差異：僅印出 `No update.`，不做任何動作

## Decap CMS 後台

- 後台入口：`/admin`（對應 `public/admin/index.html`）
- Backend 設定：GitHub repo `navibluer/chatxbuy-blog`，分支 `main`（見 `public/admin/config.yml`）
- 依環境切換設定檔：`config.local.yml` / `config.prod.yml`，部署時由 `deploy-if-updated.sh` 複製為實際生效的 `config.yml`
- 文章 collection 對應 `content/blog/`，每篇文章的 identifier 為 `articleId`
