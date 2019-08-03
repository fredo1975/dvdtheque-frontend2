import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTmdbSearchComponent } from './film-tmdb-search.component';

describe('FilmTmdbSearchComponent', () => {
  let component: FilmTmdbSearchComponent;
  let fixture: ComponentFixture<FilmTmdbSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmTmdbSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmTmdbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
