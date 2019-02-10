import { Injectable } from '@angular/core';
import { FILMS } from './mock-films';
import { Film } from './film';
import { Personne } from './personne';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

const nonRenseigne = 'Non renseigné';

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

  getFilmPosterName(titre: string): string {
    const regex = / /gi;
    return titre.replace(regex, '_');
  }

  getAnneesSelect = () => {
    const anneeList = [];
    const currentTime = new Date();
    const yyyy = currentTime.getFullYear();
    anneeList.push(nonRenseigne);
    for (let i = yyyy; i > 1930; i-- ) {
      anneeList.push(i);
    }
    return anneeList;
  }
}
