import { Injectable } from '@angular/core';
import { FILMS } from './mock-films';
import { Film } from './film';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor() { }

  getFilms(): Observable<Film[]> {
    return of(FILMS);
  }
}
