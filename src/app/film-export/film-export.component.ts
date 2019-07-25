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

  exportFilmList($event) {
    $event.stopPropagation();
    $event.preventDefault();
    console.log('exportFilmList');
    this.buttonDisabled = true;
    this.loading = true;
    const fileName = 'ListeDvdExport.xlsx';
    this.filmService.exportFilmList().subscribe((data: any) => {
      const file = new Blob([data], { type: 'ResponseContentType.Blob' });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        console.log('exportFilmList window.navigator && window.navigator.msSaveOrOpenBlob');
        window.navigator.msSaveOrOpenBlob(file, fileName);
      } else {
        console.log('exportFilmList else');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
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
