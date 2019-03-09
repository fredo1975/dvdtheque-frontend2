import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {
  private film: Film;
  titre: string;
  tmdbFilms: Film[];
  buttonDisabled = false;
  loading = false;
  constructor(private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router) { }

  serachTmdbFilm() {
    if (this.titre == null) {
      alert('il faut un titre pour faire une recherche');
      return;
    }
    // console.log('this.titre=' + this.titre);
    this.buttonDisabled = true;
    this.loading = true;
    this.filmService.getAllTmdbFilmsByTitre(this.titre).subscribe((data: Film[]) => {
      this.tmdbFilms = data;
      // console.log(this.tmdbFilms);
    }
    , (error) => {console.log(error); }
    , () => {
      // console.log('serachTmdbFilm Fini !');
      this.buttonDisabled = false;
      this.loading = false;
    });
  }

  saveFilm(tmdbId: number) {
    this.buttonDisabled = true;
    this.loading = true;
    // console.log('tmdbId=' + tmdbId + ' film.id=' + this.film.id + ' film.tmdbId=' + this.film.tmdbId);
    this.filmService.saveFilm(tmdbId).subscribe((filmSaved: Film) => {
      // console.log('film with id : ' + filmSaved.id + ' - ' + filmSaved.titre + ' saved');
      this.film = filmSaved;
      this.tmdbFilms = null;
    }
    , (error) => {console.log(error); this.buttonDisabled = false; }
    , () => {
      // console.log('saveFilm Fini !');
      this.buttonDisabled = false;
      this.loading = false;
      this.router.navigate(['/filmDetail/' + this.film.id]);
    });
  }
  ngOnInit() {
  }

}
