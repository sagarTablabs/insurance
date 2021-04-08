import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCardComponent } from './assign-card.component';

describe('AssignCardComponent', () => {
  let component: AssignCardComponent;
  let fixture: ComponentFixture<AssignCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
