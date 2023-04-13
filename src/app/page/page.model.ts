import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';

export class Page {
    /*id: number;
    nom: string; 
    url: string;*/
    //constructor(){}
    constructor(
            public idPage?: number,
            public nomPage?: string,
            public url?: string,
            public page?: Page,
            public privilege?: number // TypeMethodeAutorise 
        ) {

        }
}
