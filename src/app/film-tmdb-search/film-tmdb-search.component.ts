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
  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.annees = this.filmService.getAnneesSelect();
  }

  serachTmdbFilm() {
    alert('oki oki');
  }

}
