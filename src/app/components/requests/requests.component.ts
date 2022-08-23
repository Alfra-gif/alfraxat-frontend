import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user';

import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public token: any;
  public user: User;
  public requests_list: any;
  public friends_array: any;
  public requests_delete: any;

  constructor(
    private _userService:UserService,
    private _cookieService: CookieService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
    this.requests_list = [];
    this.friends_array = [];
    this.requests_delete = [];
  }

  ngOnInit(): void {

    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;
    setTimeout(() => {
      
      this._userService.get_user(this.token._id).subscribe(
        response => {
          this.user = response.user;
        }
      )
      setTimeout(() => {

        for (let i = 0; i < this.user.requests.length; i++) {
          this._userService.get_user(this.user.requests[i]).subscribe(
            response => {
              this.user = response.user;
              this.requests_list.push(this.user)
            }
          )
        }
      }, 200)  
    }, 100)

  }

  accept_request(id:any){

    this._userService.get_user(this.token._id).subscribe(
      response => {

        this.user = response.user;
        this.friends_array = this.user.friends
        this.friends_array.push(id._id);

        this.requests_delete = this.user.requests

        for (let i = 0; i < this.user.requests.length; i++) {
          if (this.user.requests[i] == id._id) {
            this.requests_delete.splice([i],1);
          }
        }

        this.user.friends = this.friends_array
        this.user.requests = this.requests_delete

        setTimeout(() => {

          this._userService.edit_user(this.user).subscribe(
            response => {
              this._userService.get_user(id._id).subscribe(
                response => {
                  this.user = response.user;

                  this.friends_array = this.user.friends
                  this.friends_array.push(this.token._id);
                  this.user.friends = this.friends_array
                  this._userService.edit_user(this.user).subscribe(
                    response => {
                  })

              });
            });
        }, 100)
      }
    )
    setTimeout(() => {
      //alert("you're now friends with @"+id.username+"!")
      const prevConfiguration = this._router.routeReuseStrategy.shouldReuseRoute;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = "reload";
        this._router.navigate(["./"], { relativeTo: this._route }).then(() => {
          this._router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
          this._router.onSameUrlNavigation = "ignore";
      });
    }, 200)
  }
  reject_request(id:any){
    this._userService.get_user(this.token._id).subscribe(
      response => {

        this.user = response.user;
        this.requests_delete = this.user.requests

        for (let i = 0; i < this.user.requests.length; i++) {
          if (this.user.requests[i] == id._id) {
            this.requests_delete.splice([i],1);
          }
        }

        this.user.requests = this.requests_delete

        setTimeout(() => {

          this._userService.edit_user(this.user).subscribe(
            response => {
            }
          );
        }, 100)

      }
    )
    setTimeout(() => {
      //alert("request rejected.")
      const prevConfiguration = this._router.routeReuseStrategy.shouldReuseRoute;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = "reload";
        this._router.navigate(["./"], { relativeTo: this._route }).then(() => {
          this._router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
          this._router.onSameUrlNavigation = "ignore";
      });
    }, 200)
  }
}
