import { Component, OnInit, Inject, LOCALE_ID, ViewChild, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';

import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Chat } from '../models/chat';
import { User } from '../models/user';

import { Subscription, timer, switchMap } from 'rxjs';

import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.css']
})
export class XatComponent implements OnInit {
  @ViewChild('target') private myScrollContainer: ElementRef;

  scrollToElement(el): void {
    setTimeout(() => {
      //console.log(el)
      this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
    }, 100)
  }


  public user: any;
  public chat: any;
  public token: any;
  public id:any;
  public friend: any;
  public formatted_date: any;

  public friends_array: any;
  public final_friends_array: any;

  public subscription !: Subscription;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cookieService: CookieService,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.user = new User("", "", "", "", [], "", "", new Date(), "", []);
    this.chat = new Chat("", [], [], new Date());
    this.friends_array = [];
    this.final_friends_array = [];
    this.friend = new User("", "", "", "", [], "", "", new Date(), "", []);
    this.id = "";
    this.formatted_date = new Date()
  }

  ngOnInit(): void {
    
    this.token = JSON.parse(atob(this._cookieService.get("userToken").split('.')[1])).user;

    setTimeout(() => {

      this._route.paramMap.subscribe(params => {
        this.id = params.get('id');

        this._userService.get_user(this.id).subscribe(
          response => {
            this.friend = response.user
          }
        );

        this.chat.username = this.token.username
        this.chat.users_array = [this.token._id,this.id];
      });
    
      this.subscription = timer(0, 1000).pipe(
        switchMap(() => this._userService.create_chat(this.chat))
      ).subscribe(
        response => {
          this.chat = response.chat
        }
      )

    }, 200)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {

    const pattern = /^[^\s].*/;
    let result = pattern.test(this.user.message);
    const pattern2 = /[A-Za-z]+:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/;
    let result2 = pattern2.test(this.user.message)
    //console.log(result2)
    
    if (result){

      this.formatted_date = formatDate(new Date(), 'EEEE, MMMM d, y h:mm:ss' ,this.locale);

      this.chat.message=this.user.message

      this.chat.messages.push([this.token._id,this.chat.message,this.formatted_date,result2])
      this._userService.insert_messages(this.chat).subscribe(
        response => {
        }
      )
      this.user.message = ""  
    }
  }

}
