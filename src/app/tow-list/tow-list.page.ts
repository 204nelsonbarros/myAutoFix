import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tow-list',
  templateUrl: './tow-list.page.html',
  styleUrls: ['./tow-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TowListPage implements OnInit {
  towServices = [
    { id: 1, name: 'Reboque Orlando', image: 'assets/images/mecanico-foto2.png', description: 'Serviço de reboque 24h' },
    { id: 2, name: 'Luis Reboques', image: 'assets/images/Avatar1-Reboque.png', description: 'Reboque com seguro incluído' }
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

  goToTowDetails(towId: number) {
    this.router.navigate(['/tow-details', towId], {
      state: { serviceId: this.serviceId, location: this.location }
    });
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg'; // Substitui por placeholder
  }
}