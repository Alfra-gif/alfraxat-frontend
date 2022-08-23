import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { CookieService } from 'ngx-cookie-service';
import { Global } from "../services/global";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService,UploadService]
})
export class LoginComponent implements OnInit {

  public user:User;
  public missatge:any;
  public filesToUpload:any;
  public user_desat:any;
  public error:boolean;

  constructor(
    private _userService:UserService,
    private _uploadService:UploadService,
    private _cookieService:CookieService,
    private router: Router
  ){
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._userService.login(this.user).subscribe(
      response => {
        this._cookieService.set("userToken",response.userToken)
        this.router.navigate(["/home"])
        //console.log(response.userToken)
      },
      error => {
        this.error = true;
        this.missatge = "hi ha hagut un problema";
        console.log(<any>error);
      }
    );
  }

}
