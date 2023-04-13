export class EmployeRetraite {
    
    constructor(
            public id = {codeEmploye: '', codeTypeMotifRetraite: '', dateRetraite: ''},
            public refRetraite?: string,
            public comRetraite?: any
        ) {

        }
    
}
