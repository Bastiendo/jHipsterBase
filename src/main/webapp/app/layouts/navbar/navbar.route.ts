import { Route } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { PAppareilComponent } from 'app/pappareil/pappareil.component';

export const navbarRoute: Route = {
  path: '',
  component: NavbarComponent,
  outlet: 'navbar'
};
