import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

import { Gif, GiphyResponse } from '../models/giphy-response';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  // variable bandera para ocultar o mostrar el sidebar
  seeSidebar = false;
  private baseUrl = 'http://api.giphy.com/v1';
  apiKey = 'cyeIJLoqzHHzA1cOD8UG62R2QwLOiIe4';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }
  
  constructor( private http: HttpClient ) {
    // al hacer refresh de la pagina q cargue el ultimo resultado
    if ( localStorage.getItem('history') ) {
      this._history = JSON.parse(localStorage.getItem('history')! );
    }
  }

  toggleSeeSidebar( see: boolean ): boolean {
    if ( !see ) {
      this.seeSidebar = true;
      return true;
    } else {
      this.seeSidebar = false;
      return false;
    }
  }

  getGifs( tosearch: string): Observable<Gif[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tosearch)
      .set('limit', '10');

    return this.http.get<GiphyResponse>(`${ this.baseUrl }/gifs/search`, { params })
      .pipe(
        pluck<GiphyResponse, Gif[]>('data'),
        tap(resp => {
          localStorage.setItem('results', JSON.stringify(resp) )
        })
      );
  }

  addSearchHistory( tosearch: string = '' ) {
    tosearch = tosearch.toLowerCase();

    // Solo permite nuevas busquedas
    if ( !this._history.includes(tosearch) ) {
      // agrega al inicio del array para q la ultima busqueda sea la 1ra en el historial
      this._history.unshift(tosearch);
      // Mantengo solo los ultimos 10 resultados en el historial
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history) );
    }
  }
}
