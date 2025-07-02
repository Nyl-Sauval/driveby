import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Stocker le token reçu
        localStorage.setItem('token', data.data.token);

        console.log('Token reçu :', data.data.token);

        // ✅ Redirection
        this.navCtrl.navigateRoot('/home');
      } else {
        // ❌ Afficher une erreur
        const toast = await this.toastController.create({
          message: data.message || 'Erreur lors de la connexion',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Erreur de connexion au serveur',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
