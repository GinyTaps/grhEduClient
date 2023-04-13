export class EmployeConge {

    constructor(
        public id = {codeEmploye: '', codeTypeMotifConge: '', dateDebutConge: ''},
        public dateFinConge?: string,
        public dureeConge?: number,
        public refDebutConge?: string,
        public refFinConge?: string,
        public comDebutConge?: any,
        public comFinConge?: any
    ) {

    }
}
