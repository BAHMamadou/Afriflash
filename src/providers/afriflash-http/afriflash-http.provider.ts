import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AfriflashHttpProvider {

    // TMP: a changer
    protected URL_BASE = 'http://217.160.65.18:3000/';

    constructor(protected http: HttpClient) {}

    /**
     * Permet de récuperer une ressource
     * @param url url
     * @param options options (facultatif)
     */
    protected get(url: string, options?: {}): Observable<any> {
        const path = this.URL_BASE + url;
        if (options) {
            return this.http.get<any>(path, options);
        }
        return this.http.get<any>(path);
    }

    /**
     * Permet d'enregister une ressouce
     * @param url url
     * @param body corps de la méthode
     * @param options options (facultatif)
     */
    protected post(url: string, body: {}, options?: {}): Observable<any> {
        const path = this.URL_BASE + url;
        if (options) {
            return this.http.post<any>(path, body, options);
        }
        return this.http.post<any>(path, body);
    }

    /**
     * Mettre à jour des ressources
     * @param url url
     * @param body corps de la requête
     * @param options options (facultatif)
     */
    protected update(url: string, body: {}, options?: {}): Observable<any> {
        const path = this.URL_BASE + url;
        if (options) {
            return this.http.put<any>(path, body, options);
        }
        return this.http.put<any>(path, body);
    }

    /**
     * Supprime une ressource
     * @param url url
     * @param options options (facultatif) 
     */
    protected delete(url: string, options?: {}): Observable<any> {
        const path = this.URL_BASE + url;
        if (options) {
            return this.http.delete<any>(path, options);
        }
        return this.http.delete<any>(path);
    }
}
