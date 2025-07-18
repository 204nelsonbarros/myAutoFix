import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCompletedPage } from './service-completed.page';

describe('ServiceCompletedPage', () => {
  let component: ServiceCompletedPage;
  let fixture: ComponentFixture<ServiceCompletedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
