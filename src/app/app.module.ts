import { BrowserModule, } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FilmListComponent } from './film-list/film-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilmSearchComponent } from './film-search/film-search.component';
import { FilmTmdbSearchComponent } from './film-tmdb-search/film-tmdb-search.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmExportComponent } from './film-export/film-export.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { ErrorInterceptorService } from './error-interceptor.service';
import { FilmImportComponent } from './film-import/film-import.component';
import { JmsStatusPipe } from './pipes/jms-status.pipe';
import { GenresPipe } from './pipes/genres.pipe';
import { RealisateursPipe } from './pipes/realisateurs.pipe';
import { FilmAdminComponent } from './film-admin/film-admin.component';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    NavbarComponent,
    FilmDetailComponent,
    FilmSearchComponent,
    FilmTmdbSearchComponent,
    FilmAddComponent,
    FilmExportComponent,
    FilmImportComponent,
    JmsStatusPipe,
    GenresPipe,
    RealisateursPipe,
    FilmAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
