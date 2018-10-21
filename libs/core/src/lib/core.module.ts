import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { NgxsModule } from '@ngxs/store';

import { GraphqlModule } from '@kubic/graphql';
import { I18nModule } from '@kubic/i18n';

@NgModule({
  exports: [ClarityModule],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPageScrollModule,
    NgxsModule.forRoot([]),
    NgxsRouterPluginModule.forRoot(),
    ClarityModule,
    GraphqlModule,
    I18nModule
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
