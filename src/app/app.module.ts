import { BrowserModule, } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FilmListComponent } from './film-list/film-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmSearchComponent } from './film-search/film-search.component';
import { FilmTmdbSearchComponent } from './film-tmdb-search/film-tmdb-search.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmExportComponent } from './film-export/film-export.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { FilmImportComponent } from './film-import/film-import.component';
import { JmsStatusPipe } from './pipes/jms-status.pipe';
import { GenresPipe } from './pipes/genres.pipe';
import { RealisateursPipe } from './pipes/realisateurs.pipe';
import { FilmAdminComponent } from './film-admin/film-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { ConfigInitService } from './init/config-init.service';
import { FilmSearchDisplayComponent } from './film-search-display/film-search-display.component';
import { FilmUpdateCritiquepresseComponent } from './film-update-critiquepresse/film-update-critiquepresse.component';

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
    FilmSearchDisplayComponent,
    FilmUpdateCritiquepresseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    KeycloakAngularModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService, ConfigInitService],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
