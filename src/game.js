import { send } from './message';

class Game {
  constructor(ts) {
    this.ts = ts;
    this.players = [];
  }

  add(event) {
    const { reaction, item, item_user } = event;

    if (reaction === 'ping' && item.ts === this.ts) {
      if (!this.players.includes(item_user)) {
        this.players.push(item_user);
      }
    }

    return this.players.length === 4;
  }

  remove(event) {
    const { reaction, item, item_user } = event;

    if (reaction === 'ping' && item.ts === this.ts) {
      this.players = this.players.filter(player => player !== item_user);
    }
  }
}

export default Game;
