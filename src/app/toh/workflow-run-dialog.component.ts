// Observable Version
import { Component }  from '@angular/core';
import { Workflow }           from './workflow';
import { WorkflowService }    from './workflow.service';
import {  MdCardModule, 
          MdButtonModule, 
          MdGridListModule }  from '@angular/material';

@Component({
  selector: 'workflow-run-dialog',
  templateUrl: './workflow-run-dialog.component.html',
  providers: [ WorkflowService ],
  styles: ['.error {color:red;}']
})
export class WorkflowRunDialogComponent {
  errorMessage: string;
  workflows: Workflow[];
  newWorkflow: Workflow;
  mode = 'Observable';
  workflowSid : string;

  constructor (private workflowService: WorkflowService) {}

  loadWorkflow(sid:string) {
    console.log("hard loadingWorkflow");
    this.workflowSid = sid;
  }

  runWorkflow(sid:string) {
    this.workflowService.runWorkflow(sid)
                          .subscribe(
                            workflow => this.newWorkflow,
                            error =>  this.errorMessage = <any>error);
  }
}
