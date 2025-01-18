import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Plant } from "../models/plant.model";

@Injectable({
    providedIn : 'root',
})
export class PlantsService{
    http = inject(HttpClient);
    url : string = environment.apiUrl;

    getAllPlants() : Observable<Plant[]> {
        return this.http.get<Plant[]>(`${this.url}/plant/all`);
    }

    addPlant(plant : Plant) : Observable<any> {
        return this.http.post(`${this.url}/plant/add`, plant);
    }

    editPlant(plant : Plant) : Observable<any> {
        return this.http.put(`${this.url}/plant/edit`, plant);
    }

    deletePlant(plant : Plant) : Observable<any> {
        return this.http.delete(`${this.url}/plant/delete/${plant.id}`)
    }

}