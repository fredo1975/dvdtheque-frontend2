import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CritiquePresse } from '../model/critique-presse';
import { FicheFilm } from '../model/fiche-film';
import { Film } from '../model/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-film-update-critiquepresse',
  templateUrl: './film-update-critiquepresse.component.html',
  styleUrls: ['./film-update-critiquepresse.component.css']
})
export class FilmUpdateCritiquepresseComponent implements OnInit {
  ficheFilmTab: FicheFilm[];
  film: Film;
  loading = false;
  buttonDisabled = false;
  errorOccured = false;
  private updated = false;
  private critiquePresseExist = true;
  constructor(protected filmService: FilmService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    
    this.filmService.getFilm(this.route.snapshot.params['id']).pipe(
      switchMap(
        film => {
          this.film = film
          return this.filmService.getAllCritiquePresseByAllocineFilmByTitle(film.titre)
        }
      )
      ).subscribe(_ficheFilmTab => {
        this.ficheFilmTab = _ficheFilmTab;
        //console.log(this.ficheFilmTab)
        this.loading = false
      }
        , (error) => {
          console.log('an error occured when fetching allocine film with title : ' + this.film.titre);
          this.loading = false;
        });
/*
    const currentFilm$ = this.getCurrentFilm().pipe(switchMap(film => {
      this.film = film
      return this.getAllCritiquePresseByAllocineFilmByTitle(film)
    }
      ));
    //console.log(currentFilm$)
    currentFilm$.subscribe(ficheFilmTab => {
      this.ficheFilmTab = ficheFilmTab;
      console.log(this.ficheFilmTab)
      this.loading = false
    }
      , (error) => {
        console.log('an error occured when fetching allocine film with title : ' + this.film.titre);
        this.loading = false;
      });
        */
  }

  getCurrentFilm = () => {
    return (this.filmService.getFilm(this.route.snapshot.params['id'])).pipe(map(film => film));
  }

  getAllCritiquePresseByAllocineFilmByTitle = film => {
    return this.filmService.getAllCritiquePresseByAllocineFilmByTitle(film.titre);
  }
  choose(id: number) {
    console.log(id)
    this.film.allocineFicheFilmId = id;
    this.loading = true;
    this.buttonDisabled = true;
    this.filmService.updateFilm(this.film).subscribe(f => {
      // console.log('film with id : ' + f.id + ' updated');
      this.film = f;
    }
      , (error) => {
        this.errorOccured = true;
        this.loading = false;
        this.buttonDisabled = false;
        console.log(error);
      }
      , () => {
        this.loading = false;
        this.buttonDisabled = false;
        this.updated = true;
      });
  }
}
