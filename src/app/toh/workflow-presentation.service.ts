// Observable Version
import { Injectable }                 from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

import { Workflow }                 from './workflow';
import { AppConfigService }         from '../app-config.service'

@Injectable()
export class WorkflowPresentationService {

  constructor (private http: Http, private config: AppConfigService) {}

  getWorkflowPresentation(): Observable<Workflow[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic dmNvYWRtaW46dmNvYWRtaW4=');
    let params:URLSearchParams = new URLSearchParams();
    params.set('conditions','categoryName=test');
    console.log(params.getAll('conditions'));
    let options = new RequestOptions({ headers: headers,
      params:params});

    //ToDo: make parameter generic
    return this.http.get(this.config.workflowsUrl+"?conditions=categoryName%3Dtest", options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //let myJson = JSON.parse(body);
    let count = 0;
    let items: Workflow[] = [];
    for (let link of body.link) {
      let newItem: Workflow = { name: "", sid: "", id: 0};
      for (let attr of link.attributes) {
        if (attr.name == "name") newItem.name = attr.value;
        if (attr.name == "id") newItem.sid = attr.value;
      }
      count++;
      if (count < 10)
        items.push(newItem);
    };

    return items || { };
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
