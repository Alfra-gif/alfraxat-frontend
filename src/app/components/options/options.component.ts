import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

import { Chat } from '../models/chat';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  public chat: any;
  public id: any;
  public token: any;

  @Input()
  public input: any;

  constructor(
    private _cookieService: CookieService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,

  ) { 
    this.chat = new Chat("", [], [], new Date());
  }

  ngOnInit(): void {

    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;

  }

  close_session(){
    this._cookieService.delete("userToken","/xat","10.42.10.57");
    this._cookieService.delete("userToken","/","10.42.10.57");
    location.reload();
  }

  delete_chat(){
    this.input.messages = []
    this._userService.insert_messages(this.input).subscribe(
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
