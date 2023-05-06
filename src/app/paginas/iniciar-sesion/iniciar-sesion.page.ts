import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})

export class IniciarSesionPage implements OnInit {
  FormularioL!: FormGroup;
  error: string;
  constructor(
    private fb: FormBuilder,
    private cliente: HttpClient,
    private router: Router,
    private userService: UsuarioService,
    private navControl: NavController
    ) {this.construirFormulario()}

  public construirFormulario(): void {
    this.FormularioL = this.fb.group({
    correo:['',[Validators.required]],
    contraseña: ['',[Validators.required]],
    })
  }

  iniciarSesion() {
    this.cliente.get<any>(this.userService.URL_API).subscribe(res => {
      const user = res.find((dato: any) => {
        return dato.correo === this.FormularioL.value.correo && dato.contraseña ===
          this.FormularioL.value.contraseña
      })
      if (user.tipoUsuario == 'admin') {
        alert("Usurio Admin reconocido");
        this.FormularioL.reset();
        this.router.navigate(['listar-admin'])
      } if (user.tipoUsuario == 'normal'){
        alert("Usuario Cliente Logeado")
        this.FormularioL.reset();
        this.navControl.navigateRoot('listar')
      }else{error=> {
        alert("Error al iniciar sesión!")
      }

      }
    }
    )
  }

  public obtenerCampo(control: string) {
    return this.FormularioL.get(control);
  }
  public fueTocado(control: string) {
    return this.FormularioL.get(control).touched;
  }
  public estaSucio(control: string) {
    return this.FormularioL.get(control).dirty;
  }

  ngOnInit() {}

}
