import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-completed',
  templateUrl: './service-completed.page.html',
  styleUrls: ['./service-completed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ServiceCompletedPage {
  paymentDate: string = '';
  paymentTime: string = '';
  serviceValue: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.paymentDate = params['paymentDate'] || 'Não disponível';
      this.paymentTime = params['paymentTime'] || 'Não disponível';
      this.serviceValue = params['serviceValue'] ? Number(params['serviceValue']) : 0;
      console.log('Parâmetros recebidos:', params);
    });
  }

  sendFeedback() {
    // Navegar para a página de feedback
    this.router.navigate(['/feedback']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}