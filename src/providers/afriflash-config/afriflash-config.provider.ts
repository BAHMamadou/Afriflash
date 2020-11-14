import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AfriflashSessionProvider } from '../afriflash-session/afriflash-session.provider';

@Injectable()
export class AfriflashConfigProvider {

    /**
     * Plateforme sur laquelle l'application est utilisé
     */
    private platform: string;

    /**
     * Url courrant
     */
    private currentUrl: string;

    /**
     * Verifie si l'utilisateur est connecté
     */
    private isAuth: boolean;

    public constructor(private router: Router, private session: AfriflashSessionProvider) {
        this.currentUrl = this.router.url;
    }

    /**
     * Verifie si la plateforme est de type web ou non
     */
    public isWeb() {
        if (this.platform === 'desktop' || this.platform === 'tablet' || this.platform === 'ipad') {
            return true;
        } else {
            return false;
        }
    }


    // GETTERS ET SETTERS


    /**
     * Renseigne la platform
     * @param platform plateforme
     */
    public setPlatform(platform: string) {
        this.platform = platform;
    }

    /**
     * Retourne la plateforme
     */
    public getPlatform() {
        return this.platform;
    }

    public getCurrentUrl() {
        return this.currentUrl;
    }

    /**
     * test if il est authentitifié
     */
    public getAuthent() {
        return this.session.getItem('socialusers').then(
            (user) => {
                if (user) {
                    this.isAuth = true;
                    return this.isAuth;
                } else {
                    return false;
                }
        });
    }

}
