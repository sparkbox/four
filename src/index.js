import express from 'express';
import bodyParser from 'body-parser';

import Game from'./game';
import { send } from './message';

const app = express();
const PORT = process.env.PORT || 3000;
let game = null;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Four! Active'));

app.post('/', (req, res) => {
  if (req.body.challenge) return res.send(req.body.challenge);

  let result = null;
  const event = req.body.event;
  console.log(event);

  if (event) {
    if (!game) game = new Game(event.item.ts);

    if (event.type === 'reaction_added') {
      result = game.add(event);
    }
    if (event.type === 'reaction_removed') {
      game.remove(event);
    }

    console.log(`Players: ${game.players}\n`);

    if (result) {
      send(game.players, event.item.channel);
      game = null;
    }
  }
});

app.listen(PORT, () => console.log(`Four! listening on port ${PORT}!`));
