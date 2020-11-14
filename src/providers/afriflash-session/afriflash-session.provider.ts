import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/**
 * Service permettant d'enregister des variables de sessions
 */
@Injectable()
export class AfriflashSessionProvider {

    constructor(private storage: Storage) {}

    /**
     * Crée une variable de session
     * @param key clé
     * @param value valeur
     */
    public setItem(key: string, value: any) {
        return this.storage.set(key, value);
    }

    /**
     * Rétourne la valeur d'une variable de session
     * @param key clé
     */
    public getItem(key: string) {
        return this.storage.get(key);
    }

    /**
     * Retourne le nom du driver utiliser pour stocker les variables
     */
    public getDriver() {
        return this.storage.driver;
    }

    /**
     * Supprime toute la session
     */
    public clear() {
        return this.storage.clear();
    }

    /**
     * Verifie si une session est actif
     */
    public async isExist() {
        const userId = await this.storage.get('userId');
        if (userId) {
            return true;
        }
        return false;
    }

    /**
     * Supprime une variable de session
     * @param key Clé
     */
    public remove(key: string) {
        return this.storage.remove(key);
    }
}
