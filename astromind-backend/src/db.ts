import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { ExpoPlanetNode } from "./entity/ExpoPlanetNode"
import { AppDataSource } from "./data-source"

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize()
        console.info("Data Source has been initialized!")
    } catch (err) {
        console.error("Error during Data Source initialization", err)
        throw err
    }
}
