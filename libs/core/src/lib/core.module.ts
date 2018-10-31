import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { HttpClientModule } from '@angular/common/http';
// import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { GraphqlModule } from '@foretag/graphql';
import { I18nModule } from '@foretag/i18n';
import { AuthModule } from '@foretag/auth';
import { environment } from '@foretag/env/web';

import { CoreService } from './services/core.service';
import { CustomStorage } from './services/custom-storage.service';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin/src/symbols';

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
    // NgxPageScrollModule,
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

  private static createStorageModule(options: NgxsStoragePluginOptions = {}) {
    return
  }

  public static forBrowser() {
    return {
      ngModule: CoreModule,
    };
  }

  public static forServer(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: STORAGE_ENGINE,
          useClass: CustomStorage
        },
      ],
    }
  }
}
