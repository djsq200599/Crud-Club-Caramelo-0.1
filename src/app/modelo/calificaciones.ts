export interface Calificaciones {
  id: number;
  stars: number;
  comentario: string;
  id_calificacion: number;
}

export interface CalificacionesID extends Omit<Calificaciones, 'id'> {
  id?: number;
}

export interface CalificacionesPartial extends Partial<Calificaciones> {

}