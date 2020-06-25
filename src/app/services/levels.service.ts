import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  level: number;

  constructor() {
    this.fromLocalStorage();
  }

  setLevel(level:number){
    this.level = level;
    this.toLocalStorage();
  }

  clearLevel() {
    this.level = 0;
    this.removeLocalStorage();
  }
  
  getLevel() {
    return this.level;
  }

  fromLocalStorage() {
    this.level = Number(localStorage.getItem('level'));
  }

  removeLocalStorage() {
    localStorage.removeItem('level');
  }

  toLocalStorage() {
    localStorage.setItem('level', this.level.toString());
  }
}
