import { Component, OnInit } from '@angular/core';
import { FILMS } from '../mock-films';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films: Film[];
  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getAllFilms().subscribe((data: Film[]) => {this.films = data; }
    , (error) => {console.log('an error occured when fetching all films'); });
  }

  getAllFilms(): Observable<Film[]> {
    return this.filmService.loadAll();
  }
}
