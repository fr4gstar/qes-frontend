import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Question } from "src/models/question.model";
import { ThemePalette } from "@angular/material/core";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { ResponsiveService } from "src/app/services/responsive-service.service";
import { GalleryItem, ImageItem } from "@ngx-gallery/core";

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

  images: GalleryItem[];
  color: ThemePalette = "primary";
  mode: ProgressBarMode = "determinate";
  timeLeft: number = 100;
  interval = null;

  constructor(
    private gameService: GameService,
    private responsiveService: ResponsiveService
  ) {}

  mapImages(images) {
    this.images = [];
    if (images) {
      images.forEach((element) => {
        console.log(
          "pushing image:",
          this.images.push(new ImageItem({ src: element, thumb: element }))
        );
        console.log(this.images);
      });
    }
  }

  ngOnInit(): void {
    
    this.gameService.beginRound.subscribe(
      (data) => (
        (this.question = data.question),
        (this.round = data.round),
        (this.isGameRunning = true),
        (this.isRoundRunning = true),
        this.mapImages(data.question.images),
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
    this.interval = setInterval(() => {
      if (this.timeLeft >= 100000 / this.round.duration) {
        this.timeLeft = this.timeLeft - 6.66;
        console.log(this.timeLeft);
      } else {
        this.timeLeft = 100;
      }
    }, 1000);
  }
}
