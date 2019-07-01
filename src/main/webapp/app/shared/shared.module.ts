import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyfirstappSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MyfirstappSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MyfirstappSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfirstappSharedModule {
  static forRoot() {
    return {
      ngModule: MyfirstappSharedModule
    };
  }
}
