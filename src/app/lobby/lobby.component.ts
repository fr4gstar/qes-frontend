import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Subscription } from "rxjs";
import { Player } from "src/models/player.model";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit {
  private _docSub: Subscription;
  @Input() gameid;

  players: Array<Player> = [];

  isGameRunning() {
    return false;
  }

  isEmpty() {
    return true;
  }
  mapPlayers(players) {
    this.players = [];
    players.forEach((element) => {
      this.players.push(element);
    });
  }
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.joined.subscribe((data) =>
      this.mapPlayers(data.game.players)
    );
    this.gameService.started.subscribe((data) => console.log(data));
  }

  start() {
    console.log("try to start game: ");
    this.gameService.start();
  }
}
