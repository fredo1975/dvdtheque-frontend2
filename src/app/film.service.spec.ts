import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FilmService } from './film.service';

describe('FilmService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule, ], }));

  it('should be created', () => {
    const service: FilmService = TestBed.get(FilmService);
    expect(service).toBeTruthy();
  });
});
