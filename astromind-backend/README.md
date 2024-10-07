# ASTRONMIND Backend

## Feature
- Express
  - NodeJS 12.16.1
- TypeScript
- TSLint

## Project
**backend**
```
.
├── docs                  // swagger document
├── node_modules
├── src
│   ├── controller
│   ├── entity
│   ├── migration
│   ├── model
│   ├── services
│   ├── utils
│   ├── validate
│   ├── index.ts
│   └── routes.ts
├── .editorconfig
├── .env
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

| `npm run <script>` | Description                                                                  |
|--------------------|------------------------------------------------------------------------------|
| `dev`              | initial Node Server                                                          |
| `migrate:up`       | migration up SQL                                                             |
| `migrate:down`     | migration down SQL                                                           |
| `migrate:generate` | compare Entity & Database difference and generate migration sql              |

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
