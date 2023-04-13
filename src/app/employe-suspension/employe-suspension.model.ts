export class EmployeSuspension {
    
    constructor(
            public id = {codeEmploye: '', codeTypeMotifSuspension: '', dateDebutSuspension: ''},
            public dateFinSuspension?: string,
            public refDebutSuspension?: string,
            public refFinSuspension?: string,
            public comDebutSuspension?: any,
            public comFinSuspension?: any
        ) {

        }
    
}
