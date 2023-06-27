export interface Automovil {
  nombre: string;
  ubicacion: string;
  direccion: string;
  tematica: string;
  capacidad: number;
  cantidad: number;
  precio: number;
  latitud: number;
  longitud: number;
  foto: string;
}

export interface AutomovilID extends Automovil {
  id?: number;
  promedioCalificacion?: number;
}

export interface AutomovilPartial extends Partial<Automovil>{

}
