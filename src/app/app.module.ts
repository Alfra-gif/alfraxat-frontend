import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
//import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { XatComponent } from './components/xat/xat.component';
import { ConfigComponent } from './components/config/config.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { OptionsComponent } from './components/options/options.component';
import { ServerListComponent } from './components/server-list/server-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RequestsComponent } from './components/requests/requests.component';

@NgModule({
  declarations: [
    ErrorComponent,
    LoginComponent,
    AppComponent,
    RegisterComponent,
    HomeComponent,
    XatComponent,
    ConfigComponent,
    FriendListComponent,
    OptionsComponent,
    ServerListComponent,
    SpinnerComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
