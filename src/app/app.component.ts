import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
  catchError,
  tap,
} from 'rxjs/operators';
import { ApiService } from './api.service';
import { Pokemon } from './models/pokemon';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly pokemon$: Subject<Pokemon | null> = new Subject();
  public randomExample: string;
  public isLoading = false;

  public readonly nameCtrl: FormControl = new FormControl(
    '',
    Validators.required
  );

  private readonly examples: string[] = [
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

  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly apiSvc: ApiService,
    private readonly spinnerSvc: NgxSpinnerService
  ) {
    this.randomExample = this.examples[Math.floor(Math.random() * 10)];
  }

  public ngOnInit(): void {
    this.setupSearchSubject();
    this.spinnerSvc.show();
    this.pokemon$.next(null);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private setupSearchSubject(): void {
    this.nameCtrl.valueChanges
      .pipe(
        filter((val: string) => val !== ''),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => (this.isLoading = true)),
        tap(() => this.pokemon$.next(null)),
        tap(() => this.cd.detectChanges()),
        switchMap((term: string) => {
          return this.apiSvc.getPokemon(term).pipe(
            map(
              (res: any) =>
                new Pokemon(res.id, res.name, [...res.types], res.sprites)
            ),
            tap((pokemon) => this.pokemon$.next(pokemon)),
            // CatchError so that it doesn't complete the obs
            catchError(async () => null),
            finalize(() => {
              this.isLoading = false;
              this.cd.detectChanges();
            })
          );
        })
      )
      .subscribe();
  }
}
