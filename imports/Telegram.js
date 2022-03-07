'use strict';

module.exports = Telegram;

const Agent = require('socks5-https-client/lib/Agent');

function Telegram(parameters) {
  this.parameters = parameters;

  const TelegramBot = require('node-telegram-bot-api');

  let settings = { polling: true };

  if (this.parameters.config.useProxy) {
    settings.request = {
      agentClass: Agent,
      agentOptions: {
        socksHost: this.parameters.config.socksHost,
        socksPort: this.parameters.config.socksPort,
        socksUsername: this.parameters.config.socksUsername,
        socksPassword: this.parameters.config.socksPassword
      }
    };
  };

  this.bot = new TelegramBot(this.parameters.config.token, settings);

  // pending commands (sent in previous message)
  this.pending = {};

  this.getCmd = function(data) {
    let res = null;

    if (data.entities) {
      data.entities.forEach(element => {
        if (element.type == "bot_command") {
          if (!element.offset) {
            if (this.pending[data.chat.id]) {
              delete this.pending[data.chat.id];
            }

            res = { 
              cmd: data.text.substr(element.offset + 1, element.length - 1).toLowerCase(),
              arg: data.text.substr(element.offset + 1 + element.length).toLowerCase(),
              argRaw: data.text.substr(element.offset + 1 + element.length),
              pending: false
            };

            if (!res.arg) {
              this.pending[data.chat.id] = res.cmd;
            }
          }
        } 
      });
    }

    if (!res) {
      if (this.pending[data.chat.id]) {
        res = { 
          cmd: this.pending[data.chat.id],
          arg: data.text.toLowerCase(),
          argRaw: data.text,
          pending: true
        };

        delete this.pending[data.chat.id];
      }
    }

    return res;
  }
}

Telegram.prototype.sendMessage = function(id, text, opts) {
  this.bot.sendMessage(id, text, opts);
}

Telegram.prototype.parseData = function(data) {
  return {
    chatId: data.chat.id,
    messageId: data.message_id,
    username: data.chat.username,
    name: {
      first: data.chat.first_name,
      last: data.chat.last_name
    },
    text: data.text ? data.text.toLowerCase() : '',
    date: 1556620944,
    cmd: this.getCmd(data),
    raw: data
  };
}

Telegram.prototype.sendDescription = function(chatId) {
  this.bot.sendMessage(chatId, this.parameters.config.info, { parse_mode: "Markdown", disable_web_page_preview: true });
}

Telegram.prototype.sendUnknownCmd = function(chatId) {
  this.bot.sendMessage(chatId, this.parameters.config.unknownCmd, { parse_mode: "Markdown", disable_web_page_preview: true });
}