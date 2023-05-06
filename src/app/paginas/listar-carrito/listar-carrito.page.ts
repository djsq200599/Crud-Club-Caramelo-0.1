import { Component, OnInit , ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-carrito',
  templateUrl: './listar-carrito.page.html',
  styleUrls: ['./listar-carrito.page.scss'],
})
export class ListarCarritoPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  cart: any;
  constructor(
    public carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carritoService.listarAutosCarrito().subscribe(resultado=>{
      this.cart = resultado;
     })
  }

  public eliminarAutos(id: number){
    this.carritoService.eliminarAutosCarrito(id).subscribe();
    alert('Producto eliminado del carrito');
    this.router.navigate(['/listar']);
  }

  public ComprarAutos(id: number){
    this.carritoService.eliminarAutosCarrito(id).subscribe();
    alert('Producto eliminado del carrito');
    this.router.navigate(['/listar']);
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.carritoService.listarAutosCarrito()
      event.target.complete();
    }, 2000);
  };

  public obtenerTotalCarrito(){
    return this.cart.reduce((i,j)=>i+j.precio* j.cantidad,0);
  }
}

