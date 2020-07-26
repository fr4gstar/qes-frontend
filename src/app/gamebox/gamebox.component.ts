import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Question } from "src/models/question.model";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { ResponsiveService } from "src/app/services/responsive-service.service";

@Component({
  selector: "app-gamebox",
  templateUrl: "./gamebox.component.html",
  styleUrls: ["./gamebox.component.scss"],
})
export class GameboxComponent implements OnInit {
  question: Question = new Question();
  round;
  isGameRunning = false;
  isRoundRunning = false;
  isMobile = false;

  color: ThemePalette = "primary";
  mode: ProgressSpinnerMode = "determinate";
  timeLeft: number = 100;
  interval = setInterval(() => {
    if (this.timeLeft >= 6.66) {
      this.timeLeft = this.timeLeft - 6.66;
      console.log(this.timeLeft);
    } else {
      this.timeLeft = 100;
    }
  }, 1000);

  constructor(
    private gameService: GameService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.gameService.beginRound.subscribe(
      (data) => (
        (this.question = data.question),
        (this.isGameRunning = true),
        (this.isRoundRunning = true),
        console.log(data),
        this.startTimer()
      )
    );
    this.gameService.answered.subscribe((data) => console.log(data));
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
  answer(answerID) {
    this.gameService.answer(answerID);
  }

  startTimer() {
    this.timeLeft = 100;
  }
}
