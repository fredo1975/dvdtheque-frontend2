import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/filmList', pathMatch: 'full' },
  { path: 'filmList', component: FilmListComponent },
  { path: 'filmDetail/:id', component: FilmDetailComponent },
  { path: 'filmAdd', component: FilmAddComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
