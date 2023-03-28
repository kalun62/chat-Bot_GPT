const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi} = require("openai")
require("dotenv").config();
const token = process.env.BOT_TOKEN;
const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API
})

const openai = new OpenAIApi(configuration)
const bot = new Telegram(token, { polling: true});

bot.on("message", async (msg) => {

	const chatId = msg.chat.id;
	const text = msg.text;
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: text,
		temperature: 0.7,
		max_tokens: 1000,
	})
	const res = response.data.choices[0].text
	bot.sendMessage(chatId, res)
})
