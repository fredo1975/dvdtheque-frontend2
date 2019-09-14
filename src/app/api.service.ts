import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Film } from './film';
import { Personne } from './personne';
import { environment } from '../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const encodedAuth = window.localStorage.getItem('encodedAuth');
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(environment.apiUrl + '/films');
  }

  getAllTmdbFilmsByTitre(titre: string): Observable<Film[]> {
    return this.http.get<Film[]>(environment.apiUrl + '/films/tmdb/byTitre/' + titre);
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<Film>(environment.apiUrl + '/films/byId/' + id);
  }

  getAllPersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(environment.apiUrl + '/personnes');
  }

  getAllActeurs(): Observable<Personne[]> {
    return this.http.get<Personne[]>(environment.apiUrl + '/acteurs');
  }

  getAllRealisateurs(): Observable<Personne[]> {
    return this.http.get<Personne[]>(environment.apiUrl + '/realisateurs');
  }

  saveFilm(tmdbId: number): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + '/films/save/' + tmdbId, httpOptions).pipe(
      tap(_ => console.log(`added film id=${tmdbId}`))
    );
  }

  updateFilm(film: Film): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('apiUr=' + environment.apiUrl + '/films/update/' + film.id);
    return this.http.put(environment.apiUrl + '/films/update/' + film.id, film, httpOptions).pipe(
      tap(_ => console.log(`updated film id=${film.id}`))
    );
  }

  replaceFilm(film: Film, tmdbId: number): Observable<Film> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Film>(environment.apiUrl + '/films/tmdb/' + tmdbId, film, httpOptions);
  }

  importFilmList(formdata: FormData): Observable<any> {
    const url = '/films/import';
    console.log('importFilmList');
    return this.http.post(environment.apiUrl + '/films/import', formdata).pipe(
      tap(_ => console.log('importFilmList done')));
  }

  exportFilmList() {
    return this.http.post(environment.apiUrl + '/films/export', null, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + encodedAuth,
        'Content-Type': 'application/octet-stream',
      }), responseType: 'blob'
    });
  }
}
