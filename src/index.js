import express from 'express';
import bodyParser from 'body-parser';

import Game from './game';
import { send } from './message';

const app = express();
const PORT = process.env.PORT || 3000;
let game = null;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Four! Active'));

app.post('/', (req, res) => {
  if (req.body.challenge) return res.send(req.body.challenge);

  let four = null;
  const event = req.body.event;

  if (event) {
    if (!game) {
      console.log('Starting a new game...');
      game = new Game(event.item.ts);
      console.log(game);
    }

    if (event.type === 'reaction_added') {
      four = game.add(event);
    }
    if (event.type === 'reaction_removed') {
      game.remove(event);
    }

    if (four) {
      send(game.players, event.item.channel);
      game = null;
    }
  }

  res.send(200);
});

app.listen(PORT, () => console.log(`Four! listening on port ${PORT}!`));
