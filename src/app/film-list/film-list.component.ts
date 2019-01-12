import { Component, OnInit } from '@angular/core';
import { FILMS } from '../mock-films';
import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films: Film[];
  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getFilms().subscribe(films => this.films = films);
  }
}
