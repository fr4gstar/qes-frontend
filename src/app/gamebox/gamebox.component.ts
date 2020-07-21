import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gamebox',
  templateUrl: './gamebox.component.html',
  styleUrls: ['./gamebox.component.scss']
})
export class GameboxComponent implements OnInit {

  question = [{ "category": "Entertainment: Video Games", "type": "multiple", "difficulty": "hard", "question": "In the indie farming game &quot;Stardew Valley&quot;, which NPC hates the &quot;prismatic shard&quot; item when received as a gift?", "correct_answer": "Haley", "incorrect_answers": ["Abigail ", "Elliott", "Lewis"] }]

  constructor() { }

  ngOnInit(): void {
  }

}
