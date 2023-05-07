const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buttons')
    .setDescription('Replies with buttons!'),
  async execute(interaction) {
    const dangerButton = new ButtonBuilder()
      .setCustomId('danger')
      .setLabel('DO NOT CLICK ME!!')
      .setStyle(ButtonStyle.Danger);
    const link = new ButtonBuilder()
      .setLabel('My repo')
      .setURL('https://github.com/RVCC-IDMX/discord-bot-dmahida2002')
      .setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder()
      .addComponents(dangerButton, link);
    await interaction.reply({
      content: "CLICK ON THE BUTTON!! Also, here are a few commands I have... Slash command '/echo' replies with your input. Slash command '/ping' replies with Pong. Slash command '/secretping' replies with Secret Pong, but only the user who invoked the command can see the reply. Slash command '/server' provides information about the server. Slash command '/user' provides information about the user who ran the command in the server.",
      components: [row],
    });
  },
};
