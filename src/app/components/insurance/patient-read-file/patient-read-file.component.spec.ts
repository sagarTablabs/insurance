import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReadFileComponent } from './patient-read-file.component';

describe('PatientReadFileComponent', () => {
  let component: PatientReadFileComponent;
  let fixture: ComponentFixture<PatientReadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
