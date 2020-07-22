import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";
import { Player } from "src/models/Player.model";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
  private _docSub: Subscription;
  @Input() gameid;

  players: Array<Player> = [
    { id: "1", name: "", score: "0", gameid: "" },
    { id: "2", name: "", score: "0", gameid: "" },
    { id: "3", name: "", score: "0", gameid: "" },
    { id: "4", name: "", score: "0", gameid: "" },
  ];

  isGameRunning() {
    return false;
  }

  isEmpty() {
    return true;
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  join(player: Player) {
    console.log("try to join", player.name);
    this.gameService
      .join(player.name, player.gameid)
      .subscribe((data) => (console.log(data)));
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }
}
