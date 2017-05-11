import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { WorkflowesComponent }      from './workflowes.component';
import { WorkflowDetailComponent }  from './workflow-detail.component';
import { WorkflowService }          from './workflow.service';
import { WorkflowSearchComponent }  from './workflow-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkflowDetailComponent,
    WorkflowesComponent,
    WorkflowSearchComponent
  ],
  providers: [ WorkflowService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
