import { Component, inject, Inject } from '@angular/core';
import { Plant } from '../../models/plant.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlantsService } from '../../services/plants.service';
import { LoaderComponent } from '../loader/loader.component';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-delete-plant',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule
  ],
  templateUrl: './modal-delete-plant.component.html',
  styleUrl: './modal-delete-plant.component.css'
})
export class ModalDeletePlantComponent {

  plantSelected : Plant;

  plantService = inject(PlantsService);
  spinnerService = inject(SpinnerService);

  isDeleting = this.spinnerService.isLoadingDelete
  plantDeleted : boolean = false;

  constructor(
        @Inject(MAT_DIALOG_DATA) public data : Plant, 
        private dialogRef : MatDialogRef<ModalDeletePlantComponent>,
  ){
    this.plantSelected = data;
  }

  deletePlant() : void {
    this.plantService.deletePlant(this.plantSelected).subscribe({
      next : resposne => {
        this.plantDeleted = true;  
        console.log(resposne);
      },
      error : response => {

        console.error(response);
      }
    });
  }

  cancel() : void {
    this.dialogRef.close();
  }


}
