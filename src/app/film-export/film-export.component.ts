import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-export',
  templateUrl: './film-export.component.html',
  styleUrls: ['./film-export.component.css']
})
export class FilmExportComponent implements OnInit {
  loading = false;
  buttonDisabled = false;
  exportResult: any;
  constructor(private filmService: FilmService) { }

  ngOnInit() {
  }

  exportFilmList() {
    console.log('exportFilmList');
    this.buttonDisabled = true;
    this.loading = true;
    this.filmService.exportFilmList().subscribe((data: any) => {
      const filename = data.headers.get('filename');
      this.saveFile(data.body, filename);
    }
    , (error) => {console.log(error); }
    , () => {
      console.log('exportFilmList this.exportResult=' + this.exportResult);
      this.buttonDisabled = false;
      this.loading = false;
    });
  }
  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    // fileSaver.saveAs(blob, filename);
  }
  importFilmList() {
    console.log('importFilmList');
    this.buttonDisabled = true;
    this.loading = true;
  }
}
