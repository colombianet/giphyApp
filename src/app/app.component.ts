import { Component } from '@angular/core';

import { GiphyService } from './services/giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'giphyApp';

  constructor( public giphySvc: GiphyService ) {}
}
