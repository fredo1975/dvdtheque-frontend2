import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Film } from '../film';
import { Personne } from '../personne';
import { FilmService } from '../film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DvdFormat } from '../dvd-format.enum';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  // @Input() film: Film;
  // @ViewChild('select') selectElRef;
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
    if (isNaN(this.film.dvd.annee)) {
      // console.log('this.film.dvd.annee is nan');
      this.film.dvd.annee = 0;
    }
    this.loading = true;
    this.buttonDisabled = true;
    return this.filmService.updateFilm(this.film).subscribe(obs => {
      // console.log('film with id : ' + this.film.id + ' updated');
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
