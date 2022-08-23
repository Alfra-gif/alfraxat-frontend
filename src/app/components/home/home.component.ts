import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user';
import { Chat } from '../models/chat';

import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any;
  public user_to_add: any;
  public chat: any;
  public token: any;
  public id:any;

  public friends_array: any;
  public final_friends_array: any;
  public users_array: any;
  public is_friend: any;
  public is_requested: any;
  public requests_array: any;

  public message: any;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cookieService: CookieService,
    private location: Location
  ) {
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
    this.user_to_add = new User("", "", "", "", [], "", "", new Date(), "", []);
    this.chat = new Chat("", [], [], new Date());

    this.friends_array = [];
    this.requests_array = [];
    this.final_friends_array = [];

    this.is_friend = false;
    this.is_requested = false;
    this.message = ""
    this.id="";

  }

  ngOnInit(): void {

    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;

    setTimeout(() => {
      
      this._userService.get_user(this.token._id).subscribe(
        response => {
  
          this.user = response.user;
  
          for (let i = 0; i < this.user.friends.length; i++) {
            this.friends_array.push(this.user.friends[i]);
          }
  
          for (let i = 0; i < this.friends_array.length; i++) {
            this._userService.get_user(this.friends_array[i]).subscribe(
              response => {
                this.final_friends_array.push(response.user);
              }
            )
          }
        }
      )
    }, 1000)  
  }

  onSubmit() {

    if (this.user.search != null && this.user.search != ""){
      const pattern = /^[\w_]{0,12}$/g;
      let result = pattern.test(this.user.search);
      if (result){
        setTimeout(() => {
          this.users_array = [];
          this._userService.search_user(this.user.search).subscribe(
            response => {
              for (let i = 0; i < response.user.length; i++) {
                if (response.user[i]._id != this.token._id){
                  
                  this.users_array.push(response.user[i]);
                }
              }
            }
          );
        }, 0)
      }  
    }

  }

  add_friend(id:any) {
    
    //console.log(this.token._id)

    setTimeout(() => {

      this._userService.get_user(id._id).subscribe(
        response => {
          this.user_to_add = response.user
          this.requests_array = this.user_to_add.requests
          //console.log(this.user_to_add)
        }
      );

      this._userService.get_user(this.token._id).subscribe(
        response => {
          this.user = response.user
          //console.log(this.user)
        }
      );

    }, 100)

      setTimeout(() => {

        for (let i = 0; i < this.user.friends.length; i++) {
          if (this.user.friends[i] == this.user_to_add._id){
            this.is_friend = true;
            alert("this user is already your friend!")
          }
        }
        
        for (let i = 0; i < this.user.friends.length; i++) {
          if (this.token._id == this.user.friends[i]){
            this.is_friend = true;
            alert("this user is already your friend!")
          }
        }

        for (let i = 0; i < this.user_to_add.requests.length; i++) {
          if (this.token._id == this.user_to_add.requests[i]){
            this.is_friend = true;
            alert("you already sent a request to this user.")
          }
        }

        if (this.is_requested == false && this.is_friend == false){

          this.requests_array.push(this.token._id);
          this.user_to_add.requests = this.requests_array;
          
          this._userService.edit_user(this.user_to_add).subscribe(
            response => {
              //console.log(response)
            }
          );

          this.chat = new Chat("", [], [], new Date());
          this.chat.users_array = [this.token._id,id._id];
        
          this._userService.create_chat(this.chat).subscribe(
            response => {
              this.chat = response.chat
            }
          )
        
          setTimeout(() => {
        
            this._userService.edit_user(this.user).subscribe(
              response => {
              }
            );
        
            this.final_friends_array = []
            for (let i = 0; i < this.friends_array.length; i++) {
              this._userService.get_user(this.friends_array[i]).subscribe(
                response => {
                  this.final_friends_array.push(response.user);
                }
              )
            }
          }, 200)
                
          setTimeout(() => {
            alert("friend request sent.")
          }, 300)
        }
      }, 200)

  }

  remove_friend(id:any) {

    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;

    this._userService.get_user(this.token._id).subscribe(
      response => {
        this.user = response.user
        this.friends_array = this.user.friends
        
        for (let i = 0; i < this.user.friends.length; i++) {
          if (this.user.friends[i] == id._id) {
            this.user.friends.splice([i],1);
          }
        }

      }
    );

    setTimeout(() => {

      this._userService.edit_user(this.user).subscribe(
        response => {
          this._userService.get_user(id._id).subscribe(
            response => {
              this.user = response.user
              this.friends_array = this.user.friends
              
              for (let i = 0; i < this.user.friends.length; i++) {
                if (this.user.friends[i] == this.token._id) {
                  this.user.friends.splice([i],1);
                }
              }
              this._userService.edit_user(this.user).subscribe(
                response => {              
                }
              );
        
            }
          );
      
        }
      );

      //this.final_friends_array = []
      for (let i = 0; i < this.friends_array.length; i++) {
        this._userService.get_user(this.friends_array[i]).subscribe(
          response => {
            this.final_friends_array.push(response.user);
          }
        )
      }
    }, 100)

    setTimeout(() => {
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



