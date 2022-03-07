const config = {
	debug: true,
	telegram: {
		// Send debug messages to admin telegram chat?
		debug: true,
		// Create bot with @BotFather and paste bot token here
		token: 'YOUR_TELEGRAM_BOT_TOKEN',
		// Bot description that shows when you send /start or /help to your bot
		info: "Бот для распознавания голосовых сообщений в групповых или приватных чатах. Просто добавьте бота в чат или отправьте ему сообщение.\nИсходный код бота https://github.com/ATAMAH/voicebot",
		// text that wiil be sent if bot haven't this command
		unknownCmd: "Неизвестная команда. Используйте /help для просмотра списка команд.",
		// Use a SOCKS proxy?
		useProxy: false,
		socksHost: '0.0.0.0',
		socksPort: 8080,
		socksUsername: 'login',
		socksPassword: 'password'
	},
	voice: {
		// max voice message duration for recognition in seconds
		max_duration: 60,
		// https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started-speech-to-text?tabs=windowsinstall%2Cterminal&pivots=programming-language-rest
		token: 'YOUR_AZURE_TOKEN',
		// e.g. 'ru-RU' or 'en-US'
		locale: 'ru-RU',
		// e.g. 'francecentral'
		region: 'YOUR_AZURE_REGION'
	}
}

module.exports = config;