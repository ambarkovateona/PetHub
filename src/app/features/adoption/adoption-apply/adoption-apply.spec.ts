import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionApply } from './adoption-apply';

describe('AdoptionApply', () => {
  let component: AdoptionApply;
  let fixture: ComponentFixture<AdoptionApply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionApply],
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptionApply);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
