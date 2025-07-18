import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage {
  email: string = '';
  isSubmitting: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async resetPassword(form: NgForm) {
    if (form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;

    const loading = await this.loadingCtrl.create({
      message: 'Enviando link de recuperação...',
      spinner: 'crescent',
      duration: 5000
    });

    try {
      await loading.present();
      await this.afAuth.sendPasswordResetEmail(this.email);
      await this.mostrarToast('Email de recuperação enviado com sucesso!', 'success');
      await loading.dismiss();
      this.navCtrl.navigateForward('/login').catch(err => {
        console.error('Erro ao navegar para /login:', err);
        this.mostrarToast('Erro ao redirecionar para login: ' + err.message);
      });
    } catch (error: any) {
      await loading.dismiss();
      this.tratarErros(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private async tratarErros(error: any) {
    let mensagem = 'Erro ao enviar email de recuperação';
    
    switch (error.code) {
      case 'auth/invalid-email':
        mensagem = 'Formato de email inválido';
        break;
      case 'auth/user-not-found':
        mensagem = 'Nenhum usuário encontrado com este email';
        break;
      case 'auth/too-many-requests':
        mensagem = 'Muitas tentativas. Tente novamente mais tarde';
        break;
    }

    await this.mostrarToast(mensagem, 'danger');
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

  backToLogin() {
    this.navCtrl.navigateBack('/login').catch(err => {
      console.error('Erro ao navegar para /login:', err);
      this.mostrarToast('Erro ao redirecionar para login: ' + err.message);
    });
  }
}