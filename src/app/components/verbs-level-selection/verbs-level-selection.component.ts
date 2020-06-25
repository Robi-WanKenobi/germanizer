import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-verbs-level-selection',
  templateUrl: './verbs-level-selection.component.html',
  styles: []
})
export class VerbsLevelSelectionComponent implements OnInit {

  value: number;
  
  constructor(private level: LevelsService,
              private router: Router) {
    this.value = this.level.getLevel()? this.level.getLevel() : 1;
    this.level.setLevel(this.value);
  }

  ngOnInit(): void {
  }
  
  setLevel(level:number) {
    this.value = level;
    this.level.setLevel(this.value);
  }

  start() {
    this.router.navigateByUrl('/verbs/practice');
  }

}
