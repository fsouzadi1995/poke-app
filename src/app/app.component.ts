import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { of, Subject, throwError } from 'rxjs';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ApiService } from './api.service';
import { Pokemon } from './shared/models/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly searchSubject$: Subject<string> = new Subject<string>();
  readonly pokemonResult$: Subject<Pokemon | null> = new Subject();

  searchForm = new FormControl('');

  examples: string[] = [
    'Dragonite',
    'Lapras',
    'Pikachu',
    'Gengar',
    'Charmander',
    'Ekans',
    'Kadabra',
    'Ponyta',
    'Weezing',
    'Rhydon',
  ];

  randomExample: string = '';
  searchTerm: string = '';
  isLoading = false;

  pokemonExists = false;

  constructor(private readonly _apiSvc: ApiService) {
    this.randomExample = this.examples[Math.floor(Math.random() * 10)];
  }

  ngOnInit() {
    this.pokemonResult$.next();
    this.setupSearchSubject();
    // this.handleInput('lapras');
  }

  handleInput(val: string) {
    this.searchSubject$.next(val);
  }

  private setupSearchSubject(): void {
    this.searchSubject$
      .pipe(
        filter((val: string) => val !== '' && !val.includes(' ')),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string) => {
          return this._apiSvc.getPokemon(term).pipe(
            map(
              (pokemon: any) =>
                new Pokemon(
                  term,
                  [...pokemon.types],
                  pokemon.height,
                  pokemon.sprites
                )
            ),
            /**
            Developer Note: we do this so that we keep the subscription on the SearchSubject
                            if we were to throw an error here the subscription would end
            **/
            catchError(async (err) => null),
            finalize(() => (this.isLoading = false))
          );
        })
      )
      .subscribe((res: Pokemon | null) => {
        console.log(res);

        if (res) {
          this.pokemonExists = true;
          this.pokemonResult$.next(res);
        } else {
          this.pokemonExists = false;
          this.pokemonResult$.next();
        }
      }),
      (error: any) => {};
  }
}
