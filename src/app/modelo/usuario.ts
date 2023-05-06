export interface Usuario {
  correo: string;
  contraseña: string;
  tipoUsuario: string;
}

export interface UsuarioID extends Usuario {
  id?: number;
}

export interface UsuarioPartial extends Partial<Usuario>{

}
