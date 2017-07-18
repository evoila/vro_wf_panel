// Observable Version
import { Component, OnInit }  from '@angular/core';
import { Workflow }           from './workflow';
import { WorkflowService }    from './workflow.service';
import { WorkflowRunDialogComponent } from './workflow-run-dialog.component'
import {  MdCardModule, 
          MdButtonModule, 
          MdGridListModule,
          MdDialog, 
          MdDialogRef}        from '@angular/material';

@Component({
  selector: 'workflow-list',
  templateUrl: './workflow-list.component.html',
  providers: [ WorkflowService ],
  styles: ['.error {color:red;}']
})
export class WorkflowListComponent implements OnInit {
  errorMessage: string;
  workflows: Workflow[];
  newWorkflow: Workflow;
  mode = 'Observable';

  constructor (private workflowService: WorkflowService, public dialog:MdDialog) {
  } 

  ngOnInit() { this.getWorkflows(); }

  getWorkflows() {
    this.workflowService.getWorkflows()
                     .subscribe(
                       workflows => this.workflows = workflows,
                       error =>  this.errorMessage = <any>error);
  }

  runWorkflow(sid:string) {
    this.workflowService.runWorkflow(sid)
                          .subscribe(
                            workflow => this.newWorkflow,
                            error =>  this.errorMessage = <any>error);
  }

  openDialog(sid:string) {
    let dialogRef = this.dialog.open(WorkflowRunDialogComponent);
    dialogRef.componentInstance.loadWorkflow(sid);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }
}
