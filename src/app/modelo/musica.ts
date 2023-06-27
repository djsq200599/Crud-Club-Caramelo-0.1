export interface Musica {
  nombre:	string;
  detalle:	string;
  foto:	string;
  precio:	number;
  id:	number;
}

export interface MusicaID extends Omit<Musica, "id"> {
  id?: number;
}

export interface MusicaPartial extends Partial<Musica>{

}
