import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Noun } from '../models/noun';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';

@Injectable({
  providedIn: 'root'
})
export class NounsService {

  public noun: Noun = new Noun();

  nounsCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
  }

  getRandomNoun():Promise<Noun> {
    const randomID = Math.round(Math.random() * 2972) + 1;
    this.nounsCollection = this.firestore.collection('nouns');
    const nounRef = this.nounsCollection.doc(randomID.toString());
    return new Promise(resolve => {
      nounRef.get().subscribe(noun => { 
        if (noun.exists) {
          let nounAux: Noun = new Noun();
          nounAux.article = noun.get('article');
          nounAux.noun = noun.get('noun');
          nounAux.plural = noun.get('plural');
          nounAux.translation = noun.get('translation');
          this.toLocalStorage(nounAux);
          this.setNoun(nounAux);
          resolve(nounAux);
        }
      })
    })
  }

  setNoun(noun:Noun) {
    this.noun = noun;
    this.toLocalStorage(noun);
  }

  clearNoun() {
    this.noun = new Noun();
    this.removeLocalStorage();
    this.clearAttempts();
  }

  clearAttempts() {
  }

  toLocalStorage(noun:Noun) {
    localStorage.setItem('noun', JSON.stringify(noun));
  }

  fromLocalStorage() {
    this.noun = JSON.parse(localStorage.getItem('noun'));
    return this.noun;
  }

  removeLocalStorage() {
    localStorage.removeItem('noun');
  }
}
