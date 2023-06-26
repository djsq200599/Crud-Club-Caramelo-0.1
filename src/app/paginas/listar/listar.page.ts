import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { CarritoService } from 'src/app/services/carrito.service';
import { Automovil, AutomovilID } from 'src/app/modelo/automovil';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public autoMovil: Array<AutomovilID> = [];
  constructor(
    public apiService: ApiService,
    public apiCarrito: CarritoService
  ) { }

  rating: number = 0;

  ngOnInit() {}

  ionViewWillEnter() {
    this.apiService.obtenerAutos()
    this.apiService.listaAutos$.subscribe(datoAuto =>{
      this.autoMovil = datoAuto;
      if (this.scroll){
        this.scroll.complete();
      }
    })
  }

  
  public cargarMasAutos(){
    this.apiService.obtenerMasAutos();
  }

  addCart(automovil){
    this.apiCarrito.añadirAutosCarrito(automovil);
    alert('Producto agregado al carrito');
    console.log(this.autoMovil)

  }

  
  ShareApp(nombre, dir){
    Share.share({
      title: nombre,
      text: dir,
      url: 'http://www.clubcaramelo.com/',
    });
  }

  rate(value: number) {
    if (this.rating === value) {
      // Si la valoración seleccionada es la misma que la actual,
      // deselecciona la estrella estableciendo el valor de rating a 0
      this.rating = 0;
    } else {
      // Si la valoración seleccionada es diferente, asigna el nuevo valor
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
}

