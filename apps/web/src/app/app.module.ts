import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    AppRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
