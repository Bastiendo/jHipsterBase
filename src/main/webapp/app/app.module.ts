import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { MyfirstappSharedModule } from 'app/shared';
import { MyfirstappCoreModule } from 'app/core';
import { MyfirstappAppRoutingModule } from './app-routing.module';
import { MyfirstappHomeModule } from './home/home.module';
import { MyfirstappAccountModule } from './account/account.module';
import { MyfirstappEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { MonPremierPersoComponent } from './mon-premier-perso/mon-premier-perso.component';
import { PAppareilComponent } from './pappareil/pappareil.component';
import { BlogComponent } from './blog/blog.component';
import { PostListComponentComponent } from './blog/post-list-component/post-list-component.component';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { AppareilViewComponentComponent } from './appareil-view-component/appareil-view-component.component';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { AppareilService } from 'app/_services/appareil.service';
import { UserService } from 'app/_services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'et'
    }),
    MyfirstappSharedModule.forRoot(),
    MyfirstappCoreModule,
    MyfirstappHomeModule,
    MyfirstappAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MyfirstappEntityModule,
    MyfirstappAppRoutingModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    MonPremierPersoComponent,
    PAppareilComponent,
    BlogComponent,
    PostListComponentComponent,
    SingleAppareilComponent,
    AppareilViewComponentComponent,
    EditAppareilComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    AppareilService,
    UserService
  ],
  bootstrap: [JhiMainComponent]
})
export class MyfirstappAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
