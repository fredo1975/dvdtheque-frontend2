import { Injectable } from '@angular/core';
import { FILMS } from './mock-films';
import { Film } from './film';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private apiService: ApiService) { }

  getFilms(): Observable<Film[]> {
    return of(FILMS);
    // return this.apiService.getFilms();
  }
/*
  getFilmById(id: number): Film {
    const _films: Film[] = [];
    return of(FILMS).;
  }*/
}
