import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MyfirstappSharedModule } from 'app/shared';
import {
  WishlistComponent,
  WishlistDetailComponent,
  WishlistUpdateComponent,
  WishlistDeletePopupComponent,
  WishlistDeleteDialogComponent,
  wishlistRoute,
  wishlistPopupRoute
} from './';

const ENTITY_STATES = [...wishlistRoute, ...wishlistPopupRoute];

@NgModule({
  imports: [MyfirstappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    WishlistComponent,
    WishlistDetailComponent,
    WishlistUpdateComponent,
    WishlistDeleteDialogComponent,
    WishlistDeletePopupComponent
  ],
  entryComponents: [WishlistComponent, WishlistUpdateComponent, WishlistDeleteDialogComponent, WishlistDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfirstappWishlistModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
