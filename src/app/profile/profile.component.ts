import { Component, OnInit } from '@angular/core';
// import {Profile} from '../CLASS/profile';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { Profile } from './profile.model';
import { Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile: Profile = new Profile();
    profiles: Profile[] = new Array();
    p: number = 1; // pour la pagination
    mode: number;
    header: string;

    
  constructor(
          private profileService: ProfileService,
          private eventManager: EventManagerService,
          private router: Router
  ) { }
    add_profile: boolean = false;
    edit_profile: boolean = false;
    invalid_req: boolean = false;
    lst_profile: Array<Profile> = [];
    profile_form: FormGroup = new FormGroup({
      libelle: new FormControl('', Validators.required)
    });

    ngOnInit() {
        this.mode = 1;
        this.profileService.getAll().subscribe(data => {
            this.profiles = Array(data);
        })
    }

    //-------------------- CREATE|UPDATE PROFILE REQUEST HERE ----------------
    create_profile(){
        this.mode = 2;
      this.invalid_req = !this.profile_form.valid;
      if(this.profile_form.valid){
        if(!this.edit_profile){ // *********************** CREATE *******************
          this.invalid_req = false;//------ (WARNING) hides the error label
          /*let profile = new Profile;
          profile.nomGroupe = this.profile_form.controls['libelle'].value;*/
          // this.lst_profile.push(profile);
          //----------------- CREATE PROFILE WHEN OK --------------------
          this.subscribeToSaveResponse(this.profileService.create(this.profile));
          
        }
        else{ // ******************** UPDATE*********************************** (warning) COMPARE WITH THE ID not the LIB
          /*let index = this.lst_profile.findIndex(p=> p.nomGroupe === this.profile.nomGroupe);
          this.profile.nomGroupe = this.profile_form.controls['libelle'].value;
          this.lst_profile[index] = this.profile;*/
          //----- UPDATE
          // this.profile.nomGroupe = this.profile_form.controls['libelle'].value;
          // this.subscribeToSaveResponse(this.profileService.update(this.profile));
        }
        this.profile_form.reset();
        this.add_profile = this.edit_profile = false; //------ (WARNING) hides the add/edit form
      }
    }
    
    createGroupe() {
        this.mode = 2;
        this.header = "Créer un profil";
        this.profile = new Profile;
    }
    
    save() {
        this.subscribeToSaveResponse(this.profileService.create(this.profile));
    }

    edit_item(profile: Profile){
        this.mode = 3;
          // console.log(profile);
          /*this.profile = profile;
          this.add_profile = this.edit_profile = true;
          this.profile_form.controls['libelle'].setValue(profile.nomGroupe);*/
          this.profileService.find(profile).subscribe(data => {
              this.profile = data;
          });
    }
    
    edit() {
        this.subscribeToSaveResponse(this.profileService.update(this.profile));
    }
    
    close() {
        this.mode = 1;
    }
    
    delete_item(profile: Profile){ // ******************* DELETE ******************
      // console.log(JSON.stringify(profile));
      this.subscribeToSaveResponse(this.profileService.delete(profile));
    }
    
    subscribeToSaveResponse(result: Observable<Profile>) {
        result.subscribe((res: Profile) => {
            this.onSaveSuccess(res);
        });
      }
      private onSaveSuccess( result ) {
          this.eventManager.broadcast( { name: 'profileListModification'} );
          this.ngOnInit();
          // this.router.navigateByUrl('/profils');
      }

}
