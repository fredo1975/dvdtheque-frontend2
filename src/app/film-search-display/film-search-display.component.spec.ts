import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmSearchDisplayComponent } from './film-search-display.component';

describe('FilmSearchDisplayComponent', () => {
  let component: FilmSearchDisplayComponent;
  let fixture: ComponentFixture<FilmSearchDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmSearchDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
