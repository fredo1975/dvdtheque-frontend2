import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Film } from '../model/film';
import { FilmDisplayType } from '../model/film-display-type.enum';
import { FilmListParam } from '../model/film-list-param';
import { FilmSearch } from '../model/film-search';
import { Genre } from '../model/genre';
import { Origine } from '../model/origine.enum';
import { Personne } from '../model/personne';
import { FilmService } from '../services/film.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-film-search-display',
  templateUrl: './film-search-display.component.html',
  styleUrls: ['./film-search-display.component.css']
})
export class FilmSearchDisplayComponent implements OnInit {
  origines: string[];
  displayTypes: string[];
  errorOccured: boolean;
  origine: string;
  displayType: string;
  annees: any;
  filmSearch: FilmSearch;
  filmListParam: FilmListParam;
  loading = false;
  films: Film[];
  constructor(protected filmService: FilmService) { }

  ngOnInit(): void {
    this.origine = 'TOUS';
    this.displayType = 'TOUS';
    this.annees = this.filmService.getAnneesSelect();
    // tslint:disable-next-line:max-line-length
    this.origines = [Origine[Origine.DVD], Origine[Origine.EN_SALLE], Origine[Origine.TV], Origine[Origine.GOOGLE_PLAY], Origine[Origine.TOUS]];
    // tslint:disable-next-line:max-line-length
    this.displayTypes = [FilmDisplayType[FilmDisplayType.DERNIERS_AJOUTS], FilmDisplayType[FilmDisplayType.TOUS], FilmDisplayType[FilmDisplayType.DERNIERS_AJOUTS_NON_VUS]];
    this.filmSearch = new FilmSearch('', 0, false, null, null, null, false, Origine.TOUS, FilmDisplayType.TOUS);
    this.filmListParam = { realisateurs: [], acteurs: [], films: [], genres: [], realisateursLength: 0, acteursLength: 0 };
  }

  buildQuery(): string{
    let query = '';
    if (this.filmSearch.titre) {
      query = query.concat('titre:eq:' + this.filmSearch.titre.toLowerCase() + ':AND,');
    }
    if (this.filmSearch.realisateur) {
      query = query.concat('realisateur:eq:' + this.filmSearch.realisateur + ':AND,');
    }
    if (this.filmSearch.acteur) {
      query = query.concat('acteur:eq:' + this.filmSearch.acteur + ':AND,');
    }
    if (this.filmSearch.annee) {
      query = query.concat('annee:eq:' + this.filmSearch.annee + ':AND,');
    }
    return query
  }
  search() {
    let query = this.buildQuery()
    if (query) {
      //console.log(query);
      this.loading = true;
      this.filmService.search(query, 1, 100, '-titre').subscribe((data: Film[]) => {
        //console.log(data);
        this.films = [...data];
      }
        , (error) => {
          this.errorOccured = true;
          this.loading = false;
          console.log(error);
        }
        , () => {
          this.loading = false;
        });
    }

  }

  resetFilter() {
    this.filmSearch.titre = '';
    this.filmSearch.realisateur = null;
    this.filmSearch.acteur = null;
    this.filmSearch.annee = null;
    this.films = null;
  }

  export(){
    this.loading = true;
    this.errorOccured = false;
    const fileName = 'SearchDvdExport';
    //console.log(this.origine,Origine.TOUS);
    this.filmService.exportFilmSearch(this.buildQuery()).subscribe((data: any) => {
      const now = Date.now();
      this.filmService.saveAsExcelFile(data, `${fileName}-${now}` + EXCEL_EXTENSION);
    }
      , (error) => {
        console.log(error);
        this.loading = false;
        this.errorOccured = true;
      }
      , () => {
        this.loading = false;
      });
  }
}
