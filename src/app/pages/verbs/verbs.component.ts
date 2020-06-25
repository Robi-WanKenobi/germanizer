import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { Verb } from 'src/app/models/verb';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styles: []
})
export class VerbsComponent implements OnInit {

  verb: Verb = new Verb();
  level:number;
  levelLabel:string;
  loading:boolean;
  faSpinner = faSpinner;
  constructor(private router: Router,
              private firebase: FirebaseService) {
    if (!localStorage.getItem('level') ||
    (localStorage.getItem('level') !== '1' &&
    localStorage.getItem('level') !== '2' &&
    localStorage.getItem('level') !== '3' &&
    localStorage.getItem('level') !== '4')) {
      this.firebase.clearVerb();
      this.router.navigateByUrl('/verbs');
    }
    else {
      this.loading = true;
      this.getVerb().subscribe(verb => {
        this.verb = verb;
        this.loading = false;
      })
    }
    this.level = Number(localStorage.getItem('level'));

    if (this.level === 1) {
      this.levelLabel = 'Beginner';
    }
    if (this.level === 2) {
      this.levelLabel = 'Intermediate';
    }
    if (this.level === 3) {
      this.levelLabel = 'Advanced';
    }
    if (this.level === 4) {
      this.levelLabel = 'Expert';
    }
  }

  ngOnInit(): void {
  }

  nextVerb(event:any) {
    if (event === 'next') {
      this.loading = true;
      this.firebase.clearVerb();
      this.getVerb().subscribe(verb => {
        this.verb = verb;
        this.loading = false;
      })
    }
  }

  getVerb(): Observable<Verb> {
    return new Observable(subscriber => {
      
      if (localStorage.getItem('verb')) {
        subscriber.next(this.firebase.fromLocalStorage());
        subscriber.complete();
      }
      else {;
        this.firebase.getRandomVerb().then(verb => {
          subscriber.next(verb);
          subscriber.complete();
        })
      }
    })
  }

}
