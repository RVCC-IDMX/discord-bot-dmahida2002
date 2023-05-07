const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    // Description of the command
    .setDescription('Replies with your input!')
    .addStringOption((option) => option.setName('input')
      .setDescription('The input to echo back')
      // Set the length
      .setMaxLength(25)
      .setRequired(true)),
  async execute(interaction) {
    await interaction.reply(interaction.options.getString('input'));
  },
};
