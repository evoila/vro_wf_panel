import { Component, OnInit } from '@angular/core';

import { Workflow }        from './workflow';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  workflowes: Workflow[] = [];

  constructor(private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.workflowService.getWorkflowes()
      .then(workflowes => this.workflowes = workflowes.slice(1, 5));
  }
}
