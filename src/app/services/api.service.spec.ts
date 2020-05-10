import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Films List API Exists', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));
  /*
    it('returns status code 200', () => {
      const service: ApiService = TestBed.get(ApiService);
      const data: Observable<Film[]> = service.getAllFilms();
      let film1: Film[];
      data.subscribe((films: Film[]) => film1 = films
        , error => console.log('an error occured when fetching all films'));
      console.log('######## film1=' + film1);
    });*/
});

