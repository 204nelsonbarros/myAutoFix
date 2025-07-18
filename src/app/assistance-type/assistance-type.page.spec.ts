import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssistanceTypeComponent } from './assistance-type.component';

describe('AssistanceTypeComponent', () => {
  let component: AssistanceTypeComponent;
  let fixture: ComponentFixture<AssistanceTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AssistanceTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
