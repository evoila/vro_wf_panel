// Observable Version
import { Component, OnInit }  from '@angular/core';
import { Workflow }           from './workflow';
import { WorkflowService }    from './workflow.service';
import {  MdCardModule, 
          MdButtonModule, 
          MdGridListModule }  from '@angular/material';

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

  constructor (private workflowService: WorkflowService) {}

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

  addWorkflow(name: string) {
    if (!name) { return; }
    this.workflowService.create(name)
                     .subscribe(
                       workflow  => this.workflows.push(workflow),
                       error =>  this.errorMessage = <any>error);
  }
}
