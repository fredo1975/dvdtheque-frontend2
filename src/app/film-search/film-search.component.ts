import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { Personne } from '../personne';
import { FilmSearch } from '../film-search';
@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {
  private annees: number[];
  private realisateurs: Personne[];
  private acteurs: Personne[];
  private filmSearch: FilmSearch;
  @Output() filterChange = new EventEmitter<string>();
  @Output() realChange = new EventEmitter<number>();
  @Output() anneeChange = new EventEmitter<number>();
  @Output() acteurChange = new EventEmitter<number>();
  @Output() rippedChange = new EventEmitter<string>();

  constructor(private filmService: FilmService) {
    const real = new Personne(0, '', '');
    const act1 = new Personne(0, '', '');
    this.filmSearch = new FilmSearch('', 0, false, real, act1);
  }

  ngOnInit() {
    this.annees = this.filmService.getAnneesSelect();
    this.filmService.getAllActeurs().subscribe((data: Personne[]) => {
        this.acteurs = data;
    }
    , (error) => {console.log('an error occured when fetching all acteurs'); });
    this.filmService.getAllRealisateurs().subscribe((data: Personne[]) => {
      this.realisateurs = data;
    }
    , (error) => {console.log('an error occured when fetching all realisateurs'); });
  }
  findTitre(event: any) { // without type info
    // console.log('event.target.value=' + event.target.value);
    this.filterChange.emit(event.target.value);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
  }
  filterOnRealisateur(event: any) {
    // console.log('event=' + event);
    this.realChange.emit(event);
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
  }
  filterOnAnnee(event: any) {
    // console.log('event=' + event);
    this.anneeChange.emit(event);
    this.filmSearch.realisateur = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
    this.filmSearch.ripped = null;
  }
  filterOnActeur(event: any) {
    // console.log('event=' + event.id);
    this.acteurChange.emit(event.id);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.ripped = null;
  }
  filterOnRipped(event: any) {
    // console.log('event.target.value=' + event);
    this.rippedChange.emit(event);
    this.filmSearch.realisateur = null;
    this.filmSearch.annee = null;
    this.filmSearch.titre = null;
    this.filmSearch.acteur = null;
  }
}
