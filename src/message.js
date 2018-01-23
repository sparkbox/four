import slack from '@slack/client';

const WebClient = slack.WebClient;
const token = process.env.SLACK_API_TOKEN;
const web = new WebClient(token);

const send = (players, channelID) => {
  const message = `That's Four! ${players.map(player => `🏓 <@${player}> `)}`;
  web.chat.postMessage(channelID, message, (err, res) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
    }
  });
};

export { send };
