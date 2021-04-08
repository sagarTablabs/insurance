import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceActionComponent } from './insurance-action.component';

describe('InsuranceActionComponent', () => {
  let component: InsuranceActionComponent;
  let fixture: ComponentFixture<InsuranceActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
