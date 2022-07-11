import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../model/film';
import { FilmSearchComponent } from '../film-search/film-search.component';
import { FilmListParam } from '../model/film-list-param';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films: Film[];
  filmListParam: FilmListParam;
  filteredFilms: Film[];
  @ViewChild(FilmSearchComponent, { static: true }) filmSearchComponent: FilmSearchComponent;
  loading = false;
  private ascRipDateSort = true;
  private ascRipDateInsertion = true;
  private ascSortieEnSalleDateSort = true;
  private ascSortieEnDvdDateSort = true;
  private ascdureeDateSort = false;
  private asctitreSort = false;
  private ascDvdFormatSort = false;
  origine: string;
  displayType: string;
  errorOccured: boolean;
  limitFilmSizeList: number[];
  limitFilmSizeSelected: number;
  constructor(protected filmService: FilmService) {
    // console.log('FilmListComponent constructor origine=' + this.origine);
  }

  ngOnInit() {
    this.origine = 'DVD';
    this.displayType = 'DERNIERS_AJOUTS';
    this.limitFilmSizeList = this.filmService.getLimitFilmSizeSelect();
    //console.log(this.limitFilmSizeList);
    if (!this.filmService.getOrigine()) {
      this.filmService.setOrigine(this.origine);
    } else {
      this.origine = this.filmService.getOrigine();
    }
    if (!this.filmService.getDisplayType()) {
      this.filmService.setDisplayType(this.displayType);
    } else {
      this.displayType = this.filmService.getDisplayType();
    }
    
    if (!this.filmService.getLimitFilmSize()) {
      this.limitFilmSizeSelected = this.limitFilmSizeList[0];
      this.filmService.setLimitFilmSize(this.limitFilmSizeSelected);
    } else {
      this.limitFilmSizeSelected = this.filmService.getLimitFilmSize();
    }
    // console.log('FilmListComponent ngOnInit origine ', this.origine);
    // const origineRetrieved = this.filmService.getOrigine();
    // console.log('FilmListComponent ngOnInit origineRetrieved ', this.filmService.getOrigine());
    this.filterOnOrigine(this.filmService.getOrigine());
  }

  resetFilter() {
    this.filmSearchComponent.resetFilter();
    this.filteredFilms = this.films;
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
    // console.log('FilmListComponent::filterOnRealisateur::id', event);
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      for (let j = 0; j < this.films[i].realisateur.length; j++) {
        if (this.films[i].realisateur[j].id === id) {
          this.filteredFilms.push(this.films[i]);
        }
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
      for (let j = 0; j < this.films[i].acteur.length; j++) {
        if (this.films[i].acteur[j].id === acteur) {
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
        if (this.films[i].dvd && this.films[i].dvd.ripped === ripped) {
          this.filteredFilms.push(this.films[i]);
        }
      }
    }
  }
  filterOnGenre(genre: string) {
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      for (let j = 0; j < this.films[i].genre.length; j++) {
        if (this.films[i].genre[j].name === genre) {
          this.filteredFilms.push(this.films[i]);
          break;
        }
      }
    }
  }
  protected filterOnDisplayTypeAndOrigine(displayTypeEvent: any, origineEvent: any) {
    console.log('FilmListComponent::filterOnDisplayTypeAndOrigine::this.filmService.getLimitFilmSize()=', displayTypeEvent, origineEvent,this.filmService.getLimitFilmSize());
    this.loading = true;
    this.errorOccured = false;
    this.filmService.findFilmListParamByFilmDisplayTypeParam(origineEvent, displayTypeEvent, this.filmService.getLimitFilmSize()).subscribe((data: FilmListParam) => {
      this.films = [...data.films];
      this.filteredFilms = [...data.films];
      // tslint:disable-next-line:max-line-length
      this.filmListParam = { realisateurs: data.realisateurs, acteurs: data.acteurs, films: data.films, genres: data.genres, realisateursLength: data.realisateursLength, acteursLength: data.acteursLength };
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
  filterOnDisplayType(displayTypeEvent: any) {
    // console.log('FilmListComponent::filterOnDisplayType::displayTypeEvent', displayTypeEvent, this.filmService.getOrigine());
    this.filmService.setDisplayType(displayTypeEvent);
    this.loading = true;
    this.filterOnDisplayTypeAndOrigine(displayTypeEvent, this.filmService.getOrigine());
  }
  filterOnOrigine(origineEvent: any) {
    // console.log('FilmListComponent::filterOnOrigine::origineEvent', origineEvent, this.filmService.getDisplayType());
    this.filmService.setOrigine(origineEvent);
    this.filterOnDisplayTypeAndOrigine(this.filmService.getDisplayType(), origineEvent);
  }

  filterOnVu(event: string) {
    if (event === 'tous') {
      this.filteredFilms = this.films;
    } else {
      this.filteredFilms = [];
      const vu = event === 'vu' ? true : false;
      for (let i = 0; i < this.films.length; i++) {
        if (this.films[i].vu === vu) {
          this.filteredFilms.push(this.films[i]);
        }
      }
    }
  }

  sort(sortParam: string) {
    // alert(sortParam);
    if (sortParam === 'daterip') {
      this.sortDateRip();
      this.ascRipDateSort = !this.ascRipDateSort;
    }
    if (sortParam === 'dateInsertion') {
      this.sortDateInsertion();
      this.ascRipDateInsertion = !this.ascRipDateInsertion;
    }
    if (sortParam === 'titre') {
      // this.filteredFilms.sort((val1, val2) => val1.titre - val2.titre);
      this.sortTitre();
      this.asctitreSort = !this.asctitreSort;
    }
    if (sortParam === 'duree') {
      this.sortDuree();
      this.ascdureeDateSort = !this.ascdureeDateSort;
    }
    if (sortParam === 'dvdformat') {
      this.sortDvdFormat();
      this.ascDvdFormatSort = !this.ascDvdFormatSort;
    }
    if (sortParam === 'dateSortieEnSalle') {
      // console.log('dateSortieEnSalle');
      this.sortSortieEnSalleDate();
      this.ascSortieEnSalleDateSort = !this.ascSortieEnSalleDateSort;
    }
    if (sortParam === 'dateSortieEnDvd') {
      console.log('dateSortieEnDvd');
      this.sortSortieEnDvdDate();
      this.ascSortieEnSalleDateSort = !this.ascSortieEnSalleDateSort;
    }
  }

  private sortSortieEnDvdDate() {
    // elements with dateSortie null at the end
    const temp: any[] = [];
    console.log('sortSortieEnDvdDate');
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i].dvd && this.filteredFilms[i].dvd.dateSortie) {
        temp.push(this.filteredFilms[i]);
      }
    }

    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i].dvd && !this.filteredFilms[i].dvd.dateSortie) {
        temp.push(this.filteredFilms[i]);
      }
    }
    this.filteredFilms = [...temp];
    // tslint:disable-next-line:max-line-length
    this.filteredFilms.sort((val1, val2) => {
      if (val1.dvd && val2.dvd && val1.dvd.dateSortie && val2.dvd.dateSortie) {
        if (this.ascSortieEnDvdDateSort) {
          return new Date(val1.dvd.dateSortie).getTime() - new Date(val2.dvd.dateSortie).getTime();
        } else {
          return new Date(val2.dvd.dateSortie).getTime() - new Date(val1.dvd.dateSortie).getTime();
        }
      }
    });
  }
  private sortSortieEnSalleDate() {
    // elements with dateSortie null at the end
    const temp: any[] = [];
    console.log('sortSortieEnSalleDate');
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i] && this.filteredFilms[i].dateSortie) {
        temp.push(this.filteredFilms[i]);
      }
    }

    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (!this.filteredFilms[i].dateSortie) {
        temp.push(this.filteredFilms[i]);
      }
    }
    this.filteredFilms = [...temp];
    // tslint:disable-next-line:max-line-length
    this.filteredFilms.sort((val1, val2) => {
      if (val1.dateSortie && val2.dateSortie) {
        if (this.ascSortieEnSalleDateSort) {
          return new Date(val1.dateSortie).getTime() - new Date(val2.dateSortie).getTime();
        } else {
          return new Date(val2.dateSortie).getTime() - new Date(val1.dateSortie).getTime();
        }
      }
    });
  }
  private sortDateInsertion() {
    // elements with dateInsertion null at the end
    const temp: any[] = [];
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i].dateInsertion) {
        temp.push(this.filteredFilms[i]);
      }
    }
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (new Date(this.filteredFilms[i].dateInsertion).getTime() === 0) {
        temp.push(this.filteredFilms[i]);
      }
    }
    this.filteredFilms = temp;
    // tslint:disable-next-line:max-line-length
    this.filteredFilms.sort((val1, val2) => {
      if (val1.dateInsertion && val2.dateInsertion) {
        if (this.ascRipDateInsertion) {
          return new Date(val1.dateInsertion).getTime() - new Date(val2.dateInsertion).getTime();
        } else {
          return new Date(val2.dateInsertion).getTime() - new Date(val1.dateInsertion).getTime();
        }
      }
    });
  }
  private sortDateRip() {
    // elements with daterip null at the end
    const temp: any[] = [];
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i].dvd && this.filteredFilms[i].dvd.dateRip) {
        temp.push(this.filteredFilms[i]);
      }
    }
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i].dvd && new Date(this.filteredFilms[i].dvd.dateRip).getTime() === 0) {
        temp.push(this.filteredFilms[i]);
      }
    }
    this.filteredFilms = temp;
    // tslint:disable-next-line:max-line-length
    this.filteredFilms.sort((val1, val2) => {
      if (val1.dvd.dateRip && val2.dvd.dateRip) {
        if (this.ascRipDateSort) {
          return new Date(val1.dvd.dateRip).getTime() - new Date(val2.dvd.dateRip).getTime();
        } else {
          return new Date(val2.dvd.dateRip).getTime() - new Date(val1.dvd.dateRip).getTime();
        }
      }
    });
  }
  private sortTitre() {
    this.filteredFilms.sort((val1, val2) => {
      val1.titre.toLowerCase();
      val2.titre.toLowerCase();
      if (this.asctitreSort) {
        return val1.titre.toLowerCase() > val2.titre.toLowerCase() ? -1 : val2.titre.toLowerCase() > val1.titre.toLowerCase() ? 1 : 0;
      } else {
        return val2.titre.toLowerCase() > val1.titre.toLowerCase() ? -1 : val1.titre.toLowerCase() > val2.titre.toLowerCase() ? 1 : 0;
      }
    });
  }
  private sortDuree() {
    // console.log(this.filteredFilms);
    if (this.ascdureeDateSort) {
      this.filteredFilms.sort((val1, val2) => val1.runtime - val2.runtime);
    } else {
      this.filteredFilms.sort((val1, val2) => val2.runtime - val1.runtime);
    }
  }
  private sortDvdFormat() {
    this.filteredFilms.sort((val1, val2) => {
      // tslint:disable-next-line:max-line-length
      if (this.ascDvdFormatSort) {
        // tslint:disable-next-line:max-line-length
        return val1.dvd.format.toString().toLowerCase() > val2.dvd.format.toString().toLowerCase() ? -1 : val2.dvd.format.toString().toLowerCase() > val1.dvd.format.toString().toLowerCase() ? 1 : 0;
      } else {
        // tslint:disable-next-line:max-line-length
        return val2.dvd.format.toString().toLowerCase() > val1.dvd.format.toString().toLowerCase() ? -1 : val1.dvd.format.toString().toLowerCase() > val2.dvd.format.toString().toLowerCase() ? 1 : 0;
      }
    });
  }

  limitFilmSizeSelect(event: any){
    //console.log(event);
    this.limitFilmSizeSelected = event;
  }
}
