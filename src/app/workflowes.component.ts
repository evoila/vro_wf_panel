import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Workflow }                from './workflow';
import { WorkflowService }         from './workflow.service';

@Component({
  selector: 'my-workflowes',
  templateUrl: './workflowes.component.html',
  styleUrls: [ './workflowes.component.css' ]
})
export class WorkflowesComponent implements OnInit {
  workflowes: Workflow[];
  selectedWorkflow: Workflow;

  constructor(
    private workflowService: WorkflowService,
    private router: Router) { }

  getWorkflowes(): void {
    this.workflowService
        .getWorkflowes()
        .then(workflowes => this.workflowes = workflowes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.workflowService.create(name)
      .then(workflow => {
        this.workflowes.push(workflow);
        this.selectedWorkflow = null;
      });
  }

  delete(workflow: Workflow): void {
    this.workflowService
        .delete(workflow.id)
        .then(() => {
          this.workflowes = this.workflowes.filter(h => h !== workflow);
          if (this.selectedWorkflow === workflow) { this.selectedWorkflow = null; }
        });
  }

  ngOnInit(): void {
    this.getWorkflowes();
  }

  onSelect(workflow: Workflow): void {
    this.selectedWorkflow = workflow;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedWorkflow.id]);
  }
}
