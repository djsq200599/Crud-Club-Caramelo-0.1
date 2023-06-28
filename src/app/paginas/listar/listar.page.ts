import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { CarritoService } from 'src/app/services/carrito.service';
import { Automovil, AutomovilID } from 'src/app/modelo/automovil';
import { Calificaciones, CalificacionesID } from 'src/app/modelo/calificaciones';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public autoMovil: Array<AutomovilID> = [];
  calificacionesPromedio: { [id: number]: number } = {};

  constructor(
    public apiService: ApiService,
    public apiCarrito: CarritoService,
    private navController: NavController
  ) { }

  rating: number = 0;

  ngOnInit() {}

  ionViewWillEnter() {
    this.apiService.listaAutos$.subscribe(datoAuto => {
      this.autoMovil = datoAuto;
      if (this.scroll) {
        this.scroll.complete();
      }
      this.loadCalificacionesPromedio();
    });
    this.apiService.obtenerAutos();
  }

  public cargarMasAutos() {
    this.apiService.obtenerMasAutos();
  }

  addCart(automovil) {
    this.apiCarrito.añadirAutosCarrito(automovil);
    alert('Producto agregado al carrito');
    console.log(this.autoMovil);
  }

  ShareApp(nombre, dir) {
    Share.share({
      title: nombre + "\n",
      text: nombre + "\n" + dir + "\n",
      url: 'http://www.clubcaramelo.com/',
    });
  }

  rate(value: number) {
    if (this.rating === value) {
      this.rating = 0;
    } else {
      this.rating = value;
    }
  }

  highlightStar(value: number) {
    for (let i = 1; i <= 5; i++) {
      const starElement = document.getElementById(`star-${i}`);
      if (i <= value) {
        starElement?.classList.add('filled');
      } else {
        starElement?.classList.remove('filled');
      }
    }
  }

  resetStars() {
    for (let i = 1; i <= 5; i++) {
      const starElement = document.getElementById(`star-${i}`);
      starElement?.classList.remove('filled');
    }
  }

  async loadCalificacionesPromedio() {
    for (const automovil of this.autoMovil) {
      await this.get_stars(automovil.id);
    }
  }

  async get_stars(id) {
    let average = 0;
    const calificaciones = await this.apiService.obtenerCalificaciones(id).toPromise();
    if (calificaciones.length > 0) {
      const totalStars = calificaciones.reduce((sum, calificacion) => sum + calificacion.stars, 0);
      average = totalStars / calificaciones.length;
    }
    console.log(average);
    this.calificacionesPromedio[id] = average;
  }
  goToMap(lat: number, lng: number) {
    this.navController.navigateForward(['/mapa', { lat, lng }]);
  }
}
