export class EmployeQualification {
    
    constructor(
            public id = {codeEmploye: '', codeTypeEchelon: '', codeTypeTitre: '',
                    codeTypeGrade: '', codeTypeCategorie: '', codeTypeDiplome: ''},
            public dateGrade?: string,
            public dateCategorie?: string,
            public dateEchelon?: string,
            public dateDiplome?: string,
            public indice?: number
        ) {

        }
    
}
