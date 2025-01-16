import { Component, inject, OnInit } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountryRestService } from '../../services/country-rest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-new-plant',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-new-plant.component.html',
  styleUrl: './modal-new-plant.component.css'
})
export class ModalNewPlantComponent implements OnInit {

  countries : Country[] = [];
  countriesService = inject(CountryRestService);

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){

    const countriesFromStorage = localStorage.getItem("countries");

    if(countriesFromStorage === null){
      this.countries = this.countriesService.getCountries();
      localStorage.setItem("countries", JSON.stringify(this.countries));
      console.log(this.countries);
    }else{

      try {
      this.countries = JSON.parse(countriesFromStorage);
     
      if (!Array.isArray(this.countries) || this.countries.length === 0) {
        this.countries = this.countriesService.getCountries();
        localStorage.setItem("countries", JSON.stringify(this.countries));
        }
     
      }catch (error) {
        this.countries = this.countriesService.getCountries();
        localStorage.setItem("countries", JSON.stringify(this.countries));
      }
    
    }
  }
}
