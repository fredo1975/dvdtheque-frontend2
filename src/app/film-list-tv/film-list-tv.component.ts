import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list-tv',
  templateUrl: './film-list-tv.component.html',
  styleUrls: ['../film-list/film-list.component.css']
})
export class FilmListTvComponent implements OnInit {
  origine = 'TV';
  constructor(filmService: FilmService) {
  }

  ngOnInit() {
  }

}
