import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";
import { Player } from "src/models/player.model";

@Injectable({
  providedIn: "root",
})
export class GameService {
  game;
  joined = this.socket.fromEvent<any>("joined");
  connection = this.socket.fromEvent<any>("connected");
  ex = this.socket.fromEvent<any>("ex");
  players: Array<Player> = [];

  // Rounds
  started = this.socket.fromEvent<any>("started");
  beginRound = this.socket.fromEvent<any>("begin");
  endRound = this.socket.fromEvent<any>("end");
  constructor(private socket: Socket) {}

  connect() {
    return this.connection.pipe(map((data) => (this.game = data)));
  }

  handleError() {
    return this.ex.pipe(map((data) => (this.game = data)));
  }

  join(playername, gameid) {
    console.log(this.game);
    if (gameid) {
      this.socket.emit("join", { name: playername, game: gameid });
    } else {
      this.socket.emit("join", { name: playername, game: this.game.game.id });
    }
  }

  start() {
    this.socket.emit("start", { game: this.game });
    return this.beginRound.pipe(map((data) => (this.game = data)));
  }
}
