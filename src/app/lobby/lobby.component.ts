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
  isGameRunning = false;

  players: Array<Player> = [];
  isHost;
  colors = ["teal", "orange", "primary", "rgb(138, 16, 117)"];
  
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

    this.gameService.endRound.subscribe((data) =>
      this.mapPlayers(data.round.players)
    );

    this.isHost = this.gameService.getIsHost;
  }

  start() {
    console.log("try to start game: ");
    this.gameService.start();
    this.isGameRunning = true;
  }
}
