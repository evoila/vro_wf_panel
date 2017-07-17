import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdGridListModule
}        from '@angular/material';

import { requestOptionsProvider }   from './default-request-options.service';

import { AppComponent }             from './app.component';

import { WorkflowListComponent }    from './toh/workflow-list.component';


@NgModule({
  exports: [
    MdGridListModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MdCardModule, MdButtonModule
  ],
  declarations: [
    AppComponent,
    WorkflowListComponent
  ],
  providers: [ requestOptionsProvider ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}



