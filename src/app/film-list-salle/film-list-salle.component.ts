import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list-salle',
  templateUrl: './film-list-salle.component.html',
  styleUrls: ['../film-list/film-list.component.css']
})
export class FilmListSalleComponent implements OnInit {
  origine = 'EN_SALLE';
  constructor(filmService: FilmService) {
  }

  ngOnInit() {
  }

}
