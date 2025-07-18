import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mechanics-list',
  templateUrl: './mechanics-list.page.html',
  styleUrls: ['./mechanics-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MechanicsListPage implements OnInit {
  mechanics = [
    { id: 1, name: 'João Silva', image: 'assets/images/foto-mecanico.png', description: 'Mecânico especializado em motores' },
    { id: 2, name: 'Maria Oliveira', image: 'assets/images/Avatar-feminio.png', description: 'Experiente em reparos gerais' }
  ];
  serviceId: number | null = null;
  location: any | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.serviceId = navigation.extras.state['serviceId'];
      this.location = navigation.extras.state['location'];
    }
  }

  ngOnInit() {}

  goToMechanicDetails(mechanicId: number) {
    this.router.navigate(['/mechanic-details', mechanicId], {
      state: { serviceId: this.serviceId, location: this.location }
    });
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg'; // Substitui por uma imagem placeholder
    // Ou simplesmente: imgElement.style.display = 'none'; para ocultar
  }
}