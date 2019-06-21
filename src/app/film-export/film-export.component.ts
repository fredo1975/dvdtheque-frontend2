import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-export',
  templateUrl: './film-export.component.html',
  styleUrls: ['./film-export.component.css']
})
export class FilmExportComponent implements OnInit {
  loading = false;
  buttonDisabled = false;
  constructor() { }

  ngOnInit() {
  }

  exportFilmList() {
    console.log('exportFilmList');
    this.buttonDisabled = true;
    this.loading = true;
  }
}
