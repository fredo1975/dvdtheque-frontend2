import { Injectable } from '@angular/core';
import { Film } from './film';
import { Personne } from './personne';
import { Genre } from './genre';
import { Origine } from './enums/origine.enum';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

const nonRenseigne = 'Non renseigné';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Observable<Film[]>;
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = 'http://localhost:8083/dvdtheque';
  }

  loadAll(): Observable<Film[]> {
    return this.apiService.getAllFilms();
  }

  getAllTmdbFilmsByTitre(titre: string) {
    return this.apiService.getAllTmdbFilmsByTitre(titre);
  }

  getFilm(id: number): Observable<Film> {
    return this.apiService.getFilm(id);
  }

  getAllPersonnes(): Observable<Personne[]> {
    return this.apiService.getAllPersonnes();
  }

  getAllGenres(): Observable<Genre[]> {
    return this.apiService.getAllGenres();
  }

  getAllActeurs(): Observable<Personne[]> {
    return this.apiService.getAllActeurs();
  }

  getAllRealisateurs(): Observable<Personne[]> {
    return this.apiService.getAllRealisateurs();
  }

  updateFilm(film: Film): Observable<any> {
    return this.apiService.updateFilm(film);
  }

  replaceFilm(film: Film, tmdbId: number): Observable<any> {
    return this.apiService.replaceFilm(film, tmdbId);
  }

  saveFilm(tmdbId: number, filmOrigine: Origine): Observable<any> {
    return this.apiService.saveFilm(tmdbId, filmOrigine);
  }

  exportFilmList(origine: Origine) {
    return this.apiService.exportFilmList(origine);
  }
  importFilmList(formdata: FormData): Observable<any> {
    return this.apiService.importFilmList(formdata);
  }
  getFilmPosterName(titre: string): string {
    const regex = / /gi;
    return titre.replace(regex, '_');
  }

  getAnneesSelect = () => {
    const anneeList = [];
    const currentTime = new Date();
    const yyyy = currentTime.getFullYear();
    // anneeList.push(nonRenseigne);
    for (let i = yyyy; i > 1930; i--) {
      anneeList.push(i);
    }
    return anneeList;
  }
}
