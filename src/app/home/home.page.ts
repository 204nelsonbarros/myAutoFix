import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { search, home, construct, time, person, logOut, car, batteryCharging, flask, key } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  userName: string | null = null;
  popularServices = [
    { 
      id: 1, 
      name: 'Troca de Pneu', 
      icon: 'car',
      image: 'assets/images/troca.png'
    },
    { 
      id: 2, 
      name: 'Partida com Bateria', 
      icon: 'battery-charging',
      image: 'assets/images/partida-bateria.png'
    },
    { 
      id: 3, 
      name: 'Entrega de Combustível', 
      icon: 'flask',
      image: 'assets/images/entrega-combustivel.png'
    },
    { 
      id: 4, 
      name: 'Serviço de Chaveiro', 
      icon: 'key',
      image: 'assets/images/servico-chaveiro.png'
    }
  ];
  currentAddress = '';

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({ search, home, construct, time, person, logOut, car, batteryCharging, flask, key });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log('Auth State Changed:', user ? 'Logado' : 'Deslogado'); // Depuração
      if (user) {
        this.userName = user.displayName || user.email || 'Usuário';
      } else {
        this.router.navigate(['/login']); // Usar Router para redirecionamento
      }
    });
  }

  getSafeImagePath(imageName: string): string {
    const cleanedPath = imageName.replace(/^.*assets\/images\//, '');
    return `assets/images/${cleanedPath}`;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default-service.png';
    imgElement.alt = 'Imagem não disponível';
  }

  selectService(service: any) {
    console.log('Clicou no serviço:', service.name); // Depuração
    this.router.navigate(['/services']);
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Logout realizado com sucesso'); // Depuração
      await this.mostrarToast('Logout realizado com sucesso!', 'success');
      this.router.navigate(['/login'], { replaceUrl: true }); // Forçar substituição da URL
      window.location.href = '/login'; // Forçar recarregar como último recurso
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error.message); // Depuração
      await this.mostrarToast('Erro ao fazer logout: ' + error.message, 'danger');
    }
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