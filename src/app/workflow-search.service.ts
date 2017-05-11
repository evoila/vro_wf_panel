import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Workflow }           from './workflow';

@Injectable()
export class WorkflowSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Workflow[]> {
    return this.http
               .get(`app/workflowes/?name=${term}`)
               .map(response => response.json().data as Workflow[]);
  }
}
