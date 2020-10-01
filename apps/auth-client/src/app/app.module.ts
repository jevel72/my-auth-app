import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';

import { AppCoreModule } from './modules/app-core.module';
import { AppRoutingModule } from './modules/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppCoreModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
