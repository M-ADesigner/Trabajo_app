import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FireBaseAuthService } from 'src/app/services/fire-base-auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  cliente: Cliente ={
    uId: '',
    email: '',
    nombre: '',
    celular: '' ,
    foto: '',
    referencia: '',
    ubicacion: null,
  };

  newFile: any;

  loading: any;

  uId = '';

  constructor(public menu: MenuController,
              public fireBaseAuthService: FireBaseAuthService,
              public firestoreService: FirestoreService,
              public firestorageService: FirestorageService,
              public loadingController: LoadingController,
              public toastController: ToastController) {
              }


  async ngOnInit() {
   const uid = await this.fireBaseAuthService.gerUid();
   console.log(uid);

  }


  abrirmenu(){
    this.menu.toggle();
  }

  async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
     reader.onload = ((image) =>{
        this.cliente.foto = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
     }
   }

   async registerUser(){
     const credenciales ={
       email: this.cliente.email,
       password: this.cliente.celular,
     };
     const res = await this.fireBaseAuthService.registrar(credenciales.email, credenciales.password).catch(error =>{
       console.log('Error! -->', error);
     });
     const uid = await this.fireBaseAuthService.gerUid();
     this.cliente.uId = uid;
     this.guardarUser();
     console.log(uid);
    }

   salir(){
     this.fireBaseAuthService.logout();

   }
   async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();
  }
   async guardarUser(){
      this.presentLoading();
   const path = 'Clientes';
   const name = this.cliente.nombre;
   if(this.newFile !== undefined){
    const res = await this.firestorageService.uploadImg(this.newFile, path, name);
    this.cliente.foto = res;
   }
    this.firestoreService.createDoc(this.cliente, path, this.cliente.uId ).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error =>{
      this.presentToast('Ocurrio un problema');
    });
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
}
