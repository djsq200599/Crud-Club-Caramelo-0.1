import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { Automovil, AutomovilID } from 'src/app/modelo/automovil';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.page.html',
  styleUrls: ['./automoviles.page.scss'],
})
export class AutomovilesPage implements OnInit {
  public idParametro: string = '';
  public autoActivo!: AutomovilID;
  public scroll: IonInfiniteScroll;
  constructor(
    private estaRuta: ActivatedRoute,
    private apiCarrito: CarritoService,
    private router: Router,
    private apiAuto: ApiService,
  ) {}

  ngOnInit() {
    this.estaRuta.params.subscribe(parametros => {
      this.idParametro = parametros.idAuto;
      this.apiAuto.buscarPorID(+this.idParametro)
      .subscribe(auto => {
        this.autoActivo! = auto;
      })
    })
  }

  addCart(auto){
    this.apiCarrito.añadirAutosCarrito(auto);
    alert('Producto agregado al carrito');
    this.router.navigate(['/listar']);
  }
}
