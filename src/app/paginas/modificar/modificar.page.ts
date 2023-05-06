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
  public motorCilindros = [ "3", "4", "6" , "7" , "8" , "10" , "12" , "16" ]
  public traccion = [ "2X4" , "4X4" ]
  public combustible = [ "gasolina" , "diesel" , "petroleo" , "gas" , "electricidad" ]
  public llantas = [ "aluminio" , "magnesio" , "aleacion" , "acero" ]

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
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      marca: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      color: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      year: [1950, [Validators.required, Validators.min(1950), Validators.max(2023)]],
      motorCilindros: ['3', Validators.required],
      traccion: ['2X4', Validators.required],
      combustible: ['gasolina', Validators.required],
      llantas: ['aluminio', Validators.required],
      foto: ['', Validators.required],
      precio: [1, [Validators.required, Validators.min(1000), Validators.max(30000000)]]
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
          this.formulario.get('marca').setValue(elemento.marca);
          this.formulario.get('color').setValue(elemento.color);
          this.formulario.get('year').setValue(elemento.year);
          this.formulario.get('motorCilindro').setValue(elemento.motorCilindros);
          this.formulario.get('traccion').setValue(elemento.traccion);
          this.formulario.get('combustible').setValue(elemento.combustible);
          this.formulario.get('llantas').setValue(elemento.llantas);
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
