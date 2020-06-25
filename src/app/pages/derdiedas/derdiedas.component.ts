import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Noun } from 'src/app/models/noun';
import { Observable } from 'rxjs';
import { NounsService } from 'src/app/services/nouns.service';

@Component({
  selector: 'app-derdiedas',
  templateUrl: './derdiedas.component.html',
  styles: []
})
export class DerdiedasComponent implements OnInit {

  noun: Noun = new Noun();
  streak: number;
  level:number;
  loading:boolean;
  faSpinner = faSpinner;

  constructor(private nouns: NounsService) { 
    this.loading = true;
    this.getNoun().subscribe(noun => {
      this.noun = noun;
      this.loading = false;
    })
  }

  ngOnInit(): void {
    this.streak = 0;
  }

  nextNoun(event:any) {
    if (event === 'next') {
      this.loading = true;
      this.nouns.clearNoun();
      this.getNoun().subscribe(noun => {
        this.noun = noun;
        this.loading = false;
      })
    }
  }

  getNoun(): Observable<Noun> {
    return new Observable(subscriber => {
      
      if (localStorage.getItem('noun')) {
        subscriber.next(this.nouns.fromLocalStorage());
        subscriber.complete();
      }
      else {;
        this.nouns.getRandomNoun().then(noun => {
          subscriber.next(noun);
          subscriber.complete();
        })
      }
    })
  }

}
