import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "qes-frontend";
  gameid;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.connect().subscribe((data) => (this.gameid = data.game.id));
    
  }
}
