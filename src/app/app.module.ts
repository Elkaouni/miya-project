import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MicComponent } from './mic/mic.component';
import { MiyaMascotComponent } from './miya-mascot/miya-mascot.component';

@NgModule({
  declarations: [
    AppComponent,
    MicComponent,
    MiyaMascotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
