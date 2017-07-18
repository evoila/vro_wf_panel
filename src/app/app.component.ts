import { Component }         from '@angular/core';
import { AppConfigService } from './app-config.service'

@Component({
  selector: 'my-app',
  template: `
    <workflow-list></workflow-list>
  `,
  providers: [AppConfigService]
})
export class AppComponent { }
