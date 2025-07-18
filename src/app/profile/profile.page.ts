import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class ProfilePage implements OnInit {
  // Dados do usuário
  public userName: string = 'Usuário Teste';
  public userEmail: string = 'usuario@teste.com';
  public phoneNumber: string = '(+244) 99999-9999';
  public address: string = 'Rua Exemplo, 123 - Lubango/Huila';
  public lastLogin: string = '14/07/2025 às 16:30';
  public serviceCount: number = 5;
  public profileImage: string = 'assets/images/profile.png';

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email || 'Não informado';
        // Carregar outros dados do usuário aqui
      }
    });
  }

  public async changeProfileImage(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Alterar Foto de Perfil',
      buttons: [
        {
          text: 'Tirar Foto',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Escolher da Galeria',
          icon: 'image',
          handler: () => {
            this.pickFromGallery();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  private async takePhoto(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      
      if (image.webPath) {
        this.profileImage = image.webPath;
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  }

  private async pickFromGallery(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
      
      if (image.webPath) {
        this.profileImage = image.webPath;
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  }

  public editProfile(): void {
    this.navCtrl.navigateForward('/edit-profile');
  }

  public changePassword(): void {
    this.navCtrl.navigateForward('/change-password');
  }

  public handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-profile.png';
    img.alt = 'Imagem de perfil padrão';
  }

  public goBack(): void {
    this.navCtrl.navigateBack('/home');
  }

  public logout(): void {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('/login');
    });
  }
}