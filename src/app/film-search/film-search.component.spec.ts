import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilmSearchComponent } from './film-search.component';

describe('FilmSearchComponent', () => {
  let component: FilmSearchComponent;
  let fixture: ComponentFixture<FilmSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
