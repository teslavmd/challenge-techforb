import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  spinnerService = inject(SpinnerService);

  isLoadingAuth = this.spinnerService.isLoadingAuth;  
  isLoadingTable = this.spinnerService.isLoadingTable;
  isLoadingDelete = this.spinnerService.isLoadingDelete
  isLoadingEdit = this.spinnerService.isLoadingEdit;
  isLoadingAdd = this.spinnerService.isLoadingAdd;
}
