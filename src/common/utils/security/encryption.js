import crypto from "node:crypto"
import { ENCRYPTION_KEY_ENV } from "../../../../config/config.env.js"

const ALGORITHM = "aes-256-cbc"

const ENCRYPTION_KEY = crypto
    .createHash("sha256")
    .update(ENCRYPTION_KEY_ENV)
    .digest()

export const encrypt = (text) => {
    if (!text) return null

    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        iv
    )

    let encrypted = cipher.update(
        text.toString(),
        "utf8",
        "hex"
    )

    encrypted += cipher.final("hex")

    return `${iv.toString("hex")}:${encrypted}`
}

export const decrypt = (text) => {
    if (!text) return null

    const [ivHex, encryptedText] = text.split(":")

    if (!ivHex || !encryptedText) {
        throw new Error("invalid encrypted data")
    }

    const iv = Buffer.from(ivHex, "hex")

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        iv
    )

    let decrypted = decipher.update(
        encryptedText,
        "hex",
        "utf8"
    )

    decrypted += decipher.final("utf8")

    return decrypted
}