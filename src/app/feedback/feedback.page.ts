import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FeedbackPage {
  rating: number = 0;
  feedbackText: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  setRating(value: number) {
    this.rating = value;
  }

  async submitFeedback() {
    if (this.rating && this.feedbackText) {
      // Aqui você pode adicionar a lógica para enviar o feedback para um backend
      console.log('Feedback enviado:', { rating: this.rating, feedbackText: this.feedbackText });

      // Exibir um toast de sucesso
      const toast = await this.toastController.create({
        message: 'Feedback enviado com sucesso!',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      await toast.present();

      // Redirecionar para a página inicial ou outra página
      this.router.navigate(['/home']);
    }
  }


}