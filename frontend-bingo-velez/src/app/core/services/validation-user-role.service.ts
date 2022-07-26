import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidateRoleService {

    constructor() { }

    get validationRole() {
        return this.validateRole();
    }

    validateRole() {

        const role = localStorage.getItem('role'); 

        if(role?.includes('ADMIN_ROLE')){
            return true;
        } 
        else{
            return false;
        }
    }

}
