import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { CardsStatsService } from '../../services/cards-stats.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewPlantComponent } from '../modal-new-plant/modal-new-plant.component';
import { ModalEditPlantComponent } from '../modal-edit-plant/modal-edit-plant.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LoaderComponent } from '../loader/loader.component';
import { SpinnerService } from '../../services/spinner.service';
import { Plant } from '../../models/plant.model';
import { PlantsService } from '../../services/plants.service';
import { ModalDeletePlantComponent } from '../modal-delete-plant/modal-delete-plant.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  cardStats : any[] = [];
  cardTotalStats : any[] = [];
  currentUser  : User = {
    fullName : "",
    email : ""
  };
  listPlants : Plant[] = [];
  
  
  dialog = inject(MatDialog);
  
  authService = inject(AuthService);
  cardStatsService = inject(CardsStatsService);
  spinnerService = inject(SpinnerService);
  plantService = inject(PlantsService);

  isLoadingTable = this.spinnerService.isLoadingTable;

  optionIndex : number | null = null;


  ngOnInit(): void {
    this.cardStats = this.getCardStats();
    this.cardTotalStats = this.getCardsTotalStats();
    this.getCurrentUser();
    this.getAllPlants();
  }



  // FN

  getCardStats() {
    return this.cardStatsService.getCardStats();
  }

  getCardsTotalStats() {
    return this.cardStatsService.getCardsTotalStats();
  }

  getAllPlants() : void {
    this.plantService.getAllPlants().subscribe({
      next : (plants) => {
        //stats globales
        //tambien se pueden usar DTOs desde la API y crear sus respectivos endpoints...
        //opté por hacerlo así
        plants.forEach(plant => {
          this.cardTotalStats[0].value += plant.readingsOk;
          this.cardTotalStats[1].value += plant.mediumAlerts;
          this.cardTotalStats[2].value += plant.redAlerts;
        })


        this.listPlants = plants;
      },
      error : (error) => {
        console.log(error);
      }
    })
  }

  addPlant() : void {
    const dialogRef = this.dialog.open(ModalNewPlantComponent, {
      height: '330px',
      width: '380px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPlants();
    })
  }

  editPlant(plantSelected : Plant) : void {
    const dialogRef = this.dialog.open(ModalEditPlantComponent, {
      width : '720px',
      height : '400px',
      data : plantSelected
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPlants();
    })

  }

  
  deletePlant(plantSelected : Plant) : void {
    const dialogRef = this.dialog.open(ModalDeletePlantComponent, {
      width : '440px',
      height : '150px',
      data : plantSelected,
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPlants();
    })
  }

  getCurrentUser() {
      this.authService.getCurrentUser().subscribe({
      next : user => {
        console.log(user);
        this.currentUser = user;
      },
      error : res => {
        console.error(res);
      }
    })
  }

  logOut() : void {
    this.authService.logOut();
    window.location.reload();
  }

  showOptions(index : number) : void {
    this.optionIndex = this.optionIndex === index ? null : index;
  }


}

