export interface Automovil {
  nombre: string;
  marca: string;
  color: string;
  year: number;
  motorCilindros: "3" | "4" | "6" | "7" | "8" | "10" | "12" | "16";
  traccion: "2X4" | "4X4" ;
  combustible: "gasolina" | "diesel" | "petroleo" | "gas" | "electricidad" ;
  llantas: "aluminio" | "magnesio" | "aleacion" | "acero" ;
  precio: number;
  foto: string;
  cantidad: number;
}

export interface AutomovilID extends Automovil {
  id?: number;
}

export interface AutomovilPartial extends Partial<Automovil>{

}
