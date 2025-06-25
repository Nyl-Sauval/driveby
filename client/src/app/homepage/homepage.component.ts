import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../service/auth.service';
import {NgIf} from '@angular/common';
import {EnregistrementComponent} from '../enregistrement/enregistrement.component';

@Component({
  selector: 'app-homepage',
  imports: [
    MatButtonModule, RouterLink, MatIconModule, NgIf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private loginDialog: MatDialog, private signinDialog: MatDialog, protected auth: AuthService) {}

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
