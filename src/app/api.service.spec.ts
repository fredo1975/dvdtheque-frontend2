import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Film } from './film';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule, ],
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should fetched all films', () => {
    const service: ApiService = TestBed.get(ApiService);
    service.getFilms().subscribe(films => console.log(films));
  });
});

describe('Films List API Exists', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule] }));

  it('returns status code 200', () => {
    const service: ApiService = TestBed.get(ApiService);
    const data: Observable<Film[]> = service.getFilms();
    let _films: Film[];
    data.subscribe(films => _films = films);
    console.log(_films);
  });
});
