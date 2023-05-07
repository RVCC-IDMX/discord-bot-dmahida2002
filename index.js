// Require the necessary discord.js classes
const {
  Client, Collection, Events, GatewayIntentBits, EmbedBuilder,
} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

// eslint-disable-next-line no-restricted-syntax
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'danger') {
    const dangerEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('THE CONSEQUENCES OF CLICKING ME!!')
      .setAuthor({ name: 'Kalkulus II', iconURL: 'https://sd.keepcalms.com/i/keep-calm-and-love-kalkulus-ii.png' })
      .setDescription('NOW! Solve 100 integrals.')
      .setImage('https://media.cheggcdn.com/media/867/8674e29f-0cc9-4a37-b7aa-d79ae21a511e/phpN2ihNr.png')
      .setTimestamp()
      .setFooter({ text: 'YOU MUST PASS ALL INTEGRALS!', iconURL: 'https://sd.keepcalms.com/i/keep-calm-and-love-kalkulus-ii.png' });
    await interaction.channel.send({ embeds: [dangerEmbed] });
    await interaction.update({ content: 'Kalk II', components: [] });
  }
});

// Log in to Discord with your client's token
client.login(token);
