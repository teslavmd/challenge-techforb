import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPlantComponent } from './modal-edit-plant.component';

describe('ModalEditPlantComponent', () => {
  let component: ModalEditPlantComponent;
  let fixture: ComponentFixture<ModalEditPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
