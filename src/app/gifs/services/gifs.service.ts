import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey    : string = 'rAQxs9uiRLFrrYqliOqRq1cTCcd5uq38';
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) { } // Inyectamos el servicio HttpClient


  buscarGifs(query: string) {

    query = query.toUpperCase();

    if (query.trim().length === 0) {
      return;
    }

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      //detect only 10 items
      this._historial = this._historial.slice(0, 10);

     //save in local storage
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apikey}&q=${query}&limit=10`)
      .subscribe( (resp: any) => {
        console.log( resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
    
    return this._historial;
  }

}
