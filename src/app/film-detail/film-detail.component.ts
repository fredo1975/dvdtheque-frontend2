import { Component, OnInit,  Input } from '@angular/core';
import { Film } from '../film';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  @Input() film: Film;

  constructor() { }

  ngOnInit() {
  }

}
