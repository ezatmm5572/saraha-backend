import { OPENROUTER_API_KEY } from "../config/config.env.js"

import bootstrap from "./app.controller.js"

bootstrap()

console.log(
    OPENROUTER_API_KEY
        ? "OpenRouter key loaded"
        : "OpenRouter key missing"
)