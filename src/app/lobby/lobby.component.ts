import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Subscription } from "rxjs";
import { Player } from "src/models/player.model";
import { ResponsiveService } from "src/app/services/responsive-service.service";

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
  isMobile = false;
  isEmpty() {
    return true;
  }

  mapPlayers(players) {
    this.players = [];
    players.forEach((element) => {
      this.players.push(element);
    });
  }
  constructor(
    private gameService: GameService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.gameService.joined.subscribe((data) =>
      this.mapPlayers(data.game.players)
    );

    this.gameService.endRound.subscribe((data) =>
      this.mapPlayers(data.round.players)
    );

    this.isHost = this.gameService.getIsHost;
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
