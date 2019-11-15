import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { FilmListComponent } from '../film-list/film-list.component';

@Component({
  selector: 'app-film-list-dvd',
  templateUrl: './film-list-dvd.component.html',
  styleUrls: ['../film-list/film-list.component.css']
})

export class FilmListDvdComponent extends FilmListComponent implements OnInit {
  origine = 'DVD';
  constructor(filmService: FilmService) {
    super(filmService);
  }

  ngOnInit() {
    console.log('FilmListDvdComponent ngOnInit origine=' + this.origine);
  }
}
