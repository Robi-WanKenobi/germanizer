import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerbsInfoComponent } from '../verbs-info/verbs-info.component';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styles: []
})
export class ExerciseCardComponent implements OnInit {

  @Input() title:string;
  @Input() game:string;
  @Input() description:string;
  @Input() exerciseURL:string;
  @Input() hasInfo:boolean;
  faInfoCircle = faInfoCircle;


  constructor(private router: Router,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigateByUrl(this.exerciseURL);
  }

  openInstructions(): void {
    if (this.game === 'verbs') {
      const dialogRef = this.dialog.open(VerbsInfoComponent, {
        width: '450px'
      });
      
      dialogRef.afterClosed().subscribe();
    }
  }

}
