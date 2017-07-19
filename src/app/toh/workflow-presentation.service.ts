// Observable Version
import { Injectable }                 from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

import {  WfPresentation,
          WfPresentationStep,
          WfPresentationField,
          WfPresentationGroup }     from './workflow-presentation';
import { Workflow }                 from './workflow'
import { AppConfigService }         from '../app-config.service'

@Injectable()
export class WorkflowPresentationService {

  constructor (private http: Http, private config: AppConfigService) {}

  getWorkflowPresentation(sid:string): Observable<WfPresentation> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic dmNvYWRtaW46dmNvYWRtaW4=');
    let params:URLSearchParams = new URLSearchParams();
    params.set('conditions','categoryName=test');
    console.log(params.getAll('conditions'));
    let options = new RequestOptions({ headers: headers,
      params:params});

    //ToDo: make parameter generic
    return this.http.get(this.config.workflowsUrl+sid+"/presentation/", options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("body: "+body.toString());
    //let myJson = JSON.parse(body);
    //console.log(myJson);
    let count = 0;
    let presentation : WfPresentation = new WfPresentation(body.name, body.id);
    presentation.steps = [];
    console.log("beforeStep");
    body.steps.forEach((step: any, index: number) => {
      let newStep: WfPresentationStep = new WfPresentationStep();
      newStep.groups = [];
      if (step.step["display-name"]) {
        newStep.name = step.step["display-name"];
      } else {
        let pos = index+1;
        newStep.name = "Step "+pos;
      }
      console.log("beforeGroup");
      for (let group of step.step.elements) {
        let newGroup: WfPresentationGroup = new WfPresentationGroup();
        newGroup.fields = [];
        newGroup.name = group["display-name"];
        console.log("GroupName: "+group["display-name"]);
        for (let field of group.fields) {
          let newField : WfPresentationField = new WfPresentationField("-1");
          newField.name         = field["display-name"];
          newField.id           = field.id;
          newField.type         = field.type;
          newField.description  = field.description;
          newGroup.fields.push(newField);
        }
        newStep.groups.push(newGroup);
      }
      presentation.steps.push(newStep);
    });
    console.log(presentation)
    return presentation || { };
  }

  runWorkflow(sid:string): Observable<Workflow> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic dmNvYWRtaW46dmNvYWRtaW4=');
    let options = new RequestOptions({ headers: headers });
    let runUrl:string;
    runUrl = this.config.workflowsUrl+sid+"/executions/"
    return this.http.post(runUrl, {}, options)
                    .map(this.extractData)
                    .catch(this.handleError);  
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    console.log("nope")
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

/*
  private workflowsUrl = 'app/workflows.json'; // URL to JSON file
*/
