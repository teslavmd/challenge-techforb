import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-plant',
  standalone: true,
  imports: [],
  templateUrl: './modal-edit-plant.component.html',
  styleUrl: './modal-edit-plant.component.css'
})
export class ModalEditPlantComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : {id : number}) { }

  

}
