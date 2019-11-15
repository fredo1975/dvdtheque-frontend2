import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListTvComponent } from './film-list-tv.component';

describe('FilmListTvComponent', () => {
  let component: FilmListTvComponent;
  let fixture: ComponentFixture<FilmListTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmListTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
