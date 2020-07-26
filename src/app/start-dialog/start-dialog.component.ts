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

  constructor(
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StartDialogComponent>,
    private responsiveService: ResponsiveService
  ) {

  }

  ngOnInit() {
    this.gameService.joined.subscribe(() => this.dialogRef.close(true));
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
      "try to host/join the game: " + this.player.gameid,
      "Player: " + this.player.name
    );
    this.gameService.join(this.player.name, this.player.gameid);
  }
}
