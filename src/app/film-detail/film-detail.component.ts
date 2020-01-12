import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../film';
import { Personne } from '../personne';
import { FilmService } from '../film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DvdFormat } from '../dvd-format.enum';
import { Dvd } from '../dvd';
import { Origine } from '../enums/origine.enum';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { isNumber } from 'util';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  @Input() film: Film;
  @Input() replacedFilm: Film;
  private realisateurs: Personne[];
  private acteurs: Personne[];
  private acteursFilm: Personne[];
  private annees: number[];
  private dvdFormats: string[];
  private zonesList: number[];
  private newActeurSet: Personne[];
  private updated = false;
  loading = false;
  buttonDisabled = false;
  private dateSortie: NgbDateStruct;
  private dateInsertion: NgbDateStruct;
  constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.buttonDisabled = true;
    this.filmService.getFilm(this.route.snapshot.params['id']).subscribe(_film => {
      this.film = _film;
    }
      , (error) => { console.log('an error occured when fetching film with id : ' + this.route.snapshot.params['id']); }
      , () => {
        this.loading = false;
        this.buttonDisabled = false;
      });
    this.annees = this.filmService.getAnneesSelect();
    this.zonesList = this.getZonesList();
    this.dvdFormats = [null, DvdFormat[DvdFormat.BLUERAY], DvdFormat[DvdFormat.DVD]];
  }

  getZonesList = () => {
    const zonesList = [];
    for (let i = 1; i < 4; i++) {
      zonesList.push(i);
    }
    return zonesList;
  }
  comparePersonne(a: Personne, b: Personne): boolean {
    return a.id === b.id;
  }

  setRippedSelected(selectElement, film: Film) {
    if (selectElement.checked) {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' checked');
      this.film.dvd.ripped = true;
    } else {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' unchecked');
      this.film.dvd.ripped = false;
    }
  }
  setVuSelected(selectElement, film: Film) {
    if (selectElement.checked) {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' checked');
      this.film.vu = true;
    } else {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' unchecked');
      this.film.vu = false;
    }
  }
  updateFilm() {
    if (this.film.dvd && isNaN(this.film.dvd.annee)) {
      // console.log('this.film.dvd.annee is nan');
      this.film.dvd.annee = 0;
    }
    if (this.film.dvd) {
      // console.log('this.film.dvd.annee is nan');
      this.film.dvd.annee = 0;
    }
    console.log('this.dateSortie', this.dateSortie);
    if (this.dateSortie && this.film.dvd) {
      const day = this.dateSortie.day;
      const month = this.dateSortie.month - 1;
      const year = this.dateSortie.year;
      // const dvd = new Dvd(year, '1', 'edition', false, null, new Date(year, month, day), DvdFormat.DVD);
      // tslint:disable-next-line:max-line-length
      const dvd = { id: null, annee: year, zone: '1', edition: 'edition', ripped: false, dateRip: null, dateSortie: new Date(year, month, day), format: DvdFormat.DVD };
      this.film.dvd = dvd;
      console.log('this.film.dvd.dateSortie', this.film.dvd.dateSortie);
    }
    if (this.dateInsertion) {
      const day = this.dateInsertion.day;
      const month = this.dateInsertion.month - 1;
      const year = this.dateInsertion.year;
      // const dvd = new Dvd(year, '1', 'edition', false, null, new Date(year, month, day), DvdFormat.DVD);
      // tslint:disable-next-line:max-line-length
      this.film.dateInsertion = new Date(year, month, day);
      console.log('this.film.dateInsertion', this.film.dateInsertion);
    }
    this.loading = true;
    this.buttonDisabled = true;
    return this.filmService.updateFilm(this.film).subscribe(f => {
      // console.log('film with id : ' + f.id + ' updated');
      this.film = f;
    }
      , (error) => { console.log(error); }
      , () => {
        this.loading = false;
        this.buttonDisabled = false;
        this.updated = true;
      });
  }

  buildFilmWithDvd(film: Film): Film {
    // tslint:disable-next-line:max-line-length
    const dvd: Dvd = { id: null, annee: this.film.annee, zone: '2', edition: '', ripped: false, dateRip: null, dateSortie: this.film.dvd.dateSortie, format: DvdFormat.DVD }
    // console.log('buildFilmWithDvd', JSON.stringify(dvd));
    // tslint:disable-next-line:max-line-length
    return new Film(film.id, film.titre, film.titreO, film.annee, film.dateSortie, film.dateInsertion, film.vu, film.realisateurs, film.acteurs, film.genres,
      // tslint:disable-next-line:max-line-length
      dvd, film.posterPath, film.alreadyInDvdtheque, film.tmdbId, film.overview, film.runtime, film.homepage, Origine.DVD);
  }

  transformFilmEnSalleIntoDvd() {
    this.loading = true;
    this.buttonDisabled = true;
    const film: Film = this.buildFilmWithDvd(this.film);
    // console.log('transformFilmEnSalleIntoDvd', film);
    return this.filmService.updateFilm(film).subscribe(f => {
      this.film = f;
    }
      , (error) => { console.log(error); }
      , () => {
        this.loading = false;
        this.buttonDisabled = false;
        this.updated = true;
      });
  }

  doReplaceFilm(filmEmitted: Film) {
    // console.log('filmEmitted with id : ' + filmEmitted.id + '  emitted');
    this.film = filmEmitted;
  }
}
