import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewPlantComponent } from './modal-new-plant.component';

describe('ModalNewPlantComponent', () => {
  let component: ModalNewPlantComponent;
  let fixture: ComponentFixture<ModalNewPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
