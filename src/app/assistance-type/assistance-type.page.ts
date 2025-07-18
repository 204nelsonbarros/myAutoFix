import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assistance-type',
  templateUrl: './assistance-type.page.html',
  styleUrls: ['./assistance-type.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AssistanceTypePage {
  location: Location | null = null;
  serviceId: number | null = null;

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.location = navigation.extras.state['location'];
      this.serviceId = navigation.extras.state['serviceId'];
    }
  }

  selectAssistanceType(type: 'mechanic' | 'tow') {
    if (!this.location) return;

    console.log(`Tipo de assistência selecionada: ${type}`);
    console.log('Localização:', this.location);
    console.log('Service ID:', this.serviceId);

    if (type === 'mechanic' && this.serviceId && this.location) {
      this.router.navigate(['/mechanics-list'], {
        state: { serviceId: this.serviceId, location: this.location }
      });
    } else if (type === 'tow' && this.serviceId && this.location) {
      this.router.navigate(['/tow-list'], {
        state: { serviceId: this.serviceId, location: this.location }
      });
    }
  }
}