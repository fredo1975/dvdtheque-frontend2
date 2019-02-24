import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: 'app-film-tmdb-search',
  templateUrl: './film-tmdb-search.component.html',
  styleUrls: ['./film-tmdb-search.component.css']
})
export class FilmTmdbSearchComponent implements OnInit {
  @Input() film: Film;
  private annees: number[];
  private tmdbFilms: Film[];

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.annees = this.filmService.getAnneesSelect();
  }

  serachTmdbFilm() {
    console.log('this.film.titre=' + this.film.titre);
    this.filmService.getAllTmdbFilmsByTitre(this.film.titre).subscribe((data: Film[]) => {
      this.tmdbFilms = data;
      // console.log(this.tmdbFilms);
    }
    , (error) => {console.log(error); });
  }
  replaceFilm(tmdbId: any) {
    console.log('tmdbId=' + tmdbId + ' film.id=' + this.film.id);
  }
}
