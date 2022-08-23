import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { Global } from "../services/global";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService,UploadService]
})
export class RegisterComponent implements OnInit {

  public user:User;
  public missatge:any;
  public filesToUpload:any;
  public user_desat:any;
  public error:boolean;

  constructor(
    private _userService:UserService,
    private _uploadService:UploadService
  ) {
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._userService.register(this.user).subscribe(
      response => {
        //console.log(response)
        this.user_desat = response;
        if (this.user_desat.user._id != "")
        {
          //console.log(this.user_desat.user._id);
          this.missatge = "user created correctly.";
        }
      },
      error => {
        this.error = true;
        this.missatge = "something went wrong.";
        //console.log(<any>error);
      }
    );
  }

}
