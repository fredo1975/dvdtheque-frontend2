import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { FilmSearchComponent } from '../film-search/film-search.component';
import { Observable } from 'rxjs';
import { Origine } from '../enums/origine.enum';

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
  private ascSortieEnSalleDateSort = true;
  private ascdureeDateSort = false;
  private asctitreSort = false;
  private ascDvdFormatSort = false;
  origine: string;
  constructor(protected filmService: FilmService) {
    // console.log('FilmListComponent constructor origine=' + this.origine);
  }

  ngOnInit() {
    this.origine = 'DVD';
    // console.log('FilmListComponent ngOnInit origine ', this.origine);
    // const origineRetrieved = this.filmService.getOrigine();
    // console.log('FilmListComponent ngOnInit origineRetrieved ', this.filmService.getOrigine());
    if (!this.filmService.getOrigine()) {
      this.filterOnOrigine(this.origine);
    } else {
      this.filterOnOrigine(this.filmService.getOrigine());
    }
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

  newFilterOnOrigine(origineEvent: any) {
    // console.log('FilmListComponent::newFilterOnOrigine::origineEvent', origineEvent);
    this.filmService.setOrigine(origineEvent);
    this.origine = origineEvent;
    this.loading = true;
    this.filmService.getAllFilmsByOrigine(this.origine).subscribe((data: Film[]) => {
      this.films = data;
      this.filteredFilms = data;
      // console.log(this.filteredFilms);
    }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.loading = false;
      });
    this.filmSearchComponent.refreshPersonnes(origineEvent);
  }

  filterOnOrigine(origineEvent: any) {
    // console.log('FilmListComponent::filterOnOrigine::origineEvent', origineEvent);
    this.filmService.setOrigine(origineEvent);
    this.origine = origineEvent;
    this.loading = true;
    this.filmService.getAllFilmsByOrigine(this.origine).subscribe((data: Film[]) => {
      this.films = data;
      this.filteredFilms = data;
      // console.log(this.filteredFilms);
    }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.loading = false;
      });
    this.filmSearchComponent.refreshPersonnes(origineEvent);
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

  newFilterOnVu(event: string): Observable<null> {
    // console.log('FilmListComponent:newFilterOnVu');
    const observable: Observable<null> = new Observable(observer => {
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
      observer.complete();
    });
    return observable;
  }
  sort(sortParam: string) {
    // alert(sortParam);
    if (sortParam === 'daterip') {
      this.sortDateRip();
      this.ascRipDateSort = !this.ascRipDateSort;
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
      this.sortSortieEnSalleDate();
      this.ascSortieEnSalleDateSort = !this.ascSortieEnSalleDateSort;
    }
  }
  private sortSortieEnSalleDate() {
    // elements with daterip null at the end
    const temp: any[] = [];
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (this.filteredFilms[i].dvd.dateSortie) {
        temp.push(this.filteredFilms[i]);
      }
    }
    // tslint:disable-next-line:forin
    for (const i in this.filteredFilms) {
      if (new Date(this.filteredFilms[i].dvd.dateSortie).getTime() === 0) {
        temp.push(this.filteredFilms[i]);
      }
    }
    this.filteredFilms = temp;
    // tslint:disable-next-line:max-line-length
    this.filteredFilms.sort((val1, val2) => {
      if (val1.dvd.dateSortie && val2.dvd.dateSortie) {
        if (this.ascSortieEnSalleDateSort) {
          return new Date(val1.dvd.dateSortie).getTime() - new Date(val2.dvd.dateSortie).getTime();
        } else {
          return new Date(val2.dvd.dateSortie).getTime() - new Date(val1.dvd.dateSortie).getTime();
        }
      } else if (new Date(val1.dvd.dateSortie).getTime() === 0 && val2.dvd.dateSortie) {
        return new Date(val2.dvd.dateSortie).getTime();
      } else if (val1.dvd.dateSortie && new Date(val2.dvd.dateSortie).getTime() === 0) {
        return new Date(val1.dvd.dateSortie).getTime();
      } else {
        return 0;
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
      } else if (new Date(val1.dvd.dateRip).getTime() === 0 && val2.dvd.dateRip) {
        return new Date(val2.dvd.dateRip).getTime();
      } else if (val1.dvd.dateRip && new Date(val2.dvd.dateRip).getTime() === 0) {
        return new Date(val1.dvd.dateRip).getTime();
      } else {
        return 0;
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
