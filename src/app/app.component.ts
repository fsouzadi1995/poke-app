import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Subject } from 'rxjs';
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
  private readonly searchSubject$: Subject<string> = new Subject();
  readonly pokemonResult$: Subject<Pokemon | null> = new Subject();
  randomExample: string = '';
  isLoading = false;
  pokemonExists = false;

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

  constructor(
    private readonly _apiSvc: ApiService,
    private readonly _spinnerSvc: NgxSpinnerService
  ) {
    this.randomExample = this.examples[Math.floor(Math.random() * 10)];
  }

  ngOnInit() {
    this.pokemonResult$.next();
    this.setupSearchSubject();
    this._spinnerSvc.show();
    this.handleInput('Charizard');
  }

  handleInput(val: string) {
    this.searchSubject$.next(val);
  }

  private setupSearchSubject(): void {
    this.searchSubject$
      .pipe(
        filter((val: string) => val !== ''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this.isLoading = true;
          this.pokemonResult$.next();
          return this._apiSvc.getPokemon(term).pipe(
            map(
              (res: any) =>
                new Pokemon(
                  res.id,
                  res.name,
                  [...res.types],
                  res.height,
                  res.sprites
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
