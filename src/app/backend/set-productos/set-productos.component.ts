/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {


  productos: Producto[] = [];

  newProducto: Producto;

  enableNewProducto = false;

  loading: any;

  private path = 'Productos/';

  newImage = '';

  newFile = '';


  constructor(public menu: MenuController,
              public crudService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }

  ngOnInit() {
    this.getProducto();
  }


  abrirMenu(){
    console.log('Abrir menu');
    this.menu.toggle('principal');
  }

  async guardarProducto(){
    this.presentLoading();

   const path = 'Productos';
   const name = this.newProducto.nombre;
   const res = await this.firestorageService.uploadImg(this.newFile, path, name);
   this.newProducto.foto = res;


    this.crudService.createDoc(this.newProducto, this.path, this.newProducto.id ).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error =>{
      this.presentToast('Ocurrio un problema');
    });
  }

  //Funcion de leer todos los productos que tenemos en la abse de datos
  //Nos devuelve un observable osea observamos todos lo que sucede
  getProducto(){
    this.crudService.getCollection<Producto>(this.path).subscribe( res => {
      this.productos = res;
    });
  }


  async deleteProducto(producto: Producto){
      const alert = await this.alertController.create({
        cssClass: 'normal', /*Tipo de letra*/
        header: 'Advertencia!', /*Cabezera*/
        message: 'Seguro desea <strong>eliminar</strong> este producto?',
        buttons: [
          {
            text: 'Cancelar',/*texto del boton*/
            role: 'cancel', /*Rol de cancelar por defecto*/
            cssClass: 'normal'
          }, {
            text: 'Si',
            handler: () => {
              console.log('eliminado...');
              this.crudService.deleteDoc(this.path, producto.id).then(res => {
                this.presentToast('Eliminado con exito');
                this.alertController.dismiss();
              }).catch(error =>{
                this.presentToast('No se pudo eliminar');
              });
            }
          }
        ]
      });

      await alert.present();
  }

  newItem(){
    this.enableNewProducto = true;
    this.newProducto  = {
      nombre: '',
      precioNormal: null,
      precioReducido: null,
      foto: '',
      id: this.crudService.getId(),
      fecha: new Date()
    };
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();

  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass: 'normal',
      message: msg,
      duration: 2000,
      color: 'light'
    });
    toast.present();
  }

   async newImageUpload(event: any){
   if (event.target.files && event.target.files[0]){
     this.newFile = event.target.files[0];
     const reader = new FileReader();
    reader.onload = ((image) =>{
       this.newProducto.foto = image.target.result as string;

     });
     reader.readAsDataURL(event.target.files[0]);
    }
  }
}
