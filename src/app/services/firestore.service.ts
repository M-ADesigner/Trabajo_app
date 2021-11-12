/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  //Creacion de documentos CRUDS
  constructor(public dataBase: AngularFirestore) {}


  // Funcion de crear
  //data recibe cualquier tipo de dato dandole el any
  //path string la ruta para saber donde guardar la informacion
  //id para ahcer referencia a los documentos
  createDoc(data: any, path: string, id: string){
    //Apuntamos a una collecion con el path
    const collection = this.dataBase.collection(path);
    /*funcion doc siginifica si hay un documento con este id entregado o si no hay
    un documento con este id entregado se creara y se entregara a una coleccion o crear con set mandandolo a data]*/
    return collection.doc(id).set(data);
  }

  //Funcion para obetener el doccumento que esta en la abse de datos (leer solo un documento)
  //Se le entrega los parametros que nesesitamos el path y id
  getDoc<tipo>( path: string, id: string){
    const collection = this.dataBase.collection<tipo>(path);
    //ValueChanger nos permite estar atento en los cambio de la base de datos
    return collection.doc(id).valueChanges();

  }

  //Funcion eliminar documento
  deleteDoc(path: string, id: string){
    const colllection = this.dataBase.collection(path);
    return colllection.doc(id).delete();

  }


  //Funcicon actualizar documento
  /*La direfrencia que tiene con el createdioc es que aqui se enfoca si se quiere actualizar un campo actualizara un campo en especifico
  sin eliminar o actualizar completamente el campo como create*/
  updateDoc(data: any , path: string, id: string){
    const collecion = this.dataBase.collection(path);
    return collecion.doc(id).update(data);
  }


//Funcion para obetener un Id mas robusto
  getId(){
    return this.dataBase.createId();
  }


//Funcion para obetner toda lña collecion de documento
// valueChanges Nos permite ver todos los cambios que se hacen en la bbdd
  getCollection<tipo>(path: string){
    const collection = this.dataBase.collection<tipo>(path);
    return collection.valueChanges();
  }

}
