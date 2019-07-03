import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created_at: Date;
  constructor() {}

  ngOnInit() {}

  upLoveIts() {
    this.loveIts++;
  }
  downLoveIts() {
    this.loveIts--;
  }

  getColor() {
    if (this.loveIts > 0) return 'green';
    else if (this.loveIts < 0) return 'red';
    else return 'white';
  }
}
