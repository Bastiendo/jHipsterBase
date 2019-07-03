import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  title = 'Blog';
  posts = [
    {
      title: '1er article',
      content: 'Bonjour et bienvenue',
      loveIts: 0,
      created_at: new Date()
    },

    {
      title: 'Présentation',
      content: 'Je suis.....',
      loveIts: 0,
      created_at: new Date()
    },

    {
      title: 'Pourquoi la vie ?',
      content: 'Parce que',
      loveIts: 0,
      created_at: new Date()
    }
  ];

  constructor() {}

  ngOnInit() {}
}
