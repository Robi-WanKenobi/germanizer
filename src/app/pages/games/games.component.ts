import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styles: []
})
export class GamesComponent implements OnInit {

  verbsDescription = 'Conjugate verbs in their trickiest forms';
  nounsDescription = 'Select the correct article for each noun';

  constructor() { }

  ngOnInit(): void {
  }

}
