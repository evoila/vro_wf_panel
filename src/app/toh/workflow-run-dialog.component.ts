// Observable Version
import { Component }  from '@angular/core';
import { Workflow }           from './workflow';
import { WorkflowPresentationService }    from './workflow-presentation.service';
import {  MdCardModule, 
          MdButtonModule, 
          MdGridListModule,
          MdTabsModule,
          MdInputModule }  from '@angular/material';
import { AppConfigService } from '../app-config.service';
import { WfPresentation }   from './workflow-presentation'

@Component({
  selector: 'workflow-run-dialog',
  templateUrl: './workflow-run-dialog.component.html',
  providers: [ WorkflowPresentationService, AppConfigService ],
  styles: ['.error {color:red;}']
})
export class WorkflowRunDialogComponent {
  errorMessage: string;
  workflows: Workflow[];
  newWorkflow: Workflow;
  presentation: WfPresentation = new WfPresentation();
  mode = 'Observable';
  workflowSid : string;

  constructor (private workflowPresentationService: WorkflowPresentationService) {}

  loadWorkflow(sid:string) {
    console.log("hard loadingWorkflow");
    this.workflowSid = sid;
    this.workflowPresentationService.getWorkflowPresentation(sid)
                          .subscribe(
                            presentation => this.presentation = presentation,
                            error =>  this.errorMessage = <any>error);
  }

  runWorkflow(sid:string) {
    this.workflowPresentationService.getWorkflowPresentation(sid)
                          .subscribe(
                            workflow => this.newWorkflow,
                            error =>  this.errorMessage = <any>error);
  }
}
