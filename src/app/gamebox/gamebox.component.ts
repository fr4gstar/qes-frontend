import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Question } from "src/models/question.model";

@Component({
  selector: "app-gamebox",
  templateUrl: "./gamebox.component.html",
  styleUrls: ["./gamebox.component.scss"],
})
export class GameboxComponent implements OnInit {
  question: Question = new Question();
  round;
  isGameRunning = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.beginRound.subscribe(
      (data) => this.question = data.question,
      () => (this.isGameRunning = true)
    );
    this.gameService.answered.subscribe(
      (data) => console.log(data)
    );
  }

  answer(answerID) {
    this.gameService.answer(answerID);
  }
}
