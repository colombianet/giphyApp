import { Component, OnInit } from '@angular/core';

import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get history() {
    if ( localStorage.getItem('history') ) {
      return JSON.parse(localStorage.getItem('history')!);
    } 
    return [...this.giphySvc.history];
  }

  constructor( private giphySvc: GiphyService ) {}

  ngOnInit(): void {}

  getFromHistory( item: string ) {
    this.giphySvc.getGifs( item ).subscribe( resp => {
      this.giphySvc.results = resp;
    });
  }

}
