import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Workflow }        from './workflow';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: [ './workflow-detail.component.css' ]
})
export class WorkflowDetailComponent implements OnInit {
  workflow: Workflow;

  constructor(
    private workflowService: WorkflowService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.workflowService.getWorkflow(+params['id']))
      .subscribe(workflow => this.workflow = workflow);
  }

  save(): void {
    this.workflowService.update(this.workflow)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
