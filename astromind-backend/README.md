# WiMRnDNS Backend

## Feature
- Express
  - NodeJS 12.16.1
- TypeScript
- TSLint

## 套件
![](https://i.imgur.com/iuMG1Xb.png)

## Project
**backend**
```
.
├── docs                  // swagger document
├── node_modules
├── public                // 掛載前端頁面，前端打包好的js, html
├── ssl                   // .pem for https
├── src
│   ├── config
│   |   ├── database.ts   // typeorm主要設定檔
│   |   └── migration.ts  // typeorm設定檔，for migration script
│   ├── controller        // 解析API傳進的參數，並呼叫Service
│   ├── entity            // typeorm定義資料表及資料欄位
│   ├── middleware        // Route使用的Middleware
│   ├── migration         // typeorm migration用
│   ├── model             // DB CRUD
│   ├── services          // API主要商業邏輯
│   ├── utils
│   ├── validate          // API parameter validation
│   ├── index.ts          // Node Server主程式
│   └── routes.ts         // API Routes
├── .editorconfig
├── .env                  // 預設環境變數
├── .gitignore
├── Dockerfile
├── nodemon.json
├── README.md
├── tsconfig.json
├── tslint.json
├── package-lock.json
└── package.json

```

## Script

| `npm run <script>` | 說明                                                                         |
|--------------------|------------------------------------------------------------------------------|
| `dev`              | 開發用，啟動Node Server在 3000 port，包含前端頁面及API      |
| `build`            | 編譯Typescript並輸出到 out 資料夾下                       |
| `start`            | 部署環境啟動Node Server用，執行編譯後out資料夾底下程式        |
| `migrate:up`       | 執行migration up SQL                                    |
| `migrate:down`     | 執行migration down SQL                                  |
| `migrate:generate` | 比較Entity與Database差異，並產生migration sql             |

## How to use typeorm CLI?

1. run `npx typeorm -h` to show list of available commands

## Migration

### Create Migration

1. npx typeorm migrate:create -n "migration_name"
2. Find the file with timestamp and write migrations into `up`, `down` function

### Generate Migration

1. npm run migrate:generate

### Run Migration

1. npm run migrate:up

### Revert Migration

1. npm run migrate:down
