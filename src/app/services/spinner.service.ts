import { Injectable, signal } from "@angular/core";


@Injectable({
    providedIn : 'root'
})
export class SpinnerService{

    isLoadingAuth = signal<boolean>(false);
    isLoadingTable = signal<boolean>(false);
    isLoadingDelete = signal<boolean>(false);
    isLoadingEdit = signal<boolean>(false);
    isLoadingAdd = signal<boolean>(false);
    
    public showSpinAuth(){
        this.isLoadingAuth.set(true);
    }

    public hideSpinAuth(){
        this.isLoadingAuth.set(false);
    }

    public showSpinTable(){
        this.isLoadingTable.set(true);
    }
    
    public hideSpinTable(){
        this.isLoadingTable.set(false);
    }

    public showSpinDelete(){
        this.isLoadingDelete.set(true);
    }
    
    public hideSpinDelete(){
        this.isLoadingDelete.set(false);
    }

    public showSpinEdit(){
        this.isLoadingEdit.set(true);
    }
    
    public hideSpinEdit(){
        this.isLoadingEdit.set(false);
    }

    public showSpinAdd(){
        this.isLoadingAdd.set(true);
    }
    
    public hideSpinAdd(){
        this.isLoadingAdd.set(false);
    }

}