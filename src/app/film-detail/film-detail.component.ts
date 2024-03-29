import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../model/film';
import { Personne } from '../model/personne';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DvdFormat } from '../model/dvd-format.enum';
import { Dvd } from '../model/dvd';
import { Origine } from '../model/origine.enum';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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
  private critiquePresseExist = true;
  loading = false;
  buttonDisabled = false;
  errorOccured = false;
  private dateSortie: NgbDateStruct;
  private dateInsertion: NgbDateStruct;
  constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) {
  }

  checkIfCritiquePresseExist(){
    if (this.film.critiquePresse && this.film.critiquePresse.length > 0) {
      // console.log('ngOnInit this.film.critiquesPresse');
    } else {
      // console.log('ngOnInit !! this.film.critiquesPresse');
      this.critiquePresseExist = false;
    }
  }
  ngOnInit() {
    this.loading = true;
    this.buttonDisabled = true;
    this.filmService.getFilm(this.route.snapshot.params['id']).subscribe(_film => {
      this.film = _film;
      //console.log(this.film)
    }
      , (error) => {
        console.log('an error occured when fetching film with id : ' + this.route.snapshot.params['id']);
        this.loading = false;
      }
      , () => {
        this.checkIfCritiquePresseExist();
        this.loading = false;
      });
    
    this.buttonDisabled = false;
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
      this.film.dvd.dateRip = new Date;
    } else {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' unchecked');
      this.film.dvd.ripped = false;
    }
  }
  setVuSelected(selectElement, film: Film) {
    if (selectElement.checked) {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' checked');
      this.film.vu = true;
      this.film.dateVue = new Date;
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
    if (this.dateSortie) {
      // console.log('this.dateSortie', this.dateSortie);
      const day = this.dateSortie.day;
      const month = this.dateSortie.month - 1;
      const year = this.dateSortie.year;
      // const dvd = new Dvd(year, '1', 'edition', false, null, new Date(year, month, day), DvdFormat.DVD);
      // tslint:disable-next-line:max-line-length
      const dvd = { id: null, annee: year, zone: '2', edition: 'edition', ripped: false, dateRip: null, dateSortie: new Date(year, month, day), format: DvdFormat.DVD };
      this.film.dvd = dvd;
      // console.log('this.film.dvd.dateSortie', this.film.dvd.dateSortie);
    }
    if (this.dateInsertion) {
      const day = this.dateInsertion.day;
      const month = this.dateInsertion.month - 1;
      const year = this.dateInsertion.year;
      // tslint:disable-next-line:max-line-length
      this.film.dateInsertion = new Date(year, month, day);
      // console.log('this.film.dateInsertion', this.film.dateInsertion);
    }
    this.loading = true;
    this.buttonDisabled = true;
    return this.filmService.updateFilm(this.film).subscribe(f => {
      // console.log('film with id : ' + f.id + ' updated');
      this.film = f;
    }
      , (error) => {
        this.errorOccured = true;
        this.loading = false;
        console.log(error);
      }
      , () => {
        this.loading = false;
        this.buttonDisabled = false;
        this.updated = true;
        this.checkIfCritiquePresseExist();
      });
  }

  buildFilmWithDvd(film: Film): Film {
    let dateSortieDvd: any = null;
    // console.log('this.film.dvd', JSON.stringify(this.film.dvd));
    if (this.film.dvd && this.film.dvd.dateSortie) {
      dateSortieDvd = this.film.dvd.dateSortie;
    } else {
      dateSortieDvd = null;
    }
    // tslint:disable-next-line:max-line-length
    const dvd: Dvd = { id: null, annee: this.film.annee, zone: '2', edition: '', ripped: false, dateRip: null, dateSortie: dateSortieDvd, format: DvdFormat.DVD }
    // console.log('buildFilmWithDvd', JSON.stringify(dvd));
    // tslint:disable-next-line:max-line-length
    return new Film(film.id, film.titre, film.titreO, film.annee, film.dateSortie, new Date(), film.vu, film.realisateur, film.acteur, film.critiquePresse, film.genre,
      // tslint:disable-next-line:max-line-length
      dvd, film.posterPath, film.alreadyInDvdtheque, film.tmdbId, film.overview, film.runtime, film.homepage, Origine.DVD, film.dateMaj, film.dateVue,film.allocineFicheFilmId);
  }

  transformFilmEnSalleIntoDvd() {
    this.loading = true;
    this.buttonDisabled = true;
    this.errorOccured = false;
    const film: Film = this.buildFilmWithDvd(this.film);
    // console.log('transformFilmEnSalleIntoDvd', film);
    return this.filmService.updateFilm(film).subscribe(f => {
      this.film = f;
    }
      , (error) => {
        this.errorOccured = true;
        console.log(error);
      }
      , () => {
        this.loading = false;
        this.buttonDisabled = false;
        this.updated = true;
      });
  }

  buildFilmWithGooglePlay(film: Film): Film {
    let dateSortieDvd: any = null;
    // console.log('this.film.dvd', JSON.stringify(this.film.dvd));
    if (this.film.dvd && this.film.dvd.dateSortie) {
      dateSortieDvd = this.film.dvd.dateSortie;
    } else {
      dateSortieDvd = null;
    }
    // console.log('buildFilmWithGooglePlay', JSON.stringify(dvd));
    // tslint:disable-next-line:max-line-length
    return new Film(film.id, film.titre, film.titreO, film.annee, film.dateSortie, new Date(), film.vu, film.realisateur, film.acteur, film.critiquePresse, film.genre,
      // tslint:disable-next-line:max-line-length
      null, film.posterPath, film.alreadyInDvdtheque, film.tmdbId, film.overview, film.runtime, film.homepage, Origine.GOOGLE_PLAY, film.dateMaj, film.dateVue,film.allocineFicheFilmId);
  }
  transformFilmEnSalleIntoGooglePlay() {
    this.loading = true;
    this.buttonDisabled = true;
    this.errorOccured = false;
    const film: Film = this.buildFilmWithGooglePlay(this.film);
    // console.log('transformFilmEnSalleIntoDvd', film);
    return this.filmService.updateFilm(film).subscribe(f => {
      this.film = f;
    }
      , (error) => {
        this.errorOccured = true;
        console.log(error);
      }
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
