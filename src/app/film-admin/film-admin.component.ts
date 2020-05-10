import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { Film } from '../model/film';

@Component({
  selector: 'app-film-admin',
  templateUrl: './film-admin.component.html',
  styleUrls: ['./film-admin.component.css']
})
export class FilmAdminComponent extends FilmListComponent implements OnInit {
  buttonDisabled = false;
  private film: Film;

  removeFilm(id: number) {
    const confir = confirm('Sûr de supprimer le film?');
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
          // console.log('fremoveFilm', this.filmService.getOrigine(), this.filmService.getDisplayType());
          this.filterOnDisplayTypeAndOrigine(this.filmService.getDisplayType(), this.filmService.getOrigine());
        });
    }
  }

  retrieveFilmImage(id: number) {
    const confir = confirm('Sûr de récupérer pour le film id=' + id + '?');
    if (confir) {
      this.buttonDisabled = true;
      this.loading = true;
      // console.log('id=', id);
      this.filmService.retrieveFilmImage(id).subscribe(obs => {
        console.log('image retrieved for film with id : ' + id);
      }
        , (error) => { console.log(error); this.buttonDisabled = false; }
        , () => {
          // console.log('removeFilm Fini !');
          this.buttonDisabled = false;
          this.loading = false;
          // console.log('fremoveFilm', this.filmService.getOrigine(), this.filmService.getDisplayType());
          this.filterOnDisplayTypeAndOrigine(this.filmService.getDisplayType(), this.filmService.getOrigine());
        });
    }
  }
  cleanAllCaches() {
    const confir = confirm('Sûr d\'effacer les caches ?');
    if (confir) {
      this.buttonDisabled = true;
      this.loading = true;
      // console.log('id=', id);
      this.filmService.cleanAllCaches().subscribe(obs => {
        console.log('caches cleaned');
      }
        , (error) => { console.log(error); this.buttonDisabled = false; }
        , () => {
          // console.log('removeFilm Fini !');
          this.buttonDisabled = false;
          this.loading = false;
          // console.log('fremoveFilm', this.filmService.getOrigine(), this.filmService.getDisplayType());
          this.filterOnDisplayTypeAndOrigine(this.filmService.getDisplayType(), this.filmService.getOrigine());
        });
    }
  }

  retrieveAllFilmImages() {
    const confir = confirm('Sûr de récupérer toutes les images manquantes?');
    if (confir) {
      this.buttonDisabled = true;
      this.loading = true;
      // console.log('id=', id);
      this.filmService.retrieveAllFilmImages().subscribe(obs => {
        console.log('all images retrieved');
      }
        , (error) => { console.log(error); this.buttonDisabled = false; }
        , () => {
          // console.log('removeFilm Fini !');
          this.buttonDisabled = false;
          this.loading = false;
          // console.log('fremoveFilm', this.filmService.getOrigine(), this.filmService.getDisplayType());
          this.filterOnDisplayTypeAndOrigine(this.filmService.getDisplayType(), this.filmService.getOrigine());
        });
    }
  }
}
