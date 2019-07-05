import { Routes } from '@angular/router';
import { BlogComponent } from 'app/blog/blog.component';
import { PostComponent, PostDetailComponent } from 'app/entities/post';

export const blogRoute: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      pageTitle: 'Blog'
    }

    /*data: {
      authorities: [],
      pageTitle: 'Blog'
    }*/
  },
  { path: 'blog/newPost', component: BlogComponent }
];
