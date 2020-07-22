import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GameService {
  //currentDocument = this.socket.fromEvent<Document>("document");
  game = this.socket.fromEvent<any>("connected");
  joined = this.socket.fromEvent<any>("joined");
  gameid;
  constructor(private socket: Socket) {}

  getGame() {
    return this.game;
  }

  connect() {
    this.socket.emit("connect");
    return this.getGame().pipe(map((data) => this.gameid = data));
  }

  join(playername, gameid) {
    this.socket.emit("join", { name: playername, game: this.gameid.game.id });
    return this.joined.pipe(map((data) => this.gameid = data));
  }

  getPlayers(id: string) {
    this.socket.emit("getPlayers", id);
  }

  newPlayer() {
    this.socket.emit("addPlayer", { id: this.playerId(), doc: "" });
  }

  private playerId() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
