import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Global } from '../services/global';

import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [UserService,UploadService]
})
export class ConfigComponent implements OnInit {

  public user:User;
  public missatge:any;
  public filesToUpload:any;
  public error:boolean;
  public token: any;
  public user_desat: any;

  constructor(
    private _userService:UserService,
    private _cookieService: CookieService,
    private _uploadService:UploadService
  ) {
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
  }

  ngOnInit(): void {

    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;

    this._userService.get_user(this.token._id).subscribe(
      response => {
        this.user = response.user;
      }
    )

    //console.log(this.user)
  }

  onSubmit(){
    //console.log(this.user)
    this._userService.edit_user(this.user).subscribe(
      response => {
        this.user_desat = response.user;
        //console.log(response)
        this._uploadService.makeFileRequest(
          Global.url+"upload-image/"+this.user_desat._id,
          [],
          this.filesToUpload,
          "image"
        ).then((result:any) => {
          //console.log(result);
        });
        this.missatge = "user saved correctly, relog to see the changes.";
      },
      error => {
        this.error = true;
        this.missatge = "something went wrong.";
        //console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    //console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
