import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmExportComponent } from './film-export/film-export.component';
import { FilmImportComponent } from './film-import/film-import.component';
import { FilmAdminComponent } from './film-admin/film-admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/filmList', pathMatch: 'full' },
  { path: 'filmList', component: FilmListComponent },
  { path: 'filmDetail/:id', component: FilmDetailComponent },
  { path: 'filmAdd', component: FilmAddComponent },
  { path: 'filmExport', component: FilmExportComponent },
  { path: 'filmImport', component: FilmImportComponent },
  { path: 'filmAdmin', component: FilmAdminComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
