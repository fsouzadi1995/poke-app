import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseEndpoint = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private readonly http: HttpClient) {}

  public getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseEndpoint}/${name.toLowerCase()}`);
  }
}
