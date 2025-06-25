import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MatButton} from "@angular/material/button";
import {NgIf} from '@angular/common';
import {AuthService} from './service/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  constructor(protected auth: AuthService) {
  }
}
