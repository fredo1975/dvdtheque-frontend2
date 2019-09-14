import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-film-export',
  templateUrl: './film-export.component.html',
  styleUrls: ['./film-export.component.css']
})
export class FilmExportComponent implements OnInit {
  loading = false;
  buttonDisabled = false;
  exportResult: any;

  constructor(private filmService: FilmService) {
  }
  ngOnInit() {
  }

  exportFilmList() {
    this.buttonDisabled = true;
    this.loading = true;
    const fileName = 'ListeDvdExport';
    this.filmService.exportFilmList().subscribe((data: any) => {
      const now = Date.now();
      this.saveAsExcelFile(data, `${fileName}-${now}` + EXCEL_EXTENSION);
    }
      , (error) => { console.log(error); }
      , () => {
        this.buttonDisabled = false;
        this.loading = false;
      });
  }
  private saveAsExcelFile(data: any, fileName: string): void {
    const blob: Blob = new Blob([data], { type: EXCEL_TYPE });
    FileSaver.saveAs(blob, fileName);
  }
}
