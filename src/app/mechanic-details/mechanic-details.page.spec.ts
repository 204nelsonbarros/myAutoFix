import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MechanicDetailsPage } from './mechanic-details.page';

describe('MechanicDetailsPage', () => {
  let component: MechanicDetailsPage;
  let fixture: ComponentFixture<MechanicDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
