import { Component, OnInit } from '@angular/core';
import { AppareilService } from 'app/_services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-appareil-view-component',
  templateUrl: './appareil-view-component.component.html',
  styleUrls: ['./appareil-view-component.component.scss']
})
export class AppareilViewComponentComponent implements OnInit {
  isAuth = false;
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(() => {
      resolve(date);
    }, 1000);
  });

  appareils: any[];
  appareilSubscription: Subscription;

  constructor(private appareilService: AppareilService) {}

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe({
      next(appareils: any[]) {
        this.appareils = appareils;
      }
    });
    this.appareilService.emitAppareilSubject();
  }
  onAllumer() {
    this.appareilService.switchOnAll();
  }
}
