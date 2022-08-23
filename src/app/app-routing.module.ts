import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { XatComponent } from './components/xat/xat.component';
import { ConfigComponent } from './components/config/config.component';
import { RequestsComponent } from './components/requests/requests.component';

import { UserGuardGuard } from './security/user-guard.guard';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  //{path: "about", component: AboutComponent, canActivate: [UserGuardGuard]},
  {path: "home", component: HomeComponent, canActivate: [UserGuardGuard]},
  {path: "xat/:id", component: XatComponent, canActivate: [UserGuardGuard]},
  {path: "config", component: ConfigComponent, canActivate: [UserGuardGuard]},
  {path: "requests", component: RequestsComponent, canActivate: [UserGuardGuard]},
  {path: "**", component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
