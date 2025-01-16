import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { CardsStatsService } from '../../services/cards-stats.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewPlantComponent } from '../modal-new-plant/modal-new-plant.component';
import { ModalEditPlantComponent } from '../modal-edit-plant/modal-edit-plant.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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
  
  dialog = inject(MatDialog);

  authService = inject(AuthService);
  cardStatsService = inject(CardsStatsService);


  ngOnInit(): void {
    this.cardStats = this.getCardStats();
    this.cardTotalStats = this.getCardsTotalStats();
    this.getCurrentUser();
  }

  getCardStats() {
    return this.cardStatsService.getCardStats();
  }

  getCardsTotalStats() {
    return this.cardStatsService.getCardsTotalStats();
  }

  addPlant() : void {
    const dialogRef = this.dialog.open(ModalNewPlantComponent, {
      height: '300px',
      width: '380px',
    });
  }

  editPlant(id : number) : void {
    const dialogRef = this.dialog.open(ModalEditPlantComponent, {
      width : '720px',
      height : '400px',
      data : {id}
    })
  }

  getCurrentUser() {
      this.authService.getCurrentUser().subscribe({
      next : user => {
        console.log(user);
        this.currentUser = user;
      },
      error : res => {
        console.log(res);
      }
    })
  }

  logOut() : void {
    this.authService.logOut();
    window.location.reload();
  }

}

