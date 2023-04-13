export class EmployeRenvoi {
    
    constructor(
            public id = {codeEmploye: '', codeTypeMotifRenvoi: '', dateRenvoi: ''},
            public refRenvoi?: string,
            public comRenvoi?: any
        ) {

        }
    
}
