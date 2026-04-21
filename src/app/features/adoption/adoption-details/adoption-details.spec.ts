import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionDetails } from './adoption-details';

describe('AdoptionDetails', () => {
  let component: AdoptionDetails;
  let fixture: ComponentFixture<AdoptionDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptionDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
