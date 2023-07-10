import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { Automovil, AutomovilID } from 'src/app/modelo/automovil';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Producto, ProductoID } from 'src/app/modelo/productos';
import { Musica, MusicaID } from 'src/app/modelo/musica';
import { Capacidad, CapacidadID } from 'src/app/modelo/capacidad';
import { Calificaciones, CalificacionesID, CalificacionesLocalID } from 'src/app/modelo/calificaciones';


@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.page.html',
  styleUrls: ['./automoviles.page.scss'],
})
export class AutomovilesPage implements OnInit {
  public idParametro: string = '';
  public autoActivo!: AutomovilID;
  public scroll: IonInfiniteScroll;
  public productos: Array<ProductoID> = [];
  public musica: Array<MusicaID> = [];
  public capacidad: Array<CapacidadID> = [];
  public caplocal: CapacidadID | undefined;
  public calificacionesPromedio: { [key: number]: number } = {};
  public Calificaciones: Array<CalificacionesLocalID> = [];
  public estrellasSeleccionadas: number = 0;
  public comentario: string = '';
  public rating: number = 0;
  constructor(
    private estaRuta: ActivatedRoute,
    private apiCarrito: CarritoService,
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.estaRuta.params.subscribe(parametros => {
      this.idParametro = parametros.idAuto;
      this.apiService.buscarPorID(+this.idParametro)
      .subscribe(auto => {
        this.autoActivo! = auto;
      })
    })
    this.apiService.listaCapacidad$.subscribe(datoCapacidad => {
      this.capacidad = datoCapacidad;
      if (this.scroll) {
        this.scroll.complete();
      }
      if (datoCapacidad.length >= parseInt(this.idParametro)) {
        this.caplocal = datoCapacidad[parseInt(this.idParametro)];
      }
    });
    this.apiService.obtenerCapacidad();
    this.get_start();

  }
  ionViewWillEnter() {
    this.apiService.listaProducto$.subscribe(datoProductos => {
      this.productos = datoProductos;
      if (this.scroll) {
        this.scroll.complete();
      }
    });
    this.apiService.obtenerProductos();

    this.apiService.listaMusica$.subscribe(datoMusica => {
      this.musica = datoMusica;
      if (this.scroll) {
        this.scroll.complete();
      }
    });
    this.apiService.obtenerMusica();

  
  }

  async get_start(){
    this.Calificaciones = await this.apiService.obtenerCalificacionesLocalID(parseInt(this.idParametro)).toPromise();
    this.Calificaciones.sort((a, b) => b.id - a.id);
  }
  
  enviarComentario() {
    const calificacion: Calificaciones = {
      id: 0, // El ID se generará automáticamente en el servidor
      stars: this.rating,
      comentario: this.comentario,
      id_calificacion: parseInt(this.idParametro), // ID del local
    };

    this.apiService.agregarCalificacion(calificacion).subscribe((resultado) => {
      // Actualizar la lista de calificaciones con la nueva calificación agregada
      this.get_start();
      // Limpiar el campo de comentario y las estrellas seleccionadas
      this.comentario = '';
      this.rating = 0;
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
      if (starElement) {
        if (i <= value) {
          starElement.classList.add('filled');
        } else {
          starElement.classList.remove('filled');
        }
      }
    }
  }
  
  resetStars() {
    for (let i = 1; i <= 5; i++) {
      const starElement = document.getElementById(`star-${i}`);
      if (starElement) {
        starElement.classList.remove('filled');
      }
    }
  }

  addCart(auto){
    this.apiCarrito.añadirAutosCarrito(auto);
    alert('Producto agregado al carrito');
    this.router.navigate(['/listar']);
  }
}
