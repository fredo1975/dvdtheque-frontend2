import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

describe('AppComponent', () => {
  const routes: Routes = [
    { path: '', redirectTo: '/filmList', pathMatch: 'full' },
    { path: 'filmList', component: FilmListComponent },
    { path: 'filmDetail/;id', component: FilmDetailComponent }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot(routes)],
      declarations: [
        AppComponent, FilmListComponent, FilmDetailComponent, NavbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dvdtheque'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('dvdtheque');
  });

});
