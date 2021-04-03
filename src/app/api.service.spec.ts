/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { Pokemon } from './models/pokemon';
import { map } from 'rxjs/operators';
describe('ApiService: ', () => {
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

    apiService
      .getPokemon('6')
      .pipe(map((res: any) => new Pokemon(res.id, res.name, [], res.sprites)))
      .subscribe((result: Pokemon) => {
        expect(result).toBeInstanceOf(Pokemon);
      });
  });
});
