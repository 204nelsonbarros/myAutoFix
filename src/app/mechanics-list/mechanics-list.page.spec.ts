import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MechanicsListPage } from './mechanics-list.page';

describe('MechanicsListPage', () => {
  let component: MechanicsListPage;
  let fixture: ComponentFixture<MechanicsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
