import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilmService } from '../film.service';
import * as FileSaver from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-film-export',
  templateUrl: './film-export.component.html',
  styleUrls: ['./film-export.component.css']
})
export class FilmExportComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  loading = false;
  buttonDisabled = false;
  exportResult: any;
  formdata: FormData;
  form: FormGroup;

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
  importFilmList() {
    console.log('importFilmList');
    this.buttonDisabled = true;
    this.loading = true;
    this.filmService.importFilmList(this.formdata).subscribe((data: any) => {
      console.log(data);
    }
      , (error) => {
        console.log(error);
        this.buttonDisabled = false;
        this.loading = false;
      }
      , () => {
        this.buttonDisabled = false;
        this.loading = false;
      });
  }
  loadFile(event) {
    console.log('loadFile event', event);
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const fileCount: number = inputEl.files.length;
    console.log('loadFile event', fileCount);
    if (fileCount === 1) { // a file was selected
      console.log('loadFile inputEl.files.item(i)=', inputEl.files.item(0));
      this.formdata = new FormData();
      this.formdata.append('file', inputEl.files.item(0));
      // this.importFilmList(formdata);
    }
    /*
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.importFilmList(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log('loadFile readyState=' + reader.readyState);
      reader.onload = () => {
        this.importFilmList(file);
      };*/
  }
}
