import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Film } from './film';
import { Personne } from './personne';
import {environment} from '../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

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
      tap(_ => console.log(`added film id=${tmdbId}`)),
      catchError(this.handleError<any>('saveFilm'))
    );
  }

  updateFilm(film: Film): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + '/films/update/' + film.id , film, httpOptions).pipe(
      tap(_ => console.log(`updated film id=${film.id}`)),
      catchError(this.handleError<any>('updateFilm'))
    );
  }

  replaceFilm(film: Film, tmdbId: number): Observable<Film> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + '/films/tmdb/' + tmdbId , film, httpOptions).pipe(
      tap(_ => console.log(`replaceFilm film id=${film.id}`)),
      catchError(this.handleError<any>('replaceFilm'))
    );
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }
  /*
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }*/
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
