import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { FilmSearchComponent } from '../film-search/film-search.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films: Film[];
  filteredFilms: Film[];
  // @Input() origine: string;
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
  constructor(protected filmService: FilmService) {
    // console.log('FilmListComponent constructor origine=' + this.origine);
  }

  ngOnInit() {
    this.origine = 'DVD';
    this.displayType = 'DERNIERS_AJOUTS';
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

    // console.log('FilmListComponent ngOnInit origine ', this.origine);
    // const origineRetrieved = this.filmService.getOrigine();
    // console.log('FilmListComponent ngOnInit origineRetrieved ', this.filmService.getOrigine());
    this.filterOnOrigine(this.filmService.getOrigine());
  }

  resetFilter() {
    this.filmSearchComponent.resetFilter();
    this.filteredFilms = this.films;
  }

  getAllFilms(): Observable<Film[]> {
    return this.filmService.loadAll();
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
      for (let j = 0; j < this.films[i].realisateurs.length; j++) {
        if (this.films[i].realisateurs[j].id === id) {
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
        if (this.films[i].dvd && this.films[i].dvd.ripped === ripped) {
          this.filteredFilms.push(this.films[i]);
        }
      }
    }
  }
  filterOnGenre(genre: string) {
    this.filteredFilms = [];
    for (let i = 0; i < this.films.length; i++) {
      for (let j = 0; j < this.films[i].genres.length; j++) {
        if (this.films[i].genres[j].name === genre) {
          this.filteredFilms.push(this.films[i]);
          break;
        }
      }
    }
  }
  filterOnDisplayType(displayTypeEvent: any) {
    // console.log('FilmListComponent::filterOnDisplayType::displayTypeEvent', displayTypeEvent, this.filmService.getOrigine());
    this.filmService.setDisplayType(displayTypeEvent);
    this.loading = true;
    this.filmService.getAllFilmsByOrigineAndDisplayType(this.filmService.getOrigine(), displayTypeEvent).subscribe((data: Film[]) => {
      this.films = [...data];
      this.filteredFilms = [...data];
    }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.filmSearchComponent.refreshPersonnes(this.filmService.getOrigine(), displayTypeEvent);
        this.loading = false;
      });
  }
  filterOnOrigine(origineEvent: any) {
    // console.log('FilmListComponent::filterOnOrigine::origineEvent', origineEvent, this.filmService.getDisplayType());
    this.filmService.setOrigine(origineEvent);
    this.loading = true;
    this.filmService.getAllFilmsByOrigineAndDisplayType(origineEvent, this.filmService.getDisplayType()).subscribe((data: Film[]) => {
      this.films = [...data];
      this.filteredFilms = [...data];
    }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.filmSearchComponent.refreshPersonnes(origineEvent, this.filmService.getDisplayType());
        this.loading = false;
      });
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
}
