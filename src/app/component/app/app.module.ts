import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommandComponent } from '../command/command.component';
import { StrokeComponent } from '../stroke/stroke.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandComponent,
    StrokeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
