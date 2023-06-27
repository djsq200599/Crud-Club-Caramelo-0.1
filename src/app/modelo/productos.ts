export interface Producto {
  nombre:	string;
  detalle:	string;
  foto:	string;
  precio:	number;
  stock:	number;
  id:	number;
}

export interface ProductoID extends Omit<Producto, "id"> {
  id?: number;
}

export interface ProductoPartial extends Partial<Producto>{

}
