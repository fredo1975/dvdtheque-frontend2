import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmListDvdComponent } from './film-list-dvd/film-list-dvd.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmExportComponent } from './film-export/film-export.component';
import { FilmImportComponent } from './film-import/film-import.component';
import { FilmListSalleComponent } from './film-list-salle/film-list-salle.component';
import { FilmListTvComponent } from './film-list-tv/film-list-tv.component';

const routes: Routes = [
  { path: '', redirectTo: '/filmListDvd', pathMatch: 'full' },
  { path: 'filmListDvd', component: FilmListDvdComponent },
  { path: 'filmListSalle', component: FilmListSalleComponent },
  { path: 'filmListTv', component: FilmListTvComponent },
  { path: 'filmDetail/:id', component: FilmDetailComponent },
  { path: 'filmAdd', component: FilmAddComponent },
  { path: 'filmExport', component: FilmExportComponent },
  { path: 'filmImport', component: FilmImportComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
