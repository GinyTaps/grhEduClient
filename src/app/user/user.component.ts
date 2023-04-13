import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user.model';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile.model';
/*import {User} from '../CLASS/user';
import {Profile} from '../CLASS/profile';*/

import { UserService } from './user.service';

import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    user: User = new User();
    userT: User = new User();
    users: User[] = new Array();
    permitted: boolean;
    groupes: Profile;
    // userLocal: User;
    header: string;
    idG: number = 0;
    mode: number;
    p: number  = 1; // pour la pagination

    user_form: FormGroup = new FormGroup({
      email: new FormControl('', Validators.email),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      profile: new FormControl()
    });

    u_detail: boolean = false;
    invalid_Pass: boolean;


    constructor(
          private userService: UserService,
          private profileService: ProfileService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) {
    }

    ngOnInit() {
        this.mode = 1;
        this.loadAll();
    }


    loadAll() {
      if(localStorage.getItem('Groupes').indexOf('STAFF') >= 0) {
      // if(this.authService.getGroupes().includes('ADMIN')) {
            this.permitted = true;
            this.userService.getAll().subscribe(data => {
              console.log(data);
                this.users = data;
                // console.log(this.users);
                }, err => {
                    console.log(err);
                    });

            this.profileService.getAll().subscribe(data => {
                this.groupes = data;
            });
        } else {
            var users = new User();
            this.permitted = false;
            this.userService.findByusername(this.authService.loadCurrentUser()).subscribe(data => {
                users = data;
                this.users.push(users);
            })
        }

      }

    create(){
        this.mode = 2;
        this.header = "Ajouter un utilisateur";
        this.user = new User;

    }

    save() {
        // this.invalid_Pass = (this.user.password != this.user.passwordConfirmed);
        if(this.user.password = this.user.passwordConfirmed) {
            // console.log('******** Création *******');
            this.invalid_Pass = false;
              this.subscribeToSaveResponse(this.userService.create(this.user));
          } else {
              this.invalid_Pass = true;
          }
    }

    editUser(u: User) {
        /*console.log('********** Récupération ********');
        console.log(u.groupes);*/
        this.mode = 3;
        this.header = "Modifier un utilisateur";
        this.userService.find(u).subscribe(data => {
          this.user = data;
          // console.log(this.user.groupes[0].idGroupe);
          /*for(let i = 0;  i>= this.user.groupes.length; i++) {
              this.user.groupes.idGroupe = this.user.groupes[i].idGroupe;
              console.log(this.user.groupes.idGroupe);
          }*/
      })
     /* this.user.groupes = u.groupes;
        this.userT =u.groupes;*/

      /*this.user = user;
      this.user_form.controls['nom'].setValue(user.nom);
      this.user_form.controls['prenom'].setValue(user.prenom);
      this.user_form.controls['username'].setValue(user.username);
      this.user_form.controls['email'].setValue(user.email);
      this.user_form.controls['password'].setValue(user.passwd);
      this.user_form.controls['confirm_pass'].setValue(user.passwd);
      this.user_form.controls['profile'].setValue(user.profile);*/
    }

    edit() {
        /*console.log('********** Edition ********');
        console.log(this.user);*/
        if(this.user.password != this.user.passwordConfirmed) {
            this.invalid_Pass = true;
          } else {
              this.invalid_Pass = false;
              this.subscribeToSaveResponse(this.userService.update(this.user));
          }
    }

    deleteUser(user: User){ //----------------- DELETE
        // console.log(user);
        this.subscribeToSaveResponse(this.userService.delete(user));
    }

    change_profile(e){
      this.user_form.contains['profile'].setValue(e.target.value);
    }


    registerChangeInUsers() {
      this.eventManager.subscribe( 'usersListModification', ( response ) => this.loadAll() );
    }

    subscribeToSaveResponse(result: Observable<User>) {
        result.subscribe((res: User) => {
            // console.log(res);
            this.onSaveSuccess(res);
            });
      }

    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'usersListModification'} );
        this.ngOnInit();
      }

    close() {
        this.ngOnInit();
      }

    /************************************* Détais et suppression  ***********************************/
    /*detailsUser(u: User) {
      this.mode = 4;
      this.userService.find(u).subscribe(data => {
          this.user = data;
      })
    }*/


    // Fonction permettant de supprimer la ligne cochée
    /*deleteCheck(id: number, event: any) {
          this.userService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'usersListModification'});
              this.ngOnInit();
          });
    }*/

    /****************************** Création *************************************/
    /*createUser() {
      this.mode = 2;
    }

    save() {
      // this.user.codeUser = this.id;
      this.subscribeToSaveResponse(this.userService.create(this.user));
    }

    subscribeToSaveResponse(result: Observable<User>) {
      result.subscribe((res: User) => {
          // console.log(res);
          this.onSaveSuccess(res);
          });
    }



    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'usersListModification'} );
      this.ngOnInit();
    }

    /****************************** Edition *************************************/
    /*editUser(id:number) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });
      this.userService.find(id).subscribe( (user) => {
          this.user = user;
      });
      // this.edit();
    }

    edit() {
      /*this.userService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'usersListModification'});
      });
      this.user.codeUser = this.id;*/
      //this.subscribeToSaveResponse(this.userService.update(this.user));
    //}

}
