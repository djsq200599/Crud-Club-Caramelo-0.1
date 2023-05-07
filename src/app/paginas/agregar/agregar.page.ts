import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { Automovil } from '../../modelo/automovil';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

 private imagenBase64 = '';
 public cargaArchivo  = false;
  public motorCilindros = [ "3", "4", "6" , "7" , "8" , "10" , "12" , "16" ]
  public traccion = [ "2X4" , "4X4" ]
  public combustible = [ "gasolina" , "diesel" , "petroleo" , "gas" , "electricidad" ]
  public llantas = [ "aluminio" , "magnesio" , "aleacion" , "acero" ]

  public formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiAuto: ApiService,
    private router: Router
  ) {
    this.construirFormulario()
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
  public agregarAuto() {
    if(this.formulario.invalid && this.cargaArchivo){
      this.formulario.markAllAsTouched();
      return;
    }
    this.apiAuto.agregarAuto({
      ...this.formulario.value,
      foto: this.imagenBase64
    })
    .subscribe(resultado => {
      if(resultado){
        alert('Agregado con exito');
        this.router.navigate(['/listar-admin']);
      }
    })

  }
  public cambiarFoto(e: Event){
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
  }

}

