import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { FilmSearch } from '../film-search';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, OnChanges {
  films: Film[];
  filteredFilms: Film[];
  @Input() filmSearch: FilmSearch;
  @Input() realFilmSearch: FilmSearch;
  @Input() anneeFilmSearch: FilmSearch;
  @Input() acteurFilmSearch: FilmSearch;
  @Input() rippedFilmSearch: FilmSearch;

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getAllFilms().subscribe((data: Film[]) => {
      this.films = data;
      this.films.map(f => f.posterPath = this.getPosterImg(f));
      this.filteredFilms = data;
      this.filteredFilms.map(f => f.posterPath = this.getPosterImg(f));
    }
    , (error) => {console.log(error); });
  }

  ngOnChanges() {
    /*
    this.getAllFilms().subscribe((data: Film[]) => {this.films = Object.assign({}, data); }
    , (error) => {console.log(error); });
    console.log('filmSearch changed');*/
  }

  getAllFilms(): Observable<Film[]> {
    return this.filmService.loadAll();
  }

  getPosterImg (film: Film) {
    // console.log(environment.poster_url + this.filmService.getFilmPosterName(film.titre));
    return environment.poster_url + this.filmService.getFilmPosterName(film.titre);
  }

  filterOnTitre(titre: string) {
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      const re = new RegExp(titre, 'gi');
      if (this.films[i].titre.match(re)) {
        this.filteredFilms.push(this.films[i]);
      }
    }
  }

  filterOnRealisateur(id: number) {
    // console.log('FilmListComponent::filterOnRealisateur::id=' + id);
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      if (this.films[i].realisateur.id === id) {
        this.filteredFilms.push(this.films[i]);
      }
    }
  }

  filterOnAnnee(annee: number) {
    // console.log('FilmListComponent::filterOnAnnee::annee=' + annee);
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      if (this.films[i].annee === annee) {
        this.filteredFilms.push(this.films[i]);
      }
    }
  }

  filterOnActeur(acteur: number) {
    // console.log('FilmListComponent::filterOnActeur::acteur.id=' + acteur);
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      for (let j = 0; j < this.films[i].acteurs.length; j++) {
        if (this.films[i].acteurs[j].id === acteur) {
          this.filteredFilms.push(this.films[i]);
        }
      }
    }
  }

  filterOnRipped(event: string) {
    // console.log('FilmListComponent::filterOnRipped::event=' + event);
    if (event === 'tous') {
      this.filteredFilms = this.films;
    } else {
      this.filteredFilms = [];
      const ripped = event === 'ripped' ? true : false;
      for (let i = 0; i < this.films.length; i++) {
        if (this.films[i].ripped === ripped) {
          this.filteredFilms.push(this.films[i]);
        }
      }
    }
  }
}
