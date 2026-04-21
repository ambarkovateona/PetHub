import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdoptionPetComponent } from './add-adoption-pet';

describe('AddAdoptionPet', () => {
  let component: AddAdoptionPetComponent;
  let fixture: ComponentFixture<AddAdoptionPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdoptionPetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdoptionPetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
