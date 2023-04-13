export class EmployeDetachement {
    
    constructor(
            public id = {codeEmploye: '', dateDebutDetachement: ''},
            public dateFinDetachement?: string,
            public refDetachement?: string,
            public comDetachement?: any
        ) {

        }
    
}
