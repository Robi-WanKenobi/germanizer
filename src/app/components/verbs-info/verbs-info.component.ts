import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-verbs-info',
  templateUrl: './verbs-info.component.html',
  styles: []
})
export class VerbsInfoComponent implements OnInit {

  faChevronRight = faChevronRight;

  constructor(
    public dialogRef: MatDialogRef<VerbsInfoComponent>) 
  {}

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
