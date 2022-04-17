import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../model/film';
import { Router, ActivatedRoute } from '@angular/router';
import { Origine } from '../model/origine.enum';

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
  filmOrigines: string[];
  origine: Origine;
  errorOccured: boolean;
  constructor(private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    this.filmOrigines = [Origine[Origine.DVD], Origine[Origine.EN_SALLE], Origine[Origine.GOOGLE_PLAY], Origine[Origine.TV]];
  }
  resetTmdbFilm() {
    this.tmdbFilms = null;
    this.titre = null;
  }
  serachTmdbFilm() {
    if (this.titre == null) {
      alert('il faut un titre pour faire une recherche');
      return;
    }
    // console.log('this.titre=' + this.titre);
    this.buttonDisabled = true;
    this.loading = true;
    this.errorOccured = false;
    this.filmService.getAllTmdbFilmsByTitre(this.titre).subscribe((data: Film[]) => {
      if(data){
        this.tmdbFilms = data;
      }else{
        this.tmdbFilms = [];
      }
      
      console.log(this.tmdbFilms);
    }
      , (error) => {
        this.errorOccured = true;
        this.loading = false;
        this.buttonDisabled = false;
        console.log(error);
      }
      , () => {
        // console.log('serachTmdbFilm Fini !');
        this.buttonDisabled = false;
        this.errorOccured = false;
        this.loading = false;
      });
  }

  saveFilm(tmdbId: number) {
    if (this.origine == null) {
      alert('il faut une origine au film pour l\'ajouter');
      return;
    }
    this.buttonDisabled = true;
    this.loading = true;
    this.errorOccured = false;
    // console.log('tmdbId=' + tmdbId + ' film.id=' + this.film.id + ' film.tmdbId=' + this.film.tmdbId);
    this.filmService.saveFilm(tmdbId, this.origine).subscribe((filmSaved: Film) => {
      // console.log('film with id : ' + filmSaved.id + ' - ' + filmSaved.titre + ' saved');
      this.film = filmSaved;
      this.tmdbFilms = null;
    }
      , (error) => {
        this.errorOccured = true;
        this.buttonDisabled = false;
        console.log(error); this.buttonDisabled = false;
      }
      , () => {
        // console.log('saveFilm Fini !');
        this.buttonDisabled = false;
        this.loading = false;
        this.router.navigate(['/filmDetail/' + this.film.id]);
      });
  }
}
