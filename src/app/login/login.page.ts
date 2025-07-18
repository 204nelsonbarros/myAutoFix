import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async login(form: NgForm) {
    if (form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      if (userCredential.user?.emailVerified) {
        await this.navCtrl.navigateForward('/home');
        await this.mostrarToast('Login realizado com sucesso!', 'success');
      } else {
        await this.afAuth.signOut();
        await this.mostrarToast('Por favor, verifique seu email antes de fazer login.', 'warning');
      }
    } catch (error: any) {
      await this.mostrarToast('Erro ao fazer login: ' + error.message, 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await this.afAuth.signInWithPopup(provider);
      if (userCredential.user) {
        await this.navCtrl.navigateForward('/home');
        await this.mostrarToast('Login com Google realizado com sucesso!', 'success');
      }
    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        await this.mostrarToast(
          'Este email já está registrado com outro provedor. Faça login com o provedor original.',
          'warning'
        );
      } else {
        await this.mostrarToast('Erro ao fazer login com Google: ' + error.message, 'danger');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  irParaRegistro() {
    this.navCtrl.navigateForward('/register').catch(err => {
      this.mostrarToast('Página de registro não disponível: ' + err.message, 'danger');
    });
  }

  irParaRecuperacaoSenha() {
    this.navCtrl.navigateForward('/forgot-password').catch(err => {
      this.mostrarToast('Página de recuperação de senha não disponível: ' + err.message, 'danger');
    });
  }

  private async mostrarToast(mensagem: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: color,
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }
}