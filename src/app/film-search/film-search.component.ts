import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FilmService } from '../film.service';
import { Personne } from '../personne';
import { Genre } from '../genre';
import { FilmSearch } from '../film-search';
import { Origine } from '../enums/origine.enum';
import { FilmDisplayType } from '../enums/film-display-type.enum';
import { FilmListParam } from '../interfaces/film-list-param';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {
  annees: number[];
  filmSearch: FilmSearch;
  @Output() filterChange = new EventEmitter<string>();
  @Output() realChange = new EventEmitter<number>();
  @Output() anneeChange = new EventEmitter<number>();
  @Output() acteurChange = new EventEmitter<number>();
  @Output() rippedChange = new EventEmitter<string>();
  @Output() genreChange = new EventEmitter<string>();
  @Output() vuChange = new EventEmitter<string>();
  @Output() origineChange = new EventEmitter<any>();
  @Output() displayTypeChange = new EventEmitter<any>();
  @Input() origine: string;
  @Input() loading: boolean;
  @Input() displayType: string;
  @Input() filmListParam: FilmListParam;
  origines: string[];
  displayTypes: string[];
  constructor(private filmService: FilmService) {
    const real = new Personne(0, '', '', '');
    const act1 = new Personne(0, '', '', '');
    const genre = '';
    this.filmSearch = new FilmSearch('', 0, false, real, act1, genre, false, Origine.DVD, FilmDisplayType.DERNIERS_AJOUTS);
  }

  ngOnInit() {
    console.log('FilmSearchComponent::ngOnInit', this.filmService.getOrigine(), this.filmService.getDisplayType());
    this.annees = this.filmService.getAnneesSelect();
    // tslint:disable-next-line:max-line-length
    this.origines = [Origine[Origine.DVD], Origine[Origine.EN_SALLE], Origine[Origine.TV], Origine[Origine.GOOGLE_PLAY], Origine[Origine.TOUS]];
    // tslint:disable-next-line:max-line-length
    this.displayTypes = [FilmDisplayType[FilmDisplayType.DERNIERS_AJOUTS], FilmDisplayType[FilmDisplayType.TOUS], FilmDisplayType[FilmDisplayType.DERNIERS_AJOUTS_NON_VUS]];
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
    // console.log('FilmSearchComponent::filterOnRealisateur::event', event);
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
  filterOnOrigine(event: any) {
    // console.log('FilmSearchComponent::filterOnOrigine event', event);
    this.origineChange.emit(event);
    this.filmSearch.vu = null;
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.genre = null;
  }
  filterOnDisplayType(event: any) {
    // console.log('FilmSearchComponent::filterOnDisplayType event', event);
    this.displayTypeChange.emit(event);
    this.filmSearch.vu = null;
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.genre = null;
  }
}
