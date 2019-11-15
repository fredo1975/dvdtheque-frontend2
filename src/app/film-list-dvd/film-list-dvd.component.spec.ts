import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListDvdComponent } from './film-list-dvd.component';

describe('FilmListDvdComponent', () => {
  let component: FilmListDvdComponent;
  let fixture: ComponentFixture<FilmListDvdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmListDvdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListDvdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
