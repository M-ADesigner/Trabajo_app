export interface Producto{
  nombre: string;
  precioNormal: number;
  precioReducido: number;
  foto: string;
  id: string;
  fecha: Date;
}


export interface Cliente{
  uId: string;
  email: string;
  celular: string;
  foto: string;
  referencia: string;
  nombre: string;
  ubicacion: any;

}
