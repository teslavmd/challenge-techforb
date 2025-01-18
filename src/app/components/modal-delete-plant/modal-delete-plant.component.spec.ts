import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePlantComponent } from './modal-delete-plant.component';

describe('ModalDeletePlantComponent', () => {
  let component: ModalDeletePlantComponent;
  let fixture: ComponentFixture<ModalDeletePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeletePlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeletePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
