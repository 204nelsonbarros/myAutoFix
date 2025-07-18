import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tow-details',
  templateUrl: './tow-details.page.html',
  styleUrls: ['./tow-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TowDetailsPage implements OnInit {
  towService: any;
  serviceId: number | null = null;
  location: any | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    const towId = +this.route.snapshot.paramMap.get('id')!;
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.serviceId = navigation.extras.state['serviceId'];
      this.location = navigation.extras.state['location'];
    }

    // Dados de exemplo baseados na lista de reboques
    const towServices = [
      { 
        id: 1, 
        name: 'Reboque Orlando', 
        driverImage: 'assets/images/mecanico-foto2.png', 
        licensePlate: 'ABC-1234', 
        description: 'Serviço de reboque 24h', 
        services: ['Reboque leve', 'Reboque pesado', 'Assistência 24h'], 
        contact: 'rapido@example.com' 
      },
      { 
        id: 2, 
        name: 'Luis Reboques', 
        driverImage: 'assets/images/Avatar1-Reboque.png', 
        vehicleImage: 'assets/images/reboque.png', 
        licensePlate: 'XYZ-5678', 
        description: 'Reboque com seguro incluído', 
        services: ['Reboque com seguro', 'Transporte seguro', 'Resgate'], 
        contact: 'seguro@example.com' 
      }
    ];
    this.towService = towServices.find(t => t.id === towId);
  }

  ngOnInit() {}

  hireTowService() {
    if (this.towService && this.serviceId && this.location) {
      console.log('Reboque contratado:', this.towService.name);
      console.log('Localização:', this.location);
      console.log('Service ID:', this.serviceId);
      // Lógica para confirmar contratação (a implementar)
      this.router.navigate(['/payment'], { state: { serviceId: this.serviceId, location: this.location } });
    }
  }

  callTowService() {
    if (this.towService && this.towService.contact) {
      console.log('Ligando para:', this.towService.contact);
      window.location.href = `tel:${this.towService.contact.replace('@example.com', '+123456789')}`; // Substitua por número real
    }
  }

  sendMessage() {
    if (this.towService && this.towService.contact) {
      console.log('Enviando mensagem para:', this.towService.contact);
      window.location.href = `mailto:${this.towService.contact}?subject=Assistência%20myAutoFix&body=Olá,%20preciso%20de%20reboque!`;
    }
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg';
  }
}