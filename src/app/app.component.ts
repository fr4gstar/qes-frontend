import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { StartDialogComponent } from "./start-dialog/start-dialog.component";
import { ResponsiveService } from "src/app/services/responsive-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "qes-frontend";
  gameID;
  isMobile = false;

  constructor(
    public dialog: MatDialog,
    private gameService: GameService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.gameService.connect().subscribe((data) => console.log(data));
    
    this.gameService.getJoined().subscribe(
      (data) => (
        console.log("joined", data),
        (this.gameID = data.game.id)
      )
    );

    this.gameService.handleError().subscribe((data) => console.log(data));

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
    this.openDialog();
  }

  onResize() {
    this.responsiveService.checkWidth();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    if (!this.isMobile) {
      dialogConfig.width = "75%";
      dialogConfig.height = "30%";
    } else {
      dialogConfig.width = "100%";
      dialogConfig.maxHeight = "75%";
    }
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(StartDialogComponent, dialogConfig);
  }
}
