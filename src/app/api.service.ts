import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Film } from './film';
import { Personne } from './personne';

const endpoint = 'http://localhost:8083/dvdtheque';
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
    return this.http.get<Film[]>(endpoint + '/films');
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<Film>(endpoint + '/films/byId/' + id);
  }

  getAllPersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(endpoint + '/personnes');
  }
}
