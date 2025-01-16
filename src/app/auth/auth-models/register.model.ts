export class Register{
    email : string;
    password : string;
    fullName : string;
    constructor(email : string, password : string, fullName : string){
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }
}