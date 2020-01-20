import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { Film } from '../film';

@Component({
  selector: 'app-film-admin',
  templateUrl: './film-admin.component.html',
  styleUrls: ['./film-admin.component.css']
})
export class FilmAdminComponent extends FilmListComponent implements OnInit {
  buttonDisabled = false;
  private film: Film;

  removeFilm(id: number) {
    const confir = confirm('Sûr ?');
    if (confir) {
      this.buttonDisabled = true;
      this.loading = true;
      // console.log('id=', id);
      this.filmService.removeFilm(id).subscribe(obs => {
        console.log('film with id : ' + id + ' removed');
      }
        , (error) => { console.log(error); this.buttonDisabled = false; }
        , () => {
          // console.log('removeFilm Fini !');
          this.buttonDisabled = false;
          this.loading = false;
          this.filterOnDisplayTypeAndOrigine(this.filmService.getOrigine(), this.filmService.getDisplayType());
        });
    }
  }
}
