import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { StartDialogComponent } from "./start-dialog/start-dialog.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "qes-frontend";
  gameid;

  constructor(public dialog: MatDialog, private gameService: GameService) {}

  ngOnInit() {
    this.gameService.connect().subscribe((data) => this.gameid = data.game.id) ;
    this.gameService.handleError().subscribe((data) => console.log(data)) ;
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "75%";
    dialogConfig.height = "30%";

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(StartDialogComponent, dialogConfig);
  }
}
