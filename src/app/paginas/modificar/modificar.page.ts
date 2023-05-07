import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomovilPartial } from 'src/app/modelo/automovil';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  public idActiva = '';
  public AutoActivo!: AutomovilPartial;
  public formulario: FormGroup;
  private imagenBase64 = '';
  public cargaArchivo = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private ApiAuto: ApiService,
    private fb: FormBuilder
  ) {
    this.construirFormulario();
  }
  public construirFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['Club Caramelo', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      ubicacion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      tematica: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      capacidad: [0, [Validators.required, Validators.min(1), Validators.max(30000000)]],
      cantidad: [0, [Validators.required, Validators.min(1), Validators.max(30000000)]],
      precio: [0, [Validators.required, Validators.min(1), Validators.max(30000000)]],
      foto: ['', Validators.required]
    });
  }
  public obtenerCampo(control: string) {
    return this.formulario.get(control);
  }
  public fueTocado(control: string) {
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string) {
    return this.formulario.get(control).dirty;
  }
  public cambiarFoto(e: Event) {
    this.cargaArchivo = true;
    const elemento = (e.target as HTMLInputElement);
    const archivo = elemento.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    reader.onprogress = () => {

    }
    reader.onload = () => {
      this.cargaArchivo = false;
      console.log('Carga terminada :D');
      this.imagenBase64 = reader.result as string;
    }
    reader.onerror = () => {

    }
  }
  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(pararametros => {
      this.idActiva = pararametros.get('idAuto');
      this.ApiAuto.buscarPorID(+this.idActiva)
        .subscribe(elemento => {
          this.imagenBase64 = elemento.foto;
          this.AutoActivo = elemento;
          this.formulario.get('nombre').setValue(elemento.nombre);
          this.formulario.get('ubiacion').setValue(elemento.ubicacion);
          this.formulario.get('direccion').setValue(elemento.direccion);
          this.formulario.get('tematica').setValue(elemento.tematica);
          this.formulario.get('capacidad').setValue(elemento.capacidad);
          this.formulario.get('cantidad').setValue(elemento.cantidad);
          this.formulario.get('precio').setValue(elemento.precio);
          this.formulario.updateValueAndValidity();
        })
    })
  }

  public modificarAuto(){
    if(this.formulario.invalid && this.cargaArchivo){
      this.formulario.markAllAsTouched();
      return;
    }
    this.ApiAuto.modificarPorID(+this.idActiva,{
      ...this.formulario.value,
      foto: this.imagenBase64
    })
    .subscribe(respuesta => {
      if(respuesta){
        console.log('Elemento Actualizado :D');
        this.router.navigate(['']);
      }
    })
  }
}
