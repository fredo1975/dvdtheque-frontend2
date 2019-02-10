import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { Personne } from '../personne';
import { FilmSearch } from '../film-search';
@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {
  private annees: number[];
  private realisateurs: Personne[];
  private acteurs: Personne[];
  private filmSearch: FilmSearch;
  @Output() filterChange = new EventEmitter<string>();

  constructor(private filmService: FilmService) {
    const real = new Personne(0, '', '');
    const act1 = new Personne(0, '', '');
    this.filmSearch = new FilmSearch('', 0, false, real, act1);
  }

  ngOnInit() {
    this.annees = this.filmService.getAnneesSelect();
    this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.realisateurs = data; }
      , (error) => {console.log('an error occured when fetching all personnes'); });
    this.filmService.getAllPersonnes().subscribe((data: Personne[]) => {this.acteurs = data; }
      , (error) => {console.log('an error occured when fetching all personnes'); });
  }
  findTitre(event: any) { // without type info
    console.log('event.target.value=' + event.target.value);
    this.filterChange.emit(event.target.value);
    // this.getSearchStatusChange.emit(event.target.value);
  }
}
