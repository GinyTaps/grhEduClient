import { LiaisonsRegroupement } from '../liaisons-regroupement/liaisons-regroupement.model';

export class Regroupement {
    
    constructor(
            public codeRegroupement?: number,
            public libelleRegroupement?: string,
            public ordreRegroupement?: number,
            public codeRegroupPays?: number,
            public codeTypeRegroupement?: any,
            // public liaisonRegroupement?: LiaisonsRegroupement
        ) {

        }
}

export class Chaine {
    codeRegroupementParent?: number;
    regroupement?: Regroupement; 
    listRegFils?:Chaine
}

export class Localite {
    lib: string;
    id: number;
    type_loc: Type_loc;
    constructor(){}
}

export class Type_loc{
    id: number;
    lib: string;
    ordre: number;
}

export class Liaison_loc{
    loc: Localite;
    parent_loc: Localite;
}

