import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Film } from '../model/film';
import { Personne } from '../model/personne';
import { Genre } from '../model/genre';
import { Origine } from '../model/origine.enum';
import { environment } from '../../environments/environment';
import { FilmListParam } from '../model/film-list-param';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const encodedAuth = window.localStorage.getItem('encodedAuth');
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  private createdisplayTypeParam(displayType: string): HttpParams {
    let params = new HttpParams();
    params = params.append('displayType', displayType);
    return params;
  }

  findFilmListParamByFilmDisplayTypeParam(origine: string, displayType: string): Observable<FilmListParam> {
    const params: HttpParams = this.createdisplayTypeParam(displayType);
    return this.http.get<FilmListParam>(environment.apiUrl + '/public/films/filmListParam/byOrigine/' + origine, { params: params });
  }

  getAllFilmsByOrigineAndDisplayType(origine: string, displayType: string): Observable<Film[]> {
    const params: HttpParams = this.createdisplayTypeParam(displayType);
    return this.http.get<Film[]>(environment.apiUrl + '/public/films/byOrigine/' + origine, { params: params });
  }

  getAllTmdbFilmsByTitre(titre: string): Observable<Film[]> {
    return this.http.get<Film[]>(environment.apiUrl + '/public/films/tmdb/byTitre/' + titre);
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<Film>(environment.apiUrl + '/public/films/byId/' + id);
  }

  getAllActeursByOrigine(origine: string, displayType: string): Observable<Personne[]> {
    // console.log('ApiService::getAllActeursByOrigine::displayType', displayType, origine);
    const params: HttpParams = this.createdisplayTypeParam(displayType);
    return this.http.get<Personne[]>(environment.apiUrl + '/public/acteurs/byOrigine/' + origine, { params: params });
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(environment.apiUrl + '/public/films/genres');
  }

  getAllRealisateursByOrigine(origine: string, displayType: string): Observable<Personne[]> {
    // console.log('ApiService::getAllRealisateursByOrigine::displayType', displayType, origine);
    const params: HttpParams = this.createdisplayTypeParam(displayType);
    return this.http.get<Personne[]>(environment.apiUrl + '/public/realisateurs/byOrigine/' + origine, { params: params });
  }

  saveFilm(tmdbId: number, filmOrigine: Origine): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + '/films/save/' + tmdbId, filmOrigine, httpOptions).pipe(
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

  retrieveFilmImage(id: number): Observable<Film> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Film>(environment.apiUrl + '/films/retrieveImage/' + id, httpOptions);
  }

  retrieveAllFilmImages(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<any>(environment.apiUrl + '/films/retrieveAllImages/', httpOptions);
  }

  cleanAllCaches(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<any>(environment.apiUrl + '/films/cleanCaches', httpOptions);
  }

  removeFilm(id: number): Observable<Film> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Film>(environment.apiUrl + '/films/remove/' + id, httpOptions);
  }

  importFilmList(formdata: FormData): Observable<any> {
    const url = '/films/import';
    console.log('importFilmList');
    return this.http.post(environment.apiUrl + '/films/import', formdata).pipe(
      tap(_ => console.log('importFilmList done')));
  }

  exportFilmList(origine: Origine) {
    return this.http.post(environment.apiUrl + '/films/export', origine, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + encodedAuth,
        'Content-Type': 'application/octet-stream',
      }), responseType: 'blob'
    });
  }
}
