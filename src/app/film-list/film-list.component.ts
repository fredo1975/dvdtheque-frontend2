import { Component, OnInit } from '@angular/core';
import { FILMS } from '../mock-films';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films = FILMS;
  constructor() { }

  ngOnInit() {
  }

}
