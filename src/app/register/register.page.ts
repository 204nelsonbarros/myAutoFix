import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isSubmitting: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async register(form: NgForm) {
    if (form.invalid || this.isSubmitting) return;
    if (this.password !== this.confirmPassword) {
      this.mostrarToast('As senhas não coincidem');
      return;
    }

    this.isSubmitting = true;

    const loading = await this.loadingCtrl.create({
      message: 'Criando conta...',
      spinner: 'crescent',
      duration: 5000
    });

    try {
      await loading.present();
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      await userCredential.user?.sendEmailVerification();
      await this.mostrarToast('Conta criada! Verifique seu email para ativar.');
      await this.afAuth.signOut();
      await loading.dismiss();
      this.navCtrl.navigateForward('/login').catch(err => {
        console.error('Erro ao navegar para /login:', err);
        this.mostrarToast('Erro ao redirecionar para login: ' + err.message);
      });
    } catch (error: any) {
      await loading.dismiss();
      this.tratarErrosRegistro(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private async tratarErrosRegistro(error: any) {
    let mensagem = 'Erro ao criar conta. Tente novamente.';
    
    switch (error.code) {
      case 'auth/invalid-email':
        mensagem = 'Formato de email inválido';
        break;
      case 'auth/email-already-in-use':
        mensagem = 'Este email já está em uso';
        break;
      case 'auth/weak-password':
        mensagem = 'A senha deve ter pelo menos 6 caracteres';
        break;
      case 'auth/too-many-requests':
        mensagem = 'Muitas tentativas. Tente mais tarde';
        break;
    }

    await this.mostrarToast(mensagem);
  }

  private async mostrarToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: 'success',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }
}