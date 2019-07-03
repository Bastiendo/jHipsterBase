import { Routes } from '@angular/router';
import { BlogComponent } from 'app/blog/blog.component';

export const blogRoute: Routes = [
  {
    path: 'blog',
    component: BlogComponent

    /*data: {
      authorities: [],
      pageTitle: 'Blog'
    }*/
  }
];
