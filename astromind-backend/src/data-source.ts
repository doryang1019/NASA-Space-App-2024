import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { ExpoPlanetNode } from "./entity/ExpoPlanetNode"
import { Questions } from "./entity/Questions"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "astro",
    password: process.env.DB_PASSWORD || "Strong@Pwd",
    database: process.env.DB_NAME || "astromind",
    synchronize: false,
    logging: true,
    entities: [User, ExpoPlanetNode, Questions],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})
