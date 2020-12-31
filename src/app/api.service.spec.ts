/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Pokemon, PokeType } from './shared/models/pokemon';
import { map } from 'rxjs/operators';

describe('ApiService: ', () => {
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });

    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create service', () => {
    expect(apiService).toBeTruthy();
  });

  it('should have a getPokemon function', () => {
    expect(apiService.getPokemon).toBeTruthy();
  });

  it('should retrieve a pokemon', async () => {
    const response: Pokemon = {
      id: 6,
      name: 'Charizard',
      types: [
        {
          name: 'fire',
          emoji: '🔥',
        },
      ],
      sprite: {
        front_default: null,
        back_default: null,
      },
    };

    spyOn(apiService, 'getPokemon').and.returnValue(of(response));

    const req = apiService.getPokemon('6');

    req
      .pipe(map((res: any) => new Pokemon(res.id, res.name, [], res.sprites)))
      .subscribe((result: Pokemon) => {
        console.log(result);

        expect(result).toBeInstanceOf(Pokemon);
        // expect(result).toEqual(response);
      });
  });
});
