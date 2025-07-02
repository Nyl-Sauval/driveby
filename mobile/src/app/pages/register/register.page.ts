import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage {
  name = '';
  firstname = '';
  email = '';
  phone = '';
  dob = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async register() {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        phone: this.phone,
        dob: this.dob,
        password: this.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.data.token);
      this.navCtrl.navigateRoot('/home');
    } else {
      const toast = await this.toastController.create({
        message: data.message || 'Erreur lors de l’inscription',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
