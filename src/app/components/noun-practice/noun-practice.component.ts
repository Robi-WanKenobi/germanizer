import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Noun } from 'src/app/models/noun';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-noun-practice',
  templateUrl: './noun-practice.component.html',
  styles: []
})
export class NounPracticeComponent implements OnInit {

  @Input() noun: Noun = new Noun();
  nounForm: FormGroup;
  @Output() nextNoun: EventEmitter<string> = new EventEmitter();
  next = false;
  answer: string;
  @Input() streak: number;

  constructor() { }

  ngOnInit(): void {
  }

  check(article:string) {
    this.answer = article;
    if (this.noun.article.toLowerCase().trim() === article.toLowerCase().trim()) {
        this.next = true;
    }
  }

  toNext() {
    this.nextNoun.emit('next');
  }

}
