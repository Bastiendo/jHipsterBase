import { Routes } from '@angular/router';

import { PAppareilComponent } from 'app/pappareil/pappareil.component';
import { EditAppareilComponent } from 'app/edit-appareil/edit-appareil.component';
import { UserListComponent } from 'app/user-list/user-list.component';
import { NewUserComponent } from 'app/new-user/new-user.component';

export const appareilRoute: Routes = [
  { path: 'appareils', component: PAppareilComponent },
  { path: 'appareils/edit', component: EditAppareilComponent },
  { path: 'appareils/users', component: UserListComponent },
  { path: 'new-user', component: NewUserComponent }
];
