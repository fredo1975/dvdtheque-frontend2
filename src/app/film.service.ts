import { Injectable } from '@angular/core';
import { Film } from './film';
import { Personne } from './personne';
import { Genre } from './genre';
import { Origine } from './enums/origine.enum';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FilmListParam } from './interfaces/film-list-param';

const nonRenseigne = 'Non renseigné';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private origine: string;
  private displayType: string;
  constructor(private apiService: ApiService) {
  }

  setOrigine(origine: string) {
    this.origine = origine;
  }

  setDisplayType(displayType: string) {
    this.displayType = displayType;
  }

  getDisplayType() {
    return this.displayType;
  }

  getOrigine(): string {
    return this.origine;
  }
  findFilmListParamByFilmDisplayTypeParam(origine: string, displayType: string): Observable<FilmListParam> {
    return this.apiService.findFilmListParamByFilmDisplayTypeParam(origine, displayType);
  }

  getAllFilmsByOrigineAndDisplayType(origine: string, displayType: string): Observable<Film[]> {
    return this.apiService.getAllFilmsByOrigineAndDisplayType(origine, displayType);
  }
  getAllTmdbFilmsByTitre(titre: string) {
    return this.apiService.getAllTmdbFilmsByTitre(titre);
  }

  getFilm(id: number): Observable<Film> {
    return this.apiService.getFilm(id);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.apiService.getAllGenres();
  }

  getAllActeursByOrigine(origine: string, displayType: string): Observable<Personne[]> {
    return this.apiService.getAllActeursByOrigine(origine, displayType);
  }

  getAllRealisateursByOrigine(origine: string, displayType: string): Observable<Personne[]> {
    return this.apiService.getAllRealisateursByOrigine(origine, displayType);
  }

  updateFilm(film: Film): Observable<any> {
    return this.apiService.updateFilm(film);
  }

  replaceFilm(film: Film, tmdbId: number): Observable<any> {
    return this.apiService.replaceFilm(film, tmdbId);
  }

  removeFilm(id: number): Observable<any> {
    return this.apiService.removeFilm(id);
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
