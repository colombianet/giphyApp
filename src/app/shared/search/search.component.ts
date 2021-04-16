import { Component, OnInit } from '@angular/core';

import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  seeSidebar = false;

  get gifs() {
    return [...this.giphySvc.results];
  }

  constructor( private giphySvc: GiphyService ) { }

  ngOnInit(): void {
    this.giphySvc.results = localStorage.getItem('results')? JSON.parse(localStorage.getItem('results')!): [];
  }
  
  toggleSidebar() {
    this.seeSidebar = this.giphySvc.toggleSeeSidebar(this.seeSidebar);
  }
  
  buscarGifts( toSearch: string ) {
    toSearch = toSearch.trim();
    if (toSearch.length === 0) { return; }

    this.giphySvc.addSearchHistory(toSearch);
    
    this.giphySvc.getGifs( toSearch ).subscribe( resp => {
      this.giphySvc.results = resp;
    });
  }

}
