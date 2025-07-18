import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'; // Adicionado para navegação

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class ServicesPage implements OnInit {
  public services: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
  }> = [
    { id: 1, name: 'Troca de Pneu', description: 'Serviço de troca de pneus', image: 'assets/images/troca.png' },
    { id: 2, name: 'Partida com Bateria', description: 'Serviço de partida com bateria', image: 'assets/images/partida-bateria.png' },
    { id: 3, name: 'Entrega de Combustível', description: 'Serviço de entrega de combustível', image: 'assets/images/entrega-combustivel.png' },
    { id: 4, name: 'Serviço de Chaveiro', description: 'Serviço de chaveiro', image: 'assets/images/servico-chaveiro.png' },
    { id: 5, name: 'Motor', description: 'Serviço de motor', image: 'assets/images/motor.png' },
    { id: 6, name: 'Travões', description: 'Serviço de travões e calços', image: 'assets/images/travao.png' },
    { id: 7, name: 'Ar Condicionado', description: 'Serviço de Ar Condicionado', image: 'assets/images/ac.jpg' },
    { id: 8, name: 'Fechaduras e Trancas', description: 'Serviço de alteração da fechadura.', image: 'assets/images/fechadura.jpg' },
    { id: 9, name: 'Luzes e Faróis', description: 'Serviço de troca de farois.', image: 'assets/images/luzes.jpg' },
  ];

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router: Router // Adicionado
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.navCtrl.navigateBack('/login');
      }
    });
  }

  public handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-service.png';
    img.alt = 'Imagem não disponível';
  }

  public trackById(index: number, item: any): number {
    return item.id;
  }

  // Função para redirecionar ao clicar na imagem
  public onImageClick(serviceId: number): void {
    this.router.navigate(['/select-location', serviceId]);
  }
}