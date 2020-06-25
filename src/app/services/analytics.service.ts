import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  navTrack(router: Router){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-164595552-1',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    })
  }
}
