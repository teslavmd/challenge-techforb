import { Component, inject, OnInit } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountryRestService } from '../../services/country-rest.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plant } from '../../models/plant.model';
import { PlantsService } from '../../services/plants.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from '../loader/loader.component';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-modal-new-plant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './modal-new-plant.component.html',
  styleUrl: './modal-new-plant.component.css'
})
export class ModalNewPlantComponent implements OnInit {

  countries : Country[] = [];
  plant : Plant = {
    plantName : "",
    country : "",
    imgFlag : "",
    readingsOk : 0,
    mediumAlerts : 0,
    redAlerts : 0
  };
  
  countriesService = inject(CountryRestService);
  plantService = inject(PlantsService);
  router = inject(Router);
  spinnerService = inject(SpinnerService);

  isLoadingAdd = this.spinnerService.isLoadingAdd;
  plantAdded : boolean = false;


  addForm : FormGroup;
  plantName : FormControl;
  plantCountry : FormControl;


  constructor(
    private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<ModalNewPlantComponent>
  ){

    this.plantName = new FormControl('', [Validators.required]);
    this.plantCountry = new FormControl('', [Validators.required]);

    this.addForm = this.formBuilder.group({
      plantName : this.plantName,
      plantCountry : this.plantCountry
    })
  }

  ngOnInit(): void {
    this.getCountriesApi();
  }

  addPlant() : void {
    const country : Country | undefined = this.findCountryByCode(this.addForm.get('plantCountry')?.value);
    
    this.plant.plantName = this.addForm.get('plantName')?.value;
    this.plant.country = country?.name || "";
    this.plant.imgFlag = country?.flag || "";   


    this.plantService.addPlant(this.plant).subscribe({
      next : response => {
        this.plantAdded = true;
        console.log(response);
      },
      error : response => {
        console.log(response);
      }
    });

  }


  findCountryByCode(code : string) : Country | undefined {
    return this.countries.find((country : Country) => {
      if(country.code === code) {return country} else {return undefined};
    })
  }

  back() : void {
    this.dialogRef.close();
  }



  //Para obtener el listado de paies y sus respectivas banderas con una API de terceros -> "https://restcountries.com"
  getCountriesApi(){

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
