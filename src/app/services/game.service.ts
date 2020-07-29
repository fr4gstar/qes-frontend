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
  isHost = false;

  // Rounds
  started = this.socket.fromEvent<any>("started");
  beginRound = this.socket.fromEvent<any>("begin");
  endRound = this.socket.fromEvent<any>("end");
  answered = this.socket.fromEvent<any>("answered");

  constructor(private socket: Socket) {}

  connect() {
    return this.connection.pipe(map((data) => (this.game = data)));
  }

  getIsHost() {
    return this.isHost;
  }

  handleError() {
    return this.ex.pipe(map((data) => (this.game = data)));
  }

  join(playername, gameid) {
    console.log("join game: ", this.game);
    if (gameid) {
      this.socket.emit("join", { name: playername, game: gameid });
    } else {
      this.isHost = true;
      this.socket.emit("host", { name: playername });
    }
  }

  start() {
    this.socket.emit("start", { game: this.game.game.id });
    console.log("start game with ID: ", this.game.game.id);
  }

  answer(answerID) {
    this.socket.emit("answer", { answer: answerID });
    console.log("answer with id", answerID);
  }
}
