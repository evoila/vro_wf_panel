import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk';
import {
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdDialogModule
}        from '@angular/material';

import { requestOptionsProvider }   from './default-request-options.service';

import { AppComponent }             from './app.component';

import { WorkflowListComponent }    from './toh/workflow-list.component';
import { WorkflowRunDialogComponent }    from './toh/workflow-run-dialog.component';



@NgModule({
  exports: [
    MdGridListModule
  ],
  imports: [
    CdkTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MdCardModule, MdButtonModule, MdDialogModule
  ],
  declarations: [
    AppComponent,
    WorkflowListComponent,
    WorkflowRunDialogComponent
  ],
  entryComponents: [WorkflowRunDialogComponent],
  providers: [ requestOptionsProvider ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}



