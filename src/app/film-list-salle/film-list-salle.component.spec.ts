import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListSalleComponent } from './film-list-salle.component';

describe('FilmListSalleComponent', () => {
  let component: FilmListSalleComponent;
  let fixture: ComponentFixture<FilmListSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmListSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
