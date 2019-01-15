import { Component, OnInit,  Input, ViewChild } from '@angular/core';
import { Film } from '../film';
import { Personne } from '../personne';
import { FilmService } from '../film.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  // @Input() film: Film;
  @ViewChild('select') selectElRef;
  private film: Film;
  private realisateurs: Personne[];
  private acteurs: Personne[];
  private acteursFilm: Personne[];
  private annees: number[];
  private zonesList: number[];
  private newActeur: Personne;
  private newActeurSetTemp: Personne[];
  private newActeurSet: Personne[];
  constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) {
    this.newActeur = new Personne(0, '' , '');
  }

  ngOnInit() {
    this.filmService.getFilm(this.route.snapshot.params['id']).subscribe(_film => this.film = _film
      , (error) => {console.log('an error occured when fetching film with id : ' + this.route.snapshot.params['id']); });
    this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.realisateurs = data; }
      , (error) => {console.log('an error occured when fetching all personnes'); });
      this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.acteurs = data; }
      , (error) => {console.log('an error occured when fetching all personnes'); });
    this.annees = this.getAnneesSelect();
    this.zonesList = this.getZonesList();
  }

  getAnneesSelect = () => {
    const anneeList = [];
    const currentTime = new Date();
    const yyyy = currentTime.getFullYear();
    anneeList.push('Non renseigné');
    for (let i = yyyy; i > 1930; i-- ) {
      anneeList.push(i);
    }
    return anneeList;
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
  setSelected(selectElement) {
    if (selectElement.checked === true) {
      console.log('selectElement.checked ' + selectElement.value);
    } else {
      console.log('selectElement.unchecked');
    }
  }

  addNewActeur() {
    console.log('newActeur=' + this.newActeur.prenom + ' ' + this.newActeur.nom);
    if (this.newActeurSetTemp === undefined) {
      this.newActeurSetTemp = [];
    }
    const newAct = Object.assign({}, this.newActeur);
    this.newActeurSetTemp = [...this.newActeurSetTemp , newAct];
  }
  updateFilm() {
    if (this.newActeurSetTemp !== undefined) {
      this.newActeurSet = [];
    }
    for (const act of this.newActeurSetTemp) {
      console.log('act=' + act.prenom + ' ' + act.nom);
    }
  }
}
