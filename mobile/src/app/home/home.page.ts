import { Component, OnInit } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [CommonModule, IonicModule, RouterModule, NgIf],
})
export class HomePage implements OnInit {
  user: any = null;

  async ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('📦 Token récupéré du localStorage:', token);

    if (!token) {
      console.error('❌ Aucun token trouvé. L’utilisateur n’est pas connecté.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Utilisateur connecté :', data.user);
        this.user = data.user;
      } else {
        const error = await response.text();
        console.error(`❌ Erreur API /me (${response.status}) :`, error);
      }
    } catch (err) {
      console.error('❌ Erreur réseau lors de l’appel API :', err);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
