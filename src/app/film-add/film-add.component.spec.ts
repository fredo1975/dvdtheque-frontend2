import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilmAddComponent } from './film-add.component';

describe('FilmAddComponent', () => {
  let component: FilmAddComponent;
  let fixture: ComponentFixture<FilmAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
