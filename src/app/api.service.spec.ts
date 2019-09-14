import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Film } from './film';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,],
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});

describe('Films List API Exists', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  it('returns status code 200', () => {
    const service: ApiService = TestBed.get(ApiService);
    const data: Observable<Film[]> = service.getAllFilms();
    let film1: Film[];
    data.subscribe((films: Film[]) => film1 = films
      , error => console.log('an error occured when fetching all films'));
    console.log('######## film1=' + film1);
  });
});
