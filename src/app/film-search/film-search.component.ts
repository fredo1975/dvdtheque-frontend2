import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { Personne } from '../personne';
import { Genre } from '../genre';
import { FilmSearch } from '../film-search';
@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {
  annees: number[];
  realisateurs: Personne[];
  acteurs: Personne[];
  genres: Genre[];
  filmSearch: FilmSearch;
  loadingAllRealisateurs = false;
  loadingAllActeurs = false;
  loadingAllGenres = false;
  @Output() filterChange = new EventEmitter<string>();
  @Output() realChange = new EventEmitter<number>();
  @Output() anneeChange = new EventEmitter<number>();
  @Output() acteurChange = new EventEmitter<number>();
  @Output() rippedChange = new EventEmitter<string>();
  @Output() genreChange = new EventEmitter<string>();
  @Output() vuChange = new EventEmitter<string>();
  @Input() origine: string;

  constructor(private filmService: FilmService) {
    const real = new Personne(0, '', '', '');
    const act1 = new Personne(0, '', '', '');
    const genre = '';
    this.filmSearch = new FilmSearch('', 0, false, real, act1, '', false);
  }

  ngOnInit() {
    this.loadingAllActeurs = true;
    this.annees = this.filmService.getAnneesSelect();
    this.filmService.getAllActeursByOrigine(this.origine).subscribe((data: Personne[]) => {
      this.acteurs = data;
    }
      , (error) => { console.log('an error occured when fetching all acteurs'); }
      , () => {
        this.loadingAllActeurs = false;
      });
    this.loadingAllRealisateurs = true;
    this.filmService.getAllRealisateursByOrigine(this.origine).subscribe((data: Personne[]) => {
      this.realisateurs = data;
    }
      , (error) => { console.log('an error occured when fetching all realisateurs'); }
      , () => {
        this.loadingAllRealisateurs = false;
      });
    this.loadingAllGenres = true;
    this.filmService.getAllGenres().subscribe((data: Genre[]) => {
      this.genres = data;
    }
      , (error) => { console.log('an error occured when fetching all genres'); }
      , () => {
        this.loadingAllGenres = false;
      });
  }

  resetFilter() {
    this.filmSearch.titre = null;
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
    this.filmSearch.genre = null;
    this.filmSearch.vu = null;
  }

  findTitre(event: any) { // without type info
    // console.log('event.target.value=' + event.target.value);
    this.filterChange.emit(event.target.value);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
    this.filmSearch.genre = null;
    this.filmSearch.vu = null;
  }
  filterOnRealisateur(event: any) {
    console.log('FilmSearchComponent::filterOnRealisateur=', event);
    this.realChange.emit(event);
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
    this.filmSearch.genre = null;
    this.filmSearch.vu = null;
  }
  filterOnAnnee(event: any) {
    // console.log('event=' + event);
    this.anneeChange.emit(event);
    this.filmSearch.realisateur = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
    this.filmSearch.genre = null;
    this.filmSearch.vu = null;
  }
  filterOnActeur(event: any) {
    // console.log('event=' + event.id);
    this.acteurChange.emit(event.id);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.ripped = null;
    this.filmSearch.genre = null;
    this.filmSearch.vu = null;
  }
  filterOnRipped(event: any) {
    // console.log('event.target.value=' + event);
    this.rippedChange.emit(event);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.genre = null;
    this.filmSearch.vu = null;
  }
  filterOnGenre(event: any) {
    // console.log('event.target.value=' + event);
    this.genreChange.emit(event);
    this.filmSearch.ripped = null;
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.vu = null;
  }
  filterOnVu(event: any) {
    // console.log('event.target.value=' + event);
    this.vuChange.emit(event);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.genre = null;
  }
}
