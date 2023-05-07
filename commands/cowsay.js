// eslint-disable-next-line import/no-extraneous-dependencies
const cowsay = require('cowsay');
const { SlashCommandBuilder } = require('discord.js');

const animals = ['cow', 'tux', 'turtle', 'moose', 'sheep', 'elephant',
  'whale', 'dragon', 'beavis', 'ghostbusters', 'kitty', 'meow', 'milk', 'stegosaurus',
  'stimpy', 'turkey', 'vader', 'vader-koala', 'koala', 'skeleton', 'ren', 'cheese', 'cower'];

function getCows(error, cowNames) {
  if (error) {
    console.log(error);
  } else if (cowNames) {
    // Empty else if
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    // Description of the command
    .setDescription('Makes a animal ASCII image.')
    .addStringOption((option) => option.setName('say')
      // Description of the message
      .setDescription('What the creature will say')
      .setMaxLength(300)
      .setRequired(true))
    .addStringOption((option) => option.setName('creature')
      .setDescription('Change type of creature')
      .setMaxLength(30)),
  async execute(interaction) {
    const say = interaction.options.getString('say');
    let creature = interaction.options.getString('creature');
    // console.log(creature);
    const list = await cowsay.list(getCows);

    if (creature === null) {
      const randomCreature = animals[Math.floor(Math.random() * animals.length)];
      creature = randomCreature;
    }
    if (list.includes(`${creature}.cow`) || creature === 'cow') {
      if (creature === 'cow') creature = 'fat-cow';
      const myCreat = cowsay.say({
        text: say,
        f: creature,
      }).replaceAll('`', "'");
      if (myCreat.length < 1999) {
        await interaction.reply(`\`\`\`${myCreat}\`\`\``);
      } else {
        await interaction.reply(`The ${creature} will run out of breath! Shorten your message.`);
      }
    } else {
      await interaction.reply(`What the heck is a ${creature}?! Try using a real creature.`);
    }
  },
};
