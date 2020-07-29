import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { Player } from "src/models/player.model";
import { GameService } from "src/app/services/game.service";
import { ResponsiveService } from "src/app/services/responsive-service.service";

@Component({
  selector: "start-dialog",
  templateUrl: "start-dialog.component.html",
})
export class StartDialogComponent implements OnInit {
  player: Player = new Player();
  isJoined = false;
  isMobile = false;
  gameID;

  constructor(
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StartDialogComponent>,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.gameService
      .getJoined()
      .subscribe(
        (data) => (
          this.dialogRef.close(true),
          console.log("joined", data),
          (this.gameID = data.game.id)
        )
      );

    this.gameService
      .getHosted()
      .subscribe(
        (data) => (this.dialogRef.close(true), console.log("hosted", data))
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

  join() {
    console.log(
      "try to join the game: " + this.player.gameid,
      "Player: " + this.player.name
    );
    return this.gameService.join(this.player.name, this.player.gameid);
  }

  host() {
    console.log("try to host new game", "Player: " + this.player.name);
    return this.gameService.host(this.player.name);
  }
}
