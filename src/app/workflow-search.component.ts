import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { WorkflowSearchService } from './workflow-search.service';
import { Workflow } from './workflow';

@Component({
  selector: 'workflow-search',
  templateUrl: './workflow-search.component.html',
  styleUrls: [ './workflow-search.component.css' ],
  providers: [WorkflowSearchService]
})
export class WorkflowSearchComponent implements OnInit {
  workflowes: Observable<Workflow[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private workflowSearchService: WorkflowSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.workflowes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.workflowSearchService.search(term)
        // or the observable of empty workflowes if there was no search term
        : Observable.of<Workflow[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Workflow[]>([]);
      });
  }

  gotoDetail(workflow: Workflow): void {
    let link = ['/detail', workflow.id];
    this.router.navigate(link);
  }
}
