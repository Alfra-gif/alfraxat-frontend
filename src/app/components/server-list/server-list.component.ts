import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user';
import { Chat } from '../models/chat';
import { Global } from '../services/global';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {

  public user: any;
  public chat: any;
  public url:string;

  public token: any;
  public friends_array: any;
  public id:any;
  
  @Input()
  public input: any;
  @Input()
  public input2: any;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cookieService: CookieService
  ) {
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
    this.chat = new Chat("", [], [], new Date());
    this.friends_array = [];
    this.url = Global.url;
  }


  ngOnInit(): void {
    
    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;

    this._userService.get_user(this.token._id).subscribe(
      response => {
    
        this.user = response.user;
    
        for (let i = 0; i < this.user.friends.length; i++) {
          this._userService.get_user(this.user.friends[i]).subscribe(
            response => {
              this.friends_array.push(response.user);
            }
          )
        }
      }
    )
  }

  route_xat(id:any){

    this._router.navigate(["/xat/"+id])

    setTimeout(() => {

      this._route.paramMap.subscribe(params => {

        this.id = params.get('id');

        this.chat.users_array = [this.token._id,this.id];

        this._userService.create_chat(this.chat).subscribe(
          response => {
            this.chat = response.chat
          }
        )
      
      });
    }, 200) 

  }

  close_session(){
    this._cookieService.delete("userToken","/xat","10.42.10.57");
    this._cookieService.delete("userToken","/","10.42.10.57");
    location.reload();
  }

  delete_chat(){
    this.input2.messages = []
    this._userService.insert_messages(this.input2).subscribe(
      response => {
        //console.log(response)
      }
    )
  }

  route_config(){

    this._router.navigate(["/config"])

    setTimeout(() => {

      this._route.paramMap.subscribe(params => {

        this.id = params.get('id');
      
      });
    }, 100) 
  }

}
