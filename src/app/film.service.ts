import { Injectable } from '@angular/core';
import { FILMS } from './mock-films';
import { Film } from './film';
import { Personne } from './personne';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Observable<Film[]>;
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl  = 'http://localhost:8083/dvdtheque';
   }

  loadAll(): Observable<Film[]> {
    return this.apiService.getAllFilms();
  }

  getFilm(id: number): Observable<Film> {
    return this.apiService.getFilm(id);
  }

  getAllPersonnes(): Observable<Personne[]> {
    return this.apiService.getAllPersonnes();
  }

  updateFilm(film: Film): Observable<any> {
    return this.apiService.updateFilm(film);
  }
}
