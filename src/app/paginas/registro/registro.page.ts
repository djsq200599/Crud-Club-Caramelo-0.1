
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public formularioR!: FormGroup;
  public cargaArchivo  = false;
  constructor(
    private fb: FormBuilder,
    private userServicio: UsuarioService,
    private router: Router
    ) {this.construirFormulario()}

  public construirFormulario(): void {
    this.formularioR = this.fb.group({
    correo:['',[Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    contraseña: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    tipoUsuario:['normal',]
    })
  }

  public obtenerCampo(control: string) {
    return this.formularioR.get(control);
  }
  public fueTocado(control: string) {
    return this.formularioR.get(control).touched;
  }
  public estaSucio(control: string) {
    return this.formularioR.get(control).dirty;
  }
  public agregarUsuario() {
    if(this.formularioR.invalid && this.cargaArchivo){
      this.formularioR.markAllAsTouched();
      return;
    }
    this.userServicio.agregarUsuario({
      ...this.formularioR.value
    })
    .subscribe(resultado => {
      if(resultado){
        alert('Agregado con exito');
        this.router.navigate(['']);
      }
    })
  }
  ngOnInit() {}
}
