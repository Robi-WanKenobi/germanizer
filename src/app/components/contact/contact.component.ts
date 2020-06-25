import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { VerbPracticeComponent } from '../verb-practice/verb-practice.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit {

  spinner = faSpinner;
  loading = false;
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ContactComponent>) {
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      to: [{value: 'Roberto Arranz Trullols', disabled: true}, [Validators.required]],
      name: ['', [Validators.required]],
      from: ['', [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]]
    })
  }

  get invalidEmail() {
    return this.contactForm.get('from').invalid && this.contactForm.get('from').touched;
  }
  get invalidName() {
    return this.contactForm.get('name').invalid && this.contactForm.get('name').touched;
  }
  get invalidSubject() {
    return this.contactForm.get('subject').invalid && this.contactForm.get('subject').touched;
  }
  get invalidBody() {
    return this.contactForm.get('body').invalid && this.contactForm.get('body').touched;
  }

  send() {
    if (this.contactForm.invalid) {
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.loading = true;
      const mailOptions = this.contactForm.value;
      mailOptions.from = {
        'name': this.contactForm.value.name,
        'address': this.contactForm.value.from
      }
      delete mailOptions.to;
      console.log(mailOptions);
      this.http.post('https://us-central1-germanizer-fa320.cloudfunctions.net/api/contact', mailOptions).subscribe((res:any) => {
        if (res.success) {
          this.closeDialog();
          this._snackBar.open('Email sent!', '', {
            duration:1500,
            panelClass :['simple-snack-bar']
          })
        } else {
          this._snackBar.open('Error sending email!', 'Ups!', {
            duration:1500,
            panelClass :['simple-snack-bar']
          })
        }
        this.loading = false;
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
