import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { Player } from "src/models/player.model";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: "start-dialog",
  templateUrl: "start-dialog.component.html",
})
export class StartDialogComponent implements OnInit {
  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  player: Player = new Player();
  isJoined = false;

  constructor(
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StartDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {
    this.gameService.joined.subscribe(() => this.dialogRef.close(true));
  }

  join() {
    console.log(
      "try to host/join the game: " + this.player.gameid,
      "Player: "+this.player.name
    );
    this.gameService.join(this.player.name, this.player.gameid);
  }
}
