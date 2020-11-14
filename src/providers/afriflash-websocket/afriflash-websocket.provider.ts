import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable()
export class AfriflashWebsocketProvider {


   constructor(private socket: Socket) {
        this.socket.connect();
   }

   /**
    * Emet un message
    * @param event événement émis
    * @param eventValue valeur de l'évenement
    * @param callback fonction callback
    */
   // tslint:disable-next-line: ban-types
   public emit(event: string, eventValue?: any, callback?: Function) {
        return this.socket.emit(event, eventValue, callback);
   }

   /**
    * Réçoit un message
    * @param event événement émis
    * @param callback fonction à éxecuter
    */
   public receive(event: string) {
       return this.socket.fromEvent(event);
   }

   /**
    * Déconnecte la communication
    */
   public disconnect() {
    this.socket.disconnect();
  }
}
