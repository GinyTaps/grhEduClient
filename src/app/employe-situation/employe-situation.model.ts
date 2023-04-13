export class EmployeSituation {
    
    constructor(
            public id = {codeEmploye: '', codeTypeSituation: '', dateDebutSituation: ''},
            public dateFinSituation?: string,
            public refSituation?: string
        ) {

        }
    
}
