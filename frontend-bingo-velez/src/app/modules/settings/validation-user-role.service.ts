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
        return (localStorage.getItem('role')?.toLocaleLowerCase() == 'admin_role') ? true : false;
    }

}
