import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list-dvd',
  templateUrl: './film-list-dvd.component.html',
  styleUrls: ['../film-list/film-list.component.css']
})

export class FilmListDvdComponent implements OnInit {
  origine = 'DVD';
  constructor(filmService: FilmService) {
  }

  ngOnInit() {
  }
}
