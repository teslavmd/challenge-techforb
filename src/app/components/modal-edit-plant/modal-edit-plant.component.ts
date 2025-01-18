import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plant } from '../../models/plant.model';
import { PlantsService } from '../../services/plants.service';
import { SpinnerService } from '../../services/spinner.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-modal-edit-plant',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './modal-edit-plant.component.html',
  styleUrl: './modal-edit-plant.component.css'
})
export class ModalEditPlantComponent {

  plantSelected : Plant;

  editForm : FormGroup;
  readingsOk : FormControl;
  mediumAlerts : FormControl;
  redAlerts : FormControl;

  plantService = inject(PlantsService);
  spinnerService = inject(SpinnerService);

  isLoadingEdit = this.spinnerService.isLoadingEdit;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Plant, 
    private dialogRef : MatDialogRef<ModalEditPlantComponent>,
    private formBuilder : FormBuilder
  ) {
    this.plantSelected = data;


    this.readingsOk = new FormControl(this.plantSelected.readingsOk ,[Validators.required]);
    this.mediumAlerts = new FormControl(this.plantSelected.mediumAlerts, [Validators.required]);
    this.redAlerts = new FormControl(this.plantSelected.redAlerts, [Validators.required]);


    this.editForm = this.formBuilder.group({
      readingsOk : this.readingsOk,
      mediumAlerts : this.mediumAlerts,
      redAlerts : this.redAlerts
    })

  }


  editPlant() : void {
    this.plantSelected.readingsOk = this.editForm.get('readingsOk')?.value;
    this.plantSelected.mediumAlerts = this.editForm.get('mediumAlerts')?.value;
    this.plantSelected.redAlerts = this.editForm.get('redAlerts')?.value;
    console.log(this.plantSelected);
    this.plantService.editPlant(this.plantSelected).subscribe({
      next: res => {
        console.log(res);
      },
      error : res => {
        console.error(res);
      }
    })
  
  }

  cancel() : void {
    this.dialogRef.close();
  }



}
