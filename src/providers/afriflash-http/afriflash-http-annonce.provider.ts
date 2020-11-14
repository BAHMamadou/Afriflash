import { AfriflashHttpProvider } from './afriflash-http.provider';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AfriflashHttpAnnonceProvider extends AfriflashHttpProvider {


    /**
     * Récupère toutes les annonces
     * @param url url
     * @param options options
     */
    public getAll(url: string, options?: {}): Observable<any[]> {
        return this.get(url, options);
    }

    /**
     * Récupère l'annonce en fonction de son id
     * @param url url
     * @param options options
     */
    public getById(url: string, options?: {}): Observable<any> {
        return this.get(url, options);
    }

    /**
     * Récupère toutes les annonces
     * @param url url
     * @param options options
     */
    public getAllWithFilters(url: string, body: {}, options?: {}): Observable<any[]> {
        return this.post(url, body);
    }

    /**
     * Enregistre une annonce
     * @param url url
     * @param body corps de la méthode
     * @param options options
     */
    public save(url: string, body: {}, options?: {}): Observable<any[]> {
        return this.post(url, body);
    }

    /**
     * Supprime une annonce
     * @param url url
     * @param body corps de la requête
     * @param options options
     */
    public deleteAnnonce(url: string,  body: {}, options?: {}): Observable<any> {
        return this.post(url, body, options);
    }

}
