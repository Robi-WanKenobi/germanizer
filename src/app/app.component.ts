import { Component } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';
import { Router } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  wip = false;
  
  constructor(private router: Router,
              private analytics: AnalyticsService,
              public dialog: MatDialog){
    this.analytics.navTrack(this.router);
  }

  openContact(): void {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe();
  }
}
