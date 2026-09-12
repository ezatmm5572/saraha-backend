import OpenAI from "openai"
import { OPENROUTER_API_KEY } from "../../../config/config.env.js"

const openai = new OpenAI({
    apiKey: OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
})

export const analyzeMessages = async (messages = []) => {

    const messagesContent = messages
        .map((message) => message.content)
        .join("\n")

    const response = await openai.chat.completions.create({
        model: "openrouter/free",
        messages: [
            {
                role: "system",
                content: `
You analyze anonymous feedback messages.

Return ONLY valid JSON.
Do not return markdown.
Do not use \`\`\`json.

The JSON must follow exactly this structure:

{
    "summary": "string",
    "sentiment": {
        "positive": number,
        "neutral": number,
        "negative": number
    },
    "topics": ["string"],
    "commonWords": ["string"]
}

Rules:
- positive + neutral + negative must equal 100.
- Analyze only the provided messages.
- Do not invent information.
- summary should be short.
- topics should contain the main subjects discussed.
- commonWords should contain important repeated words or descriptions.
`
            },
            {
                role: "user",
                content: `
Analyze these messages:

${messagesContent}
`
            }
        ]
    })

    return JSON.parse(
        response.choices[0].message.content
    )
}