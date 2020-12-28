import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from './shared/models/pokemon';

const BASE_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${BASE_ENDPOINT}/${name.toLowerCase()}`);
  }
}
