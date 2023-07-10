export interface Capacidad {
  cantidad: number;
  capacidad: number;
  nombre: string;
}

export interface CapacidadID extends Omit<Capacidad, "nombre"> {
  nombre?: string;
}

export interface CapacidadPartial extends Partial<Capacidad>{

}