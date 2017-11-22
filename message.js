import slack from '@slack/client';

const WebClient = slack.WebClient;
const token = process.env.SLACK_API_TOKEN || 'xoxp-2160869413-2161113395-275395712468-9b8d9ffcce4ad9687c4c265a4c8fdbbe';
const web = new WebClient(token);

const send = (players, channelID) => {
  const message = `That's Four! ${players.map(player => `🏓 <@${player}> `)}`
  web.chat.postMessage(channelID, message, (err, res) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
    }
  });
}

export {
  send,
};
