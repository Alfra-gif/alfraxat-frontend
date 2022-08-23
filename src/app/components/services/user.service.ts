import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../models/user";
import { Global } from "./global";

@Injectable({
    providedIn: "root"
})
export class UserService {

    public url:String;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    register(user:User): Observable<any>{
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'save-user', params, {headers: headers})
    }

    login(user:User): Observable<any>{
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'login', params, {headers: headers})
    }

    get_user(user:any): Observable<any>{
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-user/'+user)
    }

    search_user(username:any): Observable<any>{
        const params = JSON.stringify(username);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'search-user/'+username)
    }

    edit_user(id:any): Observable<any>{
        const params = JSON.stringify(id);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'update-user/', params, {headers: headers})
    }

    create_chat(users_array:any): Observable<any>{
        const params = JSON.stringify(users_array);
        //console.log(users_array)
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'create-chat/', params, {headers: headers})
    }

    insert_messages(messages:any): Observable<any>{
        const params = JSON.stringify(messages);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'insert-messages/', params, {headers: headers})
    }

    get_chat(chat:any): Observable<any>{
        const params = JSON.stringify(chat);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-chat/'+chat)
    }
}