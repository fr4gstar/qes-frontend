import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  players = [{"name":"siggi_smallz", "score": "500"}, {"name":"MJ", "score": "1000"}, {"name":"Skanny", "score": "200"}, {"name":"Franky", "score": "300"}]

  constructor() { }

  ngOnInit(): void {
  }

}
