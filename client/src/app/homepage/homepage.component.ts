import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';


@Component({
  selector: 'app-homepage',
  imports: [
    MatButtonModule, RouterLink, MatIconModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private dialog: MatDialog) {}

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }
}
