/* ═══════════════════════════════════════════════════════ //
=> If you want to recode, reupload,
=> or copy the codes/script,
=> pls give credit,
=> no credit? i will take action immediately.
==> Copyright (C) 2022 Dark_Ezio.
==> Licensed under the  MIT License;
===> you may not use this file except in compliance with the License.
=> Thank you to Lord Buddha, Family and Myself.
=> Whats Bot - Dark_Ezio.
// ════════════════════════════ */

const yts = require("yt-search");
const ezio = require("../events");
const lang = ezio.getString("scrapers");

ezio.addCommand(
  {
    pattern: ["play-list", "song-list", "ytplay-list"],
    desc: lang.SONG_DESC,
    sucReact: "🔎",
    category: ["search", "all"],
  },
  async (message, client) => {
    if (!message.forPattern.text) {
      global.catchError = true;
      return await client.sendErrorMessage(
        message.client.jid,
        lang.NEED_TEXT_SONG,
        message.key,
        message
      );
    }

    try {
      const results = await yts(message.forPattern.text);
      let result = results.videos;
      let rows = []
      result.map(video =>{
        let obj = {
          title: video.title,
          rowId: `play x/65v79 ${video.videoId}`,
          description: video.description,
        };
        rows.push(obj)
      })
      const sections = [
        {
          title: "Videos",
          rows: rows,
        },
      ];

      const listMessage = {
        text: "Youtube Search Results",
        footer: ezio.jsonConfig.footer,
        title: "Whats Bot MD V5",
        buttonText: "Click Me",
        sections,
      };

      await client.sendMessage(message.client.jid, listMessage);
      global.catchError = true;
    } catch (error) {
      global.catchError = true;
      return await client.sendErrorMessage(
        message.client.jid,
        error,
        message.key,
        message
      );
    }
  }
);
