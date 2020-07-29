import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Subscription } from "rxjs";
import { Player } from "src/models/player.model";
import { ResponsiveService } from "src/app/services/responsive-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit {
  private _docSub: Subscription;
  @Input() gameID;
  isGameRunning = false;
  isHost = false;
  players: Array<Player> = [];
  currentPlayer: Player = new Player();
  colors = ["teal", "orange", "primary", "rgb(138, 16, 117)"];
  isMobile = false;

  mapPlayers(players) {
    this.players = [];
    players.forEach((element) => {
      this.players.push(element);
    });
    if (players.length == 1) {
      this.currentPlayer = this.players[0];
      this.isHost = true;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  constructor(
    private gameService: GameService,
    private responsiveService: ResponsiveService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.gameService.getJoined().subscribe(
      (data) => (
        this.mapPlayers(data.game.players),
        this.openSnackBar("Player joined!", null),
        (this.gameID = data.game.id)
      )
    );

    this.gameService.endRound.subscribe((data) =>
      this.mapPlayers(data.round.players)
    );

    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        this.isMobile = true;
        console.log("Mobile device detected");
      } else {
        this.isMobile = false;
        console.log("Desktop detected");
      }
    });
    this.onResize();
  }
  onResize() {
    this.responsiveService.checkWidth();
  }

  start() {
    console.log("try to start game: ");
    this.gameService.start();
    this.isGameRunning = true;
  }
}
