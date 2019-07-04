import { Routes } from '@angular/router';

import { PAppareilComponent } from 'app/pappareil/pappareil.component';
import { EditAppareilComponent } from 'app/edit-appareil/edit-appareil.component';

export const appareilRoute: Routes = [
  { path: 'appareils', component: PAppareilComponent },
  { path: 'appareils/edit', component: EditAppareilComponent }
];
