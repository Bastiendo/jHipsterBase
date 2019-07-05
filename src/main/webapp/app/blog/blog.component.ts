import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/entities/post';

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

  postsEntites = [];

  constructor(private postService: PostService) {}

  ngOnInit() {}

  onFetch() {
    this.postService.query().subscribe(
      response => {
        console.log(response);
        this.postsEntites = response.body;
      },
      error => {
        console.log('erreur' + error);
      }
    );
  }
}
