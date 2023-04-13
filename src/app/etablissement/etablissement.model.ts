export class Etablissement {
    
    constructor(
            public codeEtablissement?: number,
            public nomEtablissement?: string,
            public codeAdministratifEtablissement?: string,
            public adressePostEtablissement?: string,
            public emailEtablissement?: string,
            public telEtablissement?: string,
            public faxEtablissement?: string,
            public anneeCreationEtablissement?: number,
            public codeTypeMilieu?: any,
            public codeTypeStatutEtablissement?: any,
            public codeTypeEtablissement?: any
        ) {

        }
    
}
