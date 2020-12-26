import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  finalize,
} from 'rxjs/operators';
import { ApiService } from './api.service';
import { Pokemon } from './shared/models/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly searchSubject$: Subject<string> = new Subject();
  readonly pokemonResult$: Subject<Pokemon | null> = new Subject();

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
    this.setupSearchSubject();
    this.pokemonResult$.next();
    this.handleInput('lapras');
  }

  handleInput(val: string) {
    this.searchSubject$.next(val);
  }

  private setupSearchSubject(): void {
    this.searchSubject$
      .pipe(
        filter((val: string) => val !== '' && !val.includes(' ')),
        map((val: string) => val.trim()),
        debounceTime(350),
        distinctUntilChanged()
      )
      .subscribe((term: string) => {
        this.pokemonResult$.next(null);
        this.searchTerm = term;
        this.search(term);
      });
  }

  private search(term: string) {
    this.isLoading = true;

    this._apiSvc
      .getPokemon(term)
      .pipe(
        map(
          (pokemon: any) =>
            new Pokemon(
              term,
              [...pokemon.types],
              pokemon.height,
              pokemon.sprites
            )
        ),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        (res: Pokemon) => {
          console.log(res);
          this.pokemonExists = true;
          this.pokemonResult$.next(res);
        },
        (error) => (this.pokemonExists = false)
      );
  }
}
