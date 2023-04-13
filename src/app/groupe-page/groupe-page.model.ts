import { Profile } from '../profile/profile.model';
import { Page } from '../page/page.model';
import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';

export class GroupePage {
    
        /*constructor(
            public id = {idGroupe: '', idPage: '', idTypeMethodeAutorise: ''},
            public profile?: Profile,
            public page?: Page,
            public methode?: TypeMethodeAutorise
            public idGroupe?: number,
            public nomGroupe?: string,
            public idPage?: number,
            public nomPage?: string,        
            public idMethode?: number,
            public nomMethode?: string
        ) {
        
        }*/
    /*
     constructor(
            public profile = { idGroupe: '', nomGroupe: '' },
            public page = {idPage: '', nomPage: '' },
            public methode = {idTypeMethodeAutorise: '', nomTypeMethodeAutorise: '' }
        ) {

        }*/
    
    constructor(
            public id = {idGroupe: '', idPage: '', idTypeMethodeAutorise: ''},
            public groupe?: Profile,
            public page?: Page,
            public typeMethodeAutorise?: TypeMethodeAutorise
        ) {

        }
}

export class Droit{
    page: Page;
    profile: Profile;
    methode: TypeMethodeAutorise;

    constructor(){}
}