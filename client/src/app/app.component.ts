import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthService} from './service/auth.service';
import {MatIcon} from '@angular/material/icon';
import {LoginComponent} from './login/login.component';
import {EnregistrementComponent} from './enregistrement/enregistrement.component';
import {MatDialog} from '@angular/material/dialog';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, NgIf, RouterLink, MatButton, AsyncPipe, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'client';

  constructor(protected auth: AuthService, private loginDialog: MatDialog, private signinDialog: MatDialog) {
  }

  ngOnInit(){
    this.auth.restoreSession();
  }

  openLogin() {
    this.loginDialog.open(LoginComponent, {
      width: '400px',
    });
  }

  openSignin() {
    this.signinDialog.open(EnregistrementComponent, {
    })
  }
}
