import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Verb, Result } from 'src/app/models/verb';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verb-practice',
  templateUrl: './verb-practice.component.html',
  styles: []
})
export class VerbPracticeComponent implements OnInit {

  @Input() verb: Verb = new Verb();
  @Input() levelLabel: string;
  verbForm: FormGroup;
  result: Result = new Result();
  showingTip: boolean;
  faChevronLeft = faChevronLeft;
  @Output() nextVerb: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private firebase: FirebaseService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.showingTip = false;
  }

  createForm() {
    this.verbForm = this.formBuilder.group({
      present_third: [''],
      preteritum_first: [''],
      perfect_first: [''] 
    })
  }
  
  get checkPerfect() {
    const perfect = this.verbForm.get('perfect_first').value.toLowerCase();
    let hasClass = false;
    if (this.result.perfectFirstResult) {
      hasClass = true;
    }
    return perfect && !(perfect.includes('habe') || perfect.includes('bin')) && hasClass;
  }

  check() {
    this.firebase.check(this.verbForm.value).then(result => {
      this.result = result;
      if (result.next) {
        Object.values(this.verbForm.controls).forEach(control => {
          control.disable();
        });
        this.verbForm.setValue({
          present_third: this.verb.present_third,
          preteritum_first: this.verb.preteritum_first,
          perfect_first: this.firebase.getPerfect()
        })
      } else {
        this.verbForm.setValue({
          present_third: result.presentThirdResult? result.presentThirdResult.word: '',
          preteritum_first: result.preteritumFirstResult? result.preteritumFirstResult.word: '',
          perfect_first: result.perfectFirstResult? result.perfectFirstResult.word: ''
        })
      }
    })
  }

  toggleTip() {
    this.showingTip = !this.showingTip;
  }

  next() {
    this.nextVerb.emit('next');
    this.showingTip = false;
    Object.values(this.verbForm.controls).forEach(control => {
      control.enable();
    });
    this.verbForm.reset({
      present_third: '',
      preteritum_first: '',  
      perfect_first: ''
    });
  }

  toTranslation() {
    if (navigator.language.startsWith('es')) {
      window.open(`https://translate.google.com/?hl=es#view=home&op=translate&sl=de&tl=es&text=${this.verb.infinitiv}`, '_blank');
    }
    else {
      window.open(`https://translate.google.com/?hl=es#view=home&op=translate&sl=de&tl=en&text=${this.verb.infinitiv}`, '_blank');
    }
  }

  toSelectLevel() {
    this.firebase.clearVerb();
    this.router.navigateByUrl('/verbs');
  }

  help() {
    this.verbForm.reset({
      present_third: this.verb.present_third,
      preteritum_first: this.verb.preteritum_first,  
      perfect_first: this.firebase.getPerfect()
    })
    this.check();
  }

}
