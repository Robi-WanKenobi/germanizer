import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Verb, VerbToCheck, Result } from '../models/verb';
import { LevelsService } from './levels.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private verbsCollection: AngularFirestoreCollection;
  public verb: Verb = new Verb();
  private attempts = 0;

  constructor(private firestore: AngularFirestore,
              private level: LevelsService) {
    this.verb = this.fromLocalStorage();
  }

  getRandomVerb():Promise<Verb> {
    let level = this.level.getLevel();
    let collection = '';
    let max_value = 0;
    let isRegular = false;
    const randomLevel = (Math.random());
    if (level === 1) {
      if (randomLevel <= 0.5) {
        collection = 'common_regular_verbs'
        max_value = 287;
        isRegular = true;
      } else {
        collection = 'common_irregular_verbs'
        max_value = 195;
      }
    } else if (level === 2) {
      if (randomLevel <= 0.33) {
        collection = 'common_regular_verbs'
        max_value = 287;
        isRegular = true;
      } else {
        collection = 'common_irregular_verbs'
        max_value = 195;
      }
    } else if (level === 3) {
      if (randomLevel < 0.125) {
        collection = 'uncommon_regular_verbs'
        max_value = 6428;
        isRegular = true;
      } else if (randomLevel >= 0.125 && randomLevel < 0.25) {
        collection = 'uncommon_irregular_verbs'
        max_value = 1137;
      } else if (randomLevel >= 0.25 && randomLevel <= 0.625) {
        collection = 'common_regular_verbs'
        max_value = 287;
        isRegular = true;
      } else {
        collection = 'common_irregular_verbs'
        max_value = 195;
      }
    } else if (level === 4) {
      if (randomLevel < 0.25) {
        collection = 'uncommon_regular_verbs'
        max_value = 6428;
        isRegular = true;
      } else if (randomLevel >= 0.25 && randomLevel < 0.5) {
        collection = 'uncommon_irregular_verbs'
        max_value = 1137;
      } else if (randomLevel >= 0.5 && randomLevel <= 0.75) {
        collection = 'common_regular_verbs'
        max_value = 287;
        isRegular = true;
      } else {
        collection = 'common_irregular_verbs'
        max_value = 195;
      }
    }
    const randomID = Math.round(Math.random() * max_value) + 1;
    this.verbsCollection = this.firestore.collection(collection);
    const verbRef = this.verbsCollection.doc(randomID.toString());
    return new Promise(resolve => {
      verbRef.get().subscribe(verb => {
        if (verb.exists) {
          let verbAux: Verb = new Verb();
          verbAux.infinitiv = verb.get('infinitiv');
          verbAux.present_first = verb.get('present_first');
          verbAux.present_second = verb.get('present_second');
          verbAux.present_third = verb.get('present_third');
          verbAux.preteritum_first = verb.get('preteritum_first');
          verbAux.partizip = verb.get('partizip');
          verbAux.konjuntiv_first = verb.get('konjuntiv_first');
          verbAux.imperativ_singular = verb.get('imperativ_singular');
          verbAux.imperativ_plural = verb.get('imperativ_plural');
          verbAux.helper = verb.get('helper');
          verbAux.isTrennbar = verb.get('isTrennbar');
          verbAux.isRegular = isRegular;
          this.toLocalStorage(verbAux);
          this.setVerb(verbAux);
          resolve(verbAux);
        }
      })
    })
  }

  setVerb(verb:Verb) {
    this.verb = verb;
    this.toLocalStorage(verb);
  }

  clearVerb() {
    this.verb = new Verb();
    this.removeLocalStorage();
    this.clearAttempts();
  }

  clearAttempts() {
    this.attempts = 0;
  }

  toLocalStorage(verb:Verb) {
    localStorage.setItem('verb', JSON.stringify(verb));
  }

  fromLocalStorage() {
    this.verb = JSON.parse(localStorage.getItem('verb'));
    return this.verb;
  }

  removeLocalStorage() {
    localStorage.removeItem('verb');
  }

  check(verbToCheck:VerbToCheck):Promise<Result> {
    const presentThirdResult = this.getResult(verbToCheck.present_third, this.verb.present_third);
    const preteritumFirstResult = this.getResult(verbToCheck.preteritum_first, this.verb.preteritum_first);
    const perfectFirstResult = this.getResult(verbToCheck.perfect_first, this.getPerfect());

    let result: Result = {
      presentThirdResult: presentThirdResult,
      preteritumFirstResult: preteritumFirstResult,
      perfectFirstResult: perfectFirstResult,
      next: false
    }

    if (result.presentThirdResult && result.preteritumFirstResult && result.perfectFirstResult) {
      if (presentThirdResult.value+preteritumFirstResult.value+perfectFirstResult.value === 3) {
        result.next = true;
      }
      else {
        this.attempts++;
      }
    }
    result.attempts = this.attempts;

    return new Promise(resolve => resolve(result));
  }

  private resultToClass(result:number) {
    if (result === 1) {
        return 'correct';
    }
    else if (result >= 0.4) {
        return 'medium';
    }
    else if (result >= 0){
        return 'wrong';
    }
    else {
      return '';
    }
  }

  private getResult(verbToCheck:string, checker:string) {
    let verbToCheckSubs = this.getSubstrings(verbToCheck.toLowerCase().trim());
    let checkerSubs = this.getSubstrings(checker.toLowerCase().trim());
    let result = 0;
    let word = verbToCheck.toLowerCase();;
    checkerSubs.forEach(substring => {
      if (verbToCheckSubs.includes(substring)) {
          result++;
      }
    });
    result = (result / (checkerSubs.length+verbToCheckSubs.length - result));
    const firstResult = result;

    // Check result with 'ss' => 'ß'
    if ( result!==1 && word.includes('ss')) {
      let wordAux = word.replace('ss', 'ß');
      verbToCheckSubs = this.getSubstrings(wordAux);
      result = 0;
      checkerSubs.forEach(substring => {
        if (verbToCheckSubs.includes(substring)) {
            result++;
        }
      });
      result = (result / (checkerSubs.length+verbToCheckSubs.length - result));
      if (result > firstResult) {
        word = wordAux;
      }
    }

    // Check result with 'ae' => 'ä'
    if ( result!==1 && word.includes('ae')) {
      let wordAux = word.replace('ae', 'ä');
      verbToCheckSubs = this.getSubstrings(wordAux);
      result = 0;
      checkerSubs.forEach(substring => {
        if (verbToCheckSubs.includes(substring)) {
            result++;
        }
      });
      result = (result / (checkerSubs.length+verbToCheckSubs.length - result));
      if (result > firstResult) {
        word = wordAux;
      }
    }

    // Check results with 'oe' => ö
    if ( result!==1 && word.includes('oe')) {
      let wordAux = word.replace('oe', 'ö');
      verbToCheckSubs = this.getSubstrings(wordAux);
      result = 0;
      checkerSubs.forEach(substring => {
        if (verbToCheckSubs.includes(substring)) {
            result++;
        }
      });
      result = (result / (checkerSubs.length+verbToCheckSubs.length - result));
      if (result > firstResult) {
        word = wordAux;
      }
    }

    //
    if ( result!==1 && word.includes('ue')) {
      let wordAux = word.replace('ue', 'ü');
      verbToCheckSubs = this.getSubstrings(wordAux);
      result = 0;
      checkerSubs.forEach(substring => {
        if (verbToCheckSubs.includes(substring)) {
            result++;
        }
      });
      result = (result / (checkerSubs.length+verbToCheckSubs.length - result));
      if (result > firstResult) {
        word = wordAux;
      }
    }

    return {
      word: word,
      value: result,
      class: verbToCheck? this.resultToClass(result): null
    }
  }

  getPerfect() {
      if (this.verb.helper === "haben") {
          return "habe " + this.verb.partizip;
      }
      else {
          return "bin " + this.verb.partizip;
      }
  }

  private getSubstrings(element: string) {
    let checker: string[] = [];
    for (var i = 0; i < element.length; i++) {
        for (var j = i + 1; j < element.length + 1; j++) {
            checker.push(element.slice(i, j))
        }
    }

    return checker;
  }
  
  private checkSpecialCharacters() {

  }

}
