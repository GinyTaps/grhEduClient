export class EmployeDisponibilite {
    
    constructor(
            public id = {codeEmploye: '', dateDebutDisponibilite: ''},
            public dateFinDisponibilite?: string,
            public refDebutDisponibilite?: string,
            public refFinDisponibilite?: string,
            public comDebutDisponibilite?: any,
            public comFinDisponibilite?: any
        ) {

        }
    
}
