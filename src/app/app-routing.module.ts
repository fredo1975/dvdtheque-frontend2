import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmExportComponent } from './film-export/film-export.component';
import { FilmImportComponent } from './film-import/film-import.component';
import { FilmAdminComponent } from './film-admin/film-admin.component';
import { AuthGuard } from './guard/auth.guard';
import { FilmSearchDisplayComponent } from './film-search-display/film-search-display.component';
import { FilmUpdateCritiquepresseComponent } from './film-update-critiquepresse/film-update-critiquepresse.component';

const routes: Routes = [
  { path: '', redirectTo: '/filmList', pathMatch: 'full' },
  { path: 'filmList', component: FilmListComponent, canActivate: [AuthGuard] },
  { path: 'filmSearchDisplay', component: FilmSearchDisplayComponent, canActivate: [AuthGuard] },
  { path: 'filmDetail/:id', component: FilmDetailComponent, canActivate: [AuthGuard] },
  { path: 'filmAdd', component: FilmAddComponent, canActivate: [AuthGuard] },
  { path: 'filmExport', component: FilmExportComponent, canActivate: [AuthGuard] },
  { path: 'filmImport', component: FilmImportComponent, canActivate: [AuthGuard] },
  { path: 'filmAdmin', component: FilmAdminComponent, canActivate: [AuthGuard] },
  { path: 'filmUpdateCritiquepresse/:id', component: FilmUpdateCritiquepresseComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
