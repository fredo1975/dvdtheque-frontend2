import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: 'app-film-tmdb-search',
  templateUrl: './film-tmdb-search.component.html',
  styleUrls: ['./film-tmdb-search.component.css']
})
export class FilmTmdbSearchComponent implements OnInit {
  @Input() film: Film;
  @Output() replacedFilm = new EventEmitter<Film>();
  private annees: number[];
  tmdbFilms: Film[];
  buttonDisabled = false;
  loading = false;
  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.annees = this.filmService.getAnneesSelect();
  }

  serachTmdbFilm() {
    // console.log('this.film.titre=' + this.film.titre);
    this.buttonDisabled = true;
    this.loading = true;
    this.tmdbFilms = null;
    this.filmService.getAllTmdbFilmsByTitre(this.film.titre).subscribe((data: Film[]) => {
      this.tmdbFilms = data;
      // console.log(this.tmdbFilms);
    }
    , (error) => {console.log(error); this.buttonDisabled = false; }
    , () => {
      // console.log('serachTmdbFilm Fini !');
      this.buttonDisabled = false;
      this.loading = false;
    });
  }
  replaceFilm(tmdbId: number) {
    this.buttonDisabled = true;
    this.loading = true;
    // console.log('tmdbId=' + tmdbId + ' film.id=' + this.film.id + ' film.tmdbId=' + this.film.tmdbId);
    this.filmService.replaceFilm(this.film, tmdbId).subscribe((filmUpdated: Film) => {
      // console.log('film with id : ' + filmUpdated.id + ' - ' + filmUpdated.titre + ' replaced');
      this.film = filmUpdated;
      this.tmdbFilms = null;
    }
    , (error) => {console.log(error); }
    , () => {
      // console.log('replaceFilm Fini !');
      this.buttonDisabled = false;
      this.replacedFilm.emit(this.film);
      this.loading = false;
    });
  }
}
