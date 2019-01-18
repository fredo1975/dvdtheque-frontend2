import { Component, OnInit, OnChanges,  Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../film';
import { Personne } from '../personne';
import { FilmService } from '../film.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit, OnChanges {
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
  private updated = false;
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
  ngOnChanges() {
    this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.realisateurs = data; }
      , (error) => {console.log('an error occured when fetching all personnes'); });
    this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.acteurs = data; }
      , (error) => {console.log('an error occured when fetching all personnes'); });
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
  setSelected(selectElement, act: Personne ) {
    if (selectElement.checked) {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' checked');
      this.newActeurSetTemp.push(act);
    } else {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' unchecked');
      const index = this.newActeurSetTemp.indexOf(act);
      this.newActeurSetTemp.splice(index, 1);
    }
  }
  setRippedSelected(selectElement, film: Film ) {
    if (selectElement.checked) {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' checked');
      this.film.ripped = true;
    } else {
      // console.log('act=' + act.prenom + ' ' + act.nom + ' unchecked');
      this.film.ripped = false;
    }
  }
  setSelectedRealisateur(selectElement) {
    console.log('selectElement.id=' + selectElement.value);
    
  }
  setSelectedAnnee(selectElement) {
    console.log('selectElement.value=' + selectElement.value);
    this.film.annee = selectElement.value;
  }
  addNewActeur() {
    // console.log('newActeur=' + this.newActeur.prenom + ' ' + this.newActeur.nom);
    if (this.newActeurSetTemp === undefined) {
      this.newActeurSetTemp = [];
    }
    const newAct = Object.assign({}, this.newActeur);
    this.newActeurSetTemp = [...this.newActeurSetTemp , newAct];
    this.newActeur.nom = '';
    this.newActeur.prenom = '';
  }
  updateFilm() {
    if (this.newActeurSetTemp !== undefined) {
      this.newActeurSet = [];
    }
    /*
    for (const act of this.newActeurSetTemp) {
      console.log('act=' + act.prenom + ' ' + act.nom);
    }*/
    this.film.newActeurDtoSet = Object.assign([], this.newActeurSetTemp);
    return this.filmService.updateFilm(this.film).subscribe(obs => {
      console.log('film with id : ' + this.film.id + ' updated');
      this.updated = true;
    }
    , (error) => {console.log(error); });
  }
}
