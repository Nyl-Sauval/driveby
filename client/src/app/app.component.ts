import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
