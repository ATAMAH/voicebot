# Telegram voice recognition bot
Node.js bot for telegram messenger based on Microsoft Azure [Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/Speech-Service/speech-to-text) and [Node.js Telegram Bot API](https://www.npmjs.com/package/node-telegram-bot-api).

Works in group and private chats. Send or forward message to chat with bot and it will response with recognised text if success.

### Installation

```sh
$ git clone https://github.com/ATAMAH/voicebot.git
$ cd voicebot
$ npm install
```
Change parameters in config.js file and

```sh
$ node server.js
```

Working example https://t.me/mumbletotextbot

# Бот распознавания голосовых сообщений для телеграма
Написан на Node.js, использует Microsoft Azure [Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/Speech-Service/speech-to-text) для распознавания голоса и [Node.js Telegram Bot API](https://www.npmjs.com/package/node-telegram-bot-api) для работы с АПИ телеграма. 

Работает в групповых и приватных чатах. Отправьте или перешлите боту голосовое сообщение и он ответит распознанным текстом, если сможет распознать.

### Установка

```sh
$ git clone https://github.com/ATAMAH/voicebot.git
$ cd voicebot
$ npm install
```
Поменяйте параметры в файле config.js и выполните

```sh
$ node server.js
```


### Зачем?

- Зачем это нужно? В телеграме уже есть боты с таким функционалом.
- У бота с распознаванием голосовых сообщений в групповых чатах есть доступ ко всем сообщениям. Поэтому владельцы таких ботов имеют доступ не только чату, в котором находится их бот, но и ко списку пользователей этого чата и всем действиям в нём, а так же имеют возможность публиковать рекламу  и политическую пропаганду от лица бота, оправдывая это "взломами". Советую выбросить из групповых чатов всех ботов, которых вы не хостите сами или тот, кому вы абсолютно доверяете (мне верить нельзя).

