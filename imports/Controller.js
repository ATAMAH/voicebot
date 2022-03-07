'use strict';

module.exports = Controller;

const path     = require('path');
const Telegram = require(path.resolve( __dirname, './Telegram'));
const Voice    = require(path.resolve( __dirname, './Voice'));
const axios    = require('axios');

var debugOut;

function Controller(parameters) {
  this.parameters = parameters;
  debugOut = this.parameters.debug;

  this.voice = new Voice(parameters);

  this.telegram = new Telegram({
    config: this.parameters.config.telegram
  });

  this.telegram.bot.on('message', (msg) => {
    debugOut(`# Got message:\n${JSON.stringify(msg)}`);

    let data = this.telegram.parseData(msg);

    this.processTelegramData(data);
  });

  // Definition for commands functions
  this.commands = {
    // commands for all users
    start: function(data, controller) {
      if (!data.cmd.pending) {
        controller.telegram.sendDescription(data.chatId);
      }
    },
    help: function(data, controller) {
      if (!data.cmd.pending) {
        controller.telegram.sendDescription(data.chatId);
      }
    }
  };
}

Controller.prototype.processTelegramData = async function(data) {
  if (data.cmd) {
    if (this.commands[data.cmd.cmd]) {
      this.commands[data.cmd.cmd](data, this);
    }
    else {
      this.telegram.sendUnknownCmd(data.chatId);
    }
  }
  else {
    if (data.raw.voice) {
      if (data.raw.voice.duration > this.parameters.config.voice.max_duration) {
        return;
      }

      let link = await this.telegram.bot.getFileLink(data.raw.voice.file_id);

      debugOut(`# Got file link ${link}`);

      let file = await axios.get(link, {
        responseType: 'arraybuffer'
      });

      if (file.status != 200) {
        debugOut(`# Failed to dowload file ${data.raw.voice.file_id}`);

        return;
      }

      let filedata = file.data;

      let text = await this.voice.request({
        mime: data.raw.voice.mime_type,
        data: filedata
      });

      if (text) {
        debugOut(`# Recognized message with dutaion ${data.raw.voice.duration} seconds`);

        this.telegram.sendMessage(
          data.chatId, 
          text, 
          { reply_to_message_id: data.messageId,
            reply_markup: { remove_keyboard: true }, 
            parse_mode: "HTML", 
            disable_web_page_preview: true});
      }
    }
  }
};