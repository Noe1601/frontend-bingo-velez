export interface LoginResponse {
    token: string;
    userAuthenticate: UserAuthenticated;
    menu: Menu[];
}

export interface UserAuthenticated {
    NAME: string;
    ROLE: string;
    id: number;
}

export interface Menu {
    icono: string;
    submenu: SubMenu[];
}

export interface SubMenu {
    titulo: string;
    url: string;
}