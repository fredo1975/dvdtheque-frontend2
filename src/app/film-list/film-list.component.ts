import { Component, OnInit, OnChanges } from '@angular/core';
import { FILMS } from '../mock-films';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, OnChanges {
  films: Film[];
  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getAllFilms().subscribe((data: Film[]) => {
      this.films = data;
      this.films.map(f => f.posterPath = this.getPosterImg(f));
    }
    , (error) => {console.log(error); });
  }

  ngOnChanges() {
    this.getAllFilms().subscribe((data: Film[]) => {this.films = Object.assign({}, data); }
    , (error) => {console.log(error); });
  }

  getAllFilms(): Observable<Film[]> {
    return this.filmService.loadAll();
  }

  getPosterImg (film: Film) {
    // console.log(environment.poster_url + this.filmService.getFilmPosterName(film.titre));
    return environment.poster_url + this.filmService.getFilmPosterName(film.titre);
  }
}
