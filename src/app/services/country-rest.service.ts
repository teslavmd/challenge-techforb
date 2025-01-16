import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryRestService {

  http = inject(HttpClient);
  countries : Country[] = [];

  constructor() { }

  getCountries() : Country[] {
    this.http.get("https://restcountries.com/v3.1/all").subscribe((data : any) => {
      data.forEach((element : any) => {
      this.countries.push(new Country(element.name.common, element.flags.svg));
      });
      this.countries.sort((a, b) => a.name.localeCompare(b.name));
    });
    return this.countries;
  }


}
