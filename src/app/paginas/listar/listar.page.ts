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

  ShareApp(){
    Share.share({
      title: 'Mira este increible auto',
      text: 'Mira gratis tu proximo automovil aquí',
      url: 'http://ionicframework.com/',
    });
  }
}
