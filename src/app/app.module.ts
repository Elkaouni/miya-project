import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MicComponent } from './mic/mic.component';
import { MiyaMascotComponent } from './miya-mascot/miya-mascot.component';
import { NgxMicRecorderModule } from 'ngx-mic-recorder';

@NgModule({
  declarations: [
    AppComponent,
    MicComponent,
    MiyaMascotComponent,
    MicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMicRecorderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
