import { AfriflashHttpProvider } from './afriflash-http.provider';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AfriflashHttpLocationProvider extends AfriflashHttpProvider {


    /**
     * Récupère tous les localisations
     * @param url url
     * @param options options
     */
    public getAll(url: string, options?: {}): Observable<any[]> {
        return this.get(url, options);
    }

}
