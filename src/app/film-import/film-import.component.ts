import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilmService } from '../film.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-import',
  templateUrl: './film-import.component.html',
  styleUrls: ['./film-import.component.css']
})
export class FilmImportComponent implements OnInit {
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
    if (fileCount === 1) {
      console.log('loadFile inputEl.files.item(i)=', inputEl.files.item(0));
      this.formdata = new FormData();
      this.formdata.append('file', inputEl.files.item(0));
    }
  }
}
