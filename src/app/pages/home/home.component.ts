import { Component, OnInit } from '@angular/core';
import { LevelsService } from 'src/app/services/levels.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(target:string) {
    this.router.navigateByUrl(target);
  }

}
