
export class Employe {

    constructor(
        public codeEmploye?: number,
        public matriculeEmploye?: string,
        public nomEmploye?: string,
        public prenomEmploye?: string,
        public enseigneYN?: number,
        public confirmeYN?: number,
        public dateNaissEmploye?: string,
        public cinEmploye?: string,
        public dateCinEmploye?: string,
        public telEmploye?: string,
        public adresseEmploye?: string,
        public emailEmploye?: string,
        public dateEngEmploye?: string,
        public dateTitEmploye?: string,
        public codeTypeNationalite?: any,
        public codeTypeSexe?: any,
        public codeTypeEtatCivil?: any,
        public codeTypeFonction?: any
    ) {

    }
}
