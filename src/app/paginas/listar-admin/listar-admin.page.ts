import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-admin.page.html',
  styleUrls: ['./listar-admin.page.scss'],
})
export class ListarAdminPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  constructor(
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.obtenerAutos();
    this.apiService.listaAutos$.subscribe(valor => {
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }

  ionViewWillEnter(): void {
    this.apiService.obtenerAutos();
  }

  public cargarMasAutos(){
    this.apiService.obtenerMasAutos();
  }
}
