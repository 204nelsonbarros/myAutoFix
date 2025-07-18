import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mechanic-details',
  templateUrl: './mechanic-details.page.html',
  styleUrls: ['./mechanic-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MechanicDetailsPage implements OnInit {
  mechanic: any;
  serviceId: number | null = null;
  location: any | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    const mechanicId = +this.route.snapshot.paramMap.get('id')!;
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.serviceId = navigation.extras.state['serviceId'];
      this.location = navigation.extras.state['location'];
    }

    const mechanics = [
      { id: 1, name: 'João Silva', image: 'assets/images/foto-mecanico.png', description: 'Mecânico especializado em motores', services: ['Troca de óleo', 'Reparo de motor', 'Alinhamento'], contact: 'joao@example.com' },
      { id: 2, name: 'Maria Oliveira', image: 'assets/images/Avatar-feminio.png', description: 'Experiente em reparos gerais', services: ['Freios', 'Suspensão', 'Diagnóstico'], contact: 'maria@example.com' }
    ];
    this.mechanic = mechanics.find(m => m.id === mechanicId);
  }

  ngOnInit() {}

  hireMechanic() {
    if (this.mechanic) {
      console.log('Navegando para a página de pagamentos...', {
        mechanic: this.mechanic,
        serviceId: this.serviceId,
        location: this.location
      });
      
      this.router.navigate(['/payment'], {
        state: {
          mechanic: this.mechanic,
          serviceId: this.serviceId,
          location: this.location
        }
      }).catch(error => {
        console.error('Erro na navegação:', error);
      });
    } else {
      console.warn('Dados do mecânico não disponíveis');
    }
  }

  callMechanic() {
    if (this.mechanic && this.mechanic.contact) {
      window.location.href = `tel:${this.mechanic.contact.replace('@example.com', '+244921516660')}`;
    }
  }

  sendMessage() {
    if (this.mechanic && this.mechanic.contact) {
      window.location.href = `mailto:${this.mechanic.contact}?subject=Assistência%20myAutoFix&body=Olá,%20preciso%20de%20ajuda!`;
    }
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg';
  }
}