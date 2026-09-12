import dotenv from "dotenv"
import { resolve } from "node:path"

if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: resolve("config/.env.development")
    })
}

export const PORT = process.env.PORT || 3000
export const DB_URI = process.env.DB_URI
export const SECRET_KEY = process.env.SECRET_KEY
export const ENCRYPTION_KEY_ENV = process.env.ENCRYPTION_KEY_ENV
export const SALTROUNDS = +process.env.SALTROUNDS
export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY