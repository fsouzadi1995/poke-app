import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './shared/models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon> {
    return this._http.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
  }
}
