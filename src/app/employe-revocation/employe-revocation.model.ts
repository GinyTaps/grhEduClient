export class EmployeRevocation {
    
    constructor(
            public id = {codeEmploye: '', dateRevocation: ''},
            public refRevocation?: string,
            public comRevocation?: any
        ) {

        }
    
}
