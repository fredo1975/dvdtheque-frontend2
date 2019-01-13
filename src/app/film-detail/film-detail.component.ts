import { Component, OnInit,  Input } from '@angular/core';
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
  private film: Film;
  private realisateurs: Personne[];
  private annees: number[];
  private zonesList: number[];
  constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.filmService.getFilm(this.route.snapshot.params['id']).subscribe(_film => this.film = _film
      , (error) => {console.log('an error occured when fetching film with id : ' + this.route.snapshot.params['id']); });
    this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.realisateurs = data; }
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

}
