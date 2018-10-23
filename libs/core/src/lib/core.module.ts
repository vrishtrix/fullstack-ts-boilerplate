import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { GraphqlModule } from '@kubic/graphql';
import { I18nModule } from '@kubic/i18n';
import { AuthModule } from '@kubic/auth';
import { environment } from '@env/web';

import { CoreService } from './services/core.service';

@NgModule({
  providers: [
    CoreService,
  ],
  exports: [
    ClarityModule,
    ClrFormsNextModule,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPageScrollModule,
    NgxsModule.forRoot([]),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    ClarityModule,
    ClrFormsNextModule,
    GraphqlModule,
    AuthModule,

    I18nModule,
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token',
    }),
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
