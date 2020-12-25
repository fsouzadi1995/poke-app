import { flatten } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
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
  readonly pokemonResult$: Subject<Pokemon> = new Subject();

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
  }

  handleInput(value: string) {
    if (typeof value !== 'undefined' && value !== '')
      this.searchSubject$.next(value);
  }

  private setupSearchSubject(): void {
    this.searchSubject$
      .pipe(
        filter((val: string) => !val.includes(' ')),
        map((val: string) => val.trim()),
        debounceTime(350),
        distinctUntilChanged()
      )
      .subscribe((term: string) => {
        this.search(term);
      });
  }

  private search(term: string) {
    this.isLoading = true;
    this.searchTerm = term;

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
          this.searchTerm = term;
          this.pokemonExists = true;
          console.log(res);

          this.pokemonResult$.next(res);
        },
        (error) => {
          this.pokemonExists = false;
          this.pokemonResult$.next();
        }
      );
  }
}
