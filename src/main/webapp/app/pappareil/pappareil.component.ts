import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-pappareil',
  templateUrl: './pappareil.component.html',
  styleUrls: ['./pappareil.component.scss']
})
export class PAppareilComponent implements OnInit {
  appareilName: string = 'Machine à laver';
  appareilStatus: string = 'éteint';

  constructor() {}

  ngOnInit() {}

  getStatus() {
    return this.appareilStatus;
  }
}
