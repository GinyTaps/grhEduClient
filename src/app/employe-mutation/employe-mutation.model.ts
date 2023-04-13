export class EmployeMutation {
    
    constructor(
            public id = {codeEmploye: '', dateMutation: ''},
            public refMutation?: string,
            public comMutation?: any
        ) {

        }
    
}
