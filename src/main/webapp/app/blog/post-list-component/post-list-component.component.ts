import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'app/entities/post';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created_at: Date;
  constructor(private postService: PostService, private router: Router) {}

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

  deletePost(id: number) {
    console.log('id post : ' + id);
    this.postService.delete(id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/blog']);
      },
      error => {
        console.log('erreur' + error);
      }
    );
  }
}
