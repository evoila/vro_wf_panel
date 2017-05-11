import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workflow } from './workflow';

@Injectable()
export class WorkflowService {

  private headers(): Headers {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization', 'Basic dmNvYWRtaW46dmNvYWRtaW4=');
    return headers;
  }
  private workflowesUrl = 'https://172.16.167.147:8281/vco/api/workflows';  // URL to web api

  constructor(private http: Http) { }

  getWorkflowes(): Promise<Workflow[]> {
    return this.http.get(this.workflowesUrl, {headers: this.headers()})
               .toPromise()
               .then(response => this.parseWorkflow(response.json().data))
               .catch(this.handleError);
  }

  private parseWorkflow(workflowObject : any) : Workflow[] {
    console.log(workflowObject);
    return [new Workflow()];
  }


  getWorkflow(id: number): Promise<Workflow> {
    const url = `${this.workflowesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Workflow)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.workflowesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Workflow> {
    return this.http
      .post(this.workflowesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Workflow)
      .catch(this.handleError);
  }

  update(workflow: Workflow): Promise<Workflow> {
    const url = `${this.workflowesUrl}/${workflow.id}`;
    return this.http
      .put(url, JSON.stringify(workflow), {headers: this.headers})
      .toPromise()
      .then(() => workflow)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
