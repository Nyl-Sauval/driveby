import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-homepage',
  imports: [
    NgOptimizedImage, MatButtonModule, RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
