import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { FilmSearch } from '../film-search';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, OnChanges {
  films: Film[];
  filteredFilms: Film[];
  @Input() filmSearch: FilmSearch;


  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getAllFilms().subscribe((data: Film[]) => {
      this.films = data;
      this.films.map(f => f.posterPath = this.getPosterImg(f));
      this.filteredFilms = data;
      this.filteredFilms.map(f => f.posterPath = this.getPosterImg(f));
    }
    , (error) => {console.log(error); });
  }

  ngOnChanges() {
    /*
    this.getAllFilms().subscribe((data: Film[]) => {this.films = Object.assign({}, data); }
    , (error) => {console.log(error); });
    console.log('filmSearch changed');*/
  }

  getAllFilms(): Observable<Film[]> {
    return this.filmService.loadAll();
  }

  getPosterImg (film: Film) {
    // console.log(environment.poster_url + this.filmService.getFilmPosterName(film.titre));
    return environment.poster_url + this.filmService.getFilmPosterName(film.titre);
  }

  filterOnTitre(titre: string) {
    console.log('titre=' + titre);
    for (let i = 0; i < this.films.length; i++) {
      const re = new RegExp(titre, 'gi');
      if (this.films[i].titre.match(re)) {
        this.filteredFilms.push(this.films[i]);
      }
    }
  }
}
