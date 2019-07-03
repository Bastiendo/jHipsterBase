import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { appareilRoute } from 'app/pappareil/pappareil.route';
import { blogRoute } from 'app/blog/blog.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const CUSTOM_ROUTES = appareilRoute;

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: './admin/admin.module#MyfirstappAdminModule'
        },

        ...CUSTOM_ROUTES,
        ...blogRoute,

        ...LAYOUT_ROUTES
      ],

      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],

  exports: [RouterModule]
})
export class MyfirstappAppRoutingModule {}
