import { Profile } from '../profile/profile.model';

export class User {
    
    constructor(
            public idUser?: number,
            public email?: string,
            public username?: string,
            public password?: string,
            public passwordConfirmed?: string,
            public renewPasswordCode?: number,
            public renewPasswordLimitTime?: any,
            public activated?: number,
            // public groupes?: any
            public groupes?: Profile
         )
       { }
    
}
