import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentPage {
  serviceType: string = 'Enviar';
  serviceValue: number = 20000;
  selectedPaymentMethod: string = '';
  comprovativoEnviado: boolean = false;

  constructor(private router: Router) {}

  isPaymentButtonEnabled(): boolean {
    // O botão geral "Efetuar Pagamento" só é habilitado para métodos que não sejam "dinheiro" e após envio de comprovativo
    return this.selectedPaymentMethod !== 'dinheiro' && this.comprovativoEnviado;
  }

  onPaymentMethodChange() {
    // Reseta comprovativoEnviado quando o método "dinheiro" é selecionado
    if (this.selectedPaymentMethod === 'dinheiro') {
      this.comprovativoEnviado = false;
    }
  }

  openWhatsApp() {
    const phoneNumber = '+244921516660';
    const message = `Comprovativo de pagamento para ${this.serviceType} no valor de ${this.serviceValue} AKZ`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    this.comprovativoEnviado = true;
  }

  requestPaymentLink() {
    window.open('https://link-de-pagamento-externo.com', '_blank');
  }

  confirmPayment() {
    const now = new Date();
    const paymentDate = now.toLocaleDateString('pt-PT', { timeZone: 'Africa/Luanda', day: '2-digit', month: '2-digit', year: 'numeric' }); // Ex.: 17/07/2025
    const paymentTime = now.toLocaleTimeString('pt-PT', { timeZone: 'Africa/Luanda', hour: '2-digit', minute: '2-digit' }); // Ex.: 12:45
    console.log('Parâmetros enviados:', { paymentDate, paymentTime, serviceValue: this.serviceValue.toString() }); // Debug
    this.router.navigate(['/service-completed'], { queryParams: { paymentDate, paymentTime, serviceValue: this.serviceValue.toString() } }).then(() => {
      console.log('Navegação concluída');
    }).catch(err => {
      console.error('Erro na navegação:', err);
    });
  }
}