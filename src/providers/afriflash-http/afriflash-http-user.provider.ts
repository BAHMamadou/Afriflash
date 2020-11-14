import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AfriflashHttpProvider } from './afriflash-http.provider';
import { AfriflashUserModel } from 'src/models/afriflash-user.model';
import { Socialusers } from 'src/models/afriflash-social-users.model';

@Injectable()
export class AfriflashHttpUserProvider extends AfriflashHttpProvider{

    /**
     * Récupère un utilisateur par son identifiant
     * @param url url
     * @param options options
     */
    public getUserById(url: string, options?: {}): Observable<AfriflashUserModel[]> {
        return this.get(url, options);
    }

    /**
     * Récupère un utilisateur par son mail
     * @param url url
     * @param options options
     */
    public getUserByLogin(url: string, body: {}, options?: {}): Observable<{
        socialUser: Socialusers,
        user: any
    }> {
        return this.post(url, body);
    }

    /**
     * Récupère tous les utilisateurs
     * @param url url
     * @param options options
     */
    public getAll(url: string, options?: {}): Observable<AfriflashUserModel[]> {
        return this.get(url, options);
    }

    /**
     * Enrégistre un user donnée
     * @param url url
     * @param body corp de la requête
     * @param options options
     */
    public save(url: string, body: {}, options?: {}): Observable<AfriflashUserModel[]> {
        return this.post(url, body, options);
    }

    /**
     * Récupération de l'objet User
     * @param url url
     * @param logId id
     */
    public loged(url: string, logId: string): Observable<AfriflashUserModel> {
        return this.get(url + logId);
    }

    /**
     * Met a jour les informations
     * @param url url
     * @param body corps de la requête
     * @param options options
     */
    public updateInfos(url: string, body: {}, options?: {}): Observable<any> {
        return this.post(url, body, options);
    }

    /**
     * Met a jour le mot de passe
     * @param url url
     * @param body corps de la requête
     * @param options options
     */
    public updatePassword(url: string, body: {}, options?: {}): Observable<any> {
        return this.post(url, body, options);
    }

    /**
     * Renvoie la liste d'adresse d'un user (adress)
     * Renvoie la liste d'adresses qui n'ont pas d'abonnement d'un user (free-adress)
     * Renvoie la liste d'adresses qui ont un abonnement d'un user (subscribe-adress)
     * @param url url
     * @param body corps de la requête
     * @param options options
     */
    public getAdress(url: string, body: {}, options?: {}): Observable<{
        adresseId: string,
        idHome: string,
        country: string,
        region: string,
        commune: string,
        district: string,
        sector: string,
        home: string,
        state?: string
    }[]> {
        return this.post(url, body, options);
    }

    /**
     * Return un client
     * @param url url
     * @param body corp de la requête
     * @param options options
     */
    public getClient(url: string, body: {}, options?: {}): Observable<AfriflashUserModel> {
        return this.post(url, body, options);
    }


    /**
     * Retourn la liste de client inscrit pâr un utilisateur
     * @param url url
     * @param body corp de la requête
     * @param options options
     */
    public getClientByUserAuthor(url: string, body: {}, options?: {}): Observable<AfriflashUserModel[]> {
        return this.post(url, body, options);
    }

    /**
     * Enregistre un social user
     * @param url 
     * @param body 
     * @param options 
     */
    public savesResponse(url: string, body: {}, options?: {}): Observable<Socialusers[]> {
        return this.post(url, body);
    }
}
