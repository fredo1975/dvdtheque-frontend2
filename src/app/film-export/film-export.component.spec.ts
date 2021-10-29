import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilmExportComponent } from './film-export.component';

describe('FilmExportComponent', () => {
  let component: FilmExportComponent;
  let fixture: ComponentFixture<FilmExportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
