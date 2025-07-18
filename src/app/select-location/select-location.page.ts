import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.page.html',
  styleUrls: ['./select-location.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule]
})
export class SelectLocationPage implements OnInit {
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  serviceId: number | null = null;
  serviceName: string = '';
  searchQuery: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.serviceId = +this.route.snapshot.paramMap.get('id')!;
    this.serviceName = this.getServiceName(this.serviceId);
  }

  private getServiceName(id: number | null): string {
    const services: {[key: number]: string} = {
      1: 'Troca de Pneu',
      2: 'Partida com Bateria',
      3: 'Entrega de Combustível',
      4: 'Serviço de Chaveiro',
      5: 'Serviço de Motor',
      6: 'Travões de Carro',
      7: 'Serviço de Mecânico',
      8: 'Ar Condicionado',
      9: 'Fechaduras e Trancas',
      10: 'Luzes e Faróis'
    };
    return services[id as number] || 'Serviço';
  }

  ionViewDidEnter() {
    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map = undefined;
    }

    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = '';
    }

    setTimeout(() => this.initMap(), 50);
  }

  private initMap(): void {
    this.isLoading = true;

    this.map = L.map('map', {
      minZoom: 2,
      maxZoom: 19,
      preferCanvas: true
    }).setView([0, 0], 2);

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      minZoom: 2,
      maxZoom: 19,
      crossOrigin: true
    }).addTo(this.map);

    tileLayer.on('load', () => {
      this.isLoading = false;
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.map?.setView([latitude, longitude], 13);
          if (!this.marker) this.addMarker(latitude, longitude);
        },
        (error) => {
          console.error('Erro na geolocalização:', error);
          this.isLoading = false;
        }
      );
    }

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.addMarker(lat, lng);
    });
  }

  private addMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.map?.removeLayer(this.marker);
    }
    this.marker = L.marker([lat, lng]).addTo(this.map!);
    this.map?.setView([lat, lng], 13);
  }

  public marcarLocalizacaoAtual(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.addMarker(latitude, longitude);
        },
        (error) => {
          console.error('Erro ao marcar localização atual:', error);
        }
      );
    }
  }

  public searchLocation(): void {
    if (this.searchQuery.trim()) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`;
      this.http.get<any[]>(url).subscribe(
        (data) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            this.map?.setView([parseFloat(lat), parseFloat(lon)], 13);
            this.addMarker(parseFloat(lat), parseFloat(lon));
          } else {
            console.log('Local não encontrado');
          }
        },
        (error) => {
          console.error('Erro na pesquisa:', error);
        }
      );
    }
  }

  public async continuar(): Promise<void> {
    if (!this.marker || !this.map) {
      await this.showAlert('Atenção', 'Por favor, selecione uma localização primeiro');
      return;
    }

    const location = this.marker.getLatLng();
    const confirm = await this.showConfirmAlert(
      'Confirmação',
      `Você está solicitando: ${this.serviceName}\n\nTem certeza que deseja continuar com este serviço na localização selecionada?`
    );

    if (confirm) {
      console.log('Localização selecionada:', location);
      
      this.navCtrl.navigateForward('/assistance-type', {
        state: { 
          serviceId: this.serviceId,
          serviceName: this.serviceName,
          location: {
            lat: location.lat,
            lng: location.lng,
            address: this.searchQuery
          }
        }
      });
    }
  }

  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showConfirmAlert(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Confirmar',
            cssClass: 'confirm-button',
            handler: () => resolve(true)
          }
        ]
      });
      await alert.present();
    });
  }
}