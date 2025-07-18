import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TowListPage } from './tow-list.page';

describe('TowListPage', () => {
  let component: TowListPage;
  let fixture: ComponentFixture<TowListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TowListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
