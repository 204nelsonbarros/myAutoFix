import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HistoryPage implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.navCtrl.navigateBack('/login');
      }
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
}