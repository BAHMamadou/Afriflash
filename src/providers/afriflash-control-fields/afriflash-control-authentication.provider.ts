import { Injectable } from '@angular/core';

@Injectable()

/**
 * Service controlant les champs de la page de connexion
 */
export class AfriflashControlAuthenticationProvider {


    constructor() {
    }

    /**
     * Verifie si il existe au moins un champ vide
     * @param email mail
     * @param password mot de passe
     */
    public emptyFieldExist(phone: string, password: string) {
        if (phone && password) {
            if (phone.trim() === '' || password === '') {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * Verifie si le phone est bien conforme
     * @param pseudo pseudo de l'utilisateur
     */
    public phoneIsOk(phone: string) {
        // TODO: @thierno Une requête pour verifier si le phone est unique
        return true;
    }

    /**
     * Verifie le format du mail
     * @param email mail de l'utilisateur
     */
    public controlEmail(email: string) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email.trim());
    }

    /**
     * Controler si c'est un email ou un numéro de téléphone
     * @param log
     */
    public controlLogin(log: string) {
        return true;
    }

    /**
     * Verifie le mot de passe de l'utilisateur
     * @param password mot de passe
     */
    public controlPassword(password: string) {
        if (password.length >= 6) {
            return true;
        }
        return false;
    }

    /**
     * Verifier la validité des champs lors de la connexion
     * @param fields champs principaux
     */
    public authentication(fields: {
        login?: string,
        password?: string
    }) {

        const resultat = {
            hideSpinner: false,
            message: ''
        };

        // Test si aucun champ n'est vide
        if (!this.emptyFieldExist(fields.login, fields.password)) {

            // Test si le phone est conforme
            if (this.phoneIsOk(fields.login)) {

                // Test si le mot de passe est valide
                if (this.controlPassword(fields.password)) {

                            resultat.hideSpinner = false;
                            resultat.message = null;

                } else {
                    resultat.hideSpinner = true;
                    resultat.message = 'INFO_BULLE.AUTHENTICATION.ERROR.PASSWORD';
                }

            } else {
                resultat.hideSpinner = true;
                resultat.message = 'INFO_BULLE.AUTHENTICATION.ERROR.TEL';
            }

        } else {
            resultat.hideSpinner = true;
            resultat.message = 'INFO_BULLE.EMPTY_FIELD';
        }

        return resultat;
    }
}
