import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GmapsService } from './../../services/gmaps.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, OnDestroy {

  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  center = { lat: -33.45694, lng: -70.64827 };
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private launchNavigator: LaunchNavigator
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 12,
      });
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker(location);
    } catch (e) {
      console.log(e);
    }
  }

  addMarker(location: any) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icon/location-pin.png',
      scaledSize: new googleMaps.Size(50, 50),
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      animation: googleMaps.Animation.DROP
    });
    this.markers.push(marker);

    const geocoder = new googleMaps.Geocoder();
    geocoder.geocode({ location: location }, (results: any, status: any) => {
      if (status === googleMaps.GeocoderStatus.OK && results[0]) {
        const address = results[0].formatted_address;
        marker.addListener('click', () => {
          console.log('Click en el marcador', marker);
          console.log('Dirección:', address);

          // Redirigir a la aplicación de mapas con la ubicación seleccionada
          const options: LaunchNavigatorOptions = {
            start: '',  // Dirección actual del usuario
            destinationName: address  // Dirección del marcador
          };

          this.launchNavigator.navigate(address, options)
            .then(() => console.log('Aplicación de mapas lanzada'))
            .catch((error) => console.error('Error al lanzar la aplicación de mapas: ', error));
        });
      }
    });
  }

  checkAndRemoveMarker(marker) {
    const index = this.markers.findIndex(x => x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng());
    console.log('is marker already: ', index);
    if (index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Added Marker',
      subHeader: '',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Save',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  ngOnDestroy() {
    // this.googleMaps.event.removeAllListeners();
    if (this.mapClickListener) this.googleMaps.event.removeListener(this.mapClickListener);
    if (this.markerClickListener) this.googleMaps.event.removeListener(this.markerClickListener);
  }

}