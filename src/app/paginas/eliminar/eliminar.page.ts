import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AutomovilID } from 'src/app/modelo/automovil';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
  public idParametro: string = '';
  public autoActivo!: AutomovilID;
  constructor(
    private estaRuta: ActivatedRoute,
    private apiAuto: ApiService,
    private router: Router,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.estaRuta.params.subscribe(parametros => {
      this.idParametro = parametros.idAuto;
      this.apiAuto.buscarPorID(+this.idParametro)
      .subscribe(auto => {
        this.autoActivo! = auto;
      })
    })
  }

  public async borrar(){
    const alerta = await this.alert.create({
      header: 'Confirma por favor',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmo',
          role: 'confirm',
          cssClass: 'danger',
          handler: () => {
            this.apiAuto.borrarPorID(this.autoActivo.id)
            .subscribe(data => {
              if(data){
                this.router.navigate(['/listar-admin'])
              }
            })
          }
        }
      ]
    });
    await alerta.present()
  }


}
