import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
//import 'rxjs/Rx'; fait une ERREUR

@Component({
  selector: 'jhi-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    const counter = new Observable(suscriber => {
      setTimeout(() => {
        suscriber.next(1);
      }, 1000);
    });
    this.counterSubscription = counter.subscribe({
      next(x: number) {
        this.secondes = x;
      },
      error(error: any) {
        console.log('Une erreur a été recontré');
      },
      complete() {
        console.log('Donnnnnnnnnnnneeeeeeee');
      }
    });
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
