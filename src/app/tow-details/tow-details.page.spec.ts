import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TowDetailsPage } from './tow-details.page';

describe('TowDetailsPage', () => {
  let component: TowDetailsPage;
  let fixture: ComponentFixture<TowDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TowDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
