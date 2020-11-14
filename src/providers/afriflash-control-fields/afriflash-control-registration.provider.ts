import { Injectable } from '@angular/core';

@Injectable()

/**
 * Contrôle la partie inscription
 */
export class AfriflashControlRegistrationProvider {

    /**
     * Mot de passe - utilisé pour verifier le champ confirmer mot de passe
     */
    private password;

    /**
     * Verifie si il existe au moins un champ vide
     * @param fields Champ à tester
     * @param acount type de compte à créer
     */
    public emptyFieldExist(fields: {
        lastName?: string,
        firstName?: string,
        email?: string,
        phone?: string,
        gender?: string,
        password?: string,
        confirmPassword?: string
    }) {

            if (fields.phone.trim() === '' || fields.password === '' ||
                fields.confirmPassword === '' || fields.lastName === '' ||
                fields.firstName === '' || fields.gender === '') {

                return true;
            }
            return false;
    }

    /**
     * Verifie si le phone est unique
     * @param pseudo pseudo de l'utilisateur
     */
    public phoneIsUnique(phone: string) {
        // TODO: @thierno Une requête pour verifier si le phone est unique
        return true;
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
     * Verifie l'email
     * @param email email de l'utilisateur
     */
    public controlEmail(email: string) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email.trim());
    }

    /**
     * Verifie le mot de passe
     * @param password mot de passe de l'utilisateur
     */
    public controlPassword(password: string) {
        if (password.length >= 6) {
            this.password = password;
            return true;
        }
        return false;
    }

    /**
     * Retourne le mot de passe
     */
    public getPassword() {
        return this.password;
    }

    /**
     * Verifie la confirmation du mot de passe
     * @param confirmPassword confirmation mot de passe
     */
    public controlConfirmPassword(confirmPassword: string) {
        if (confirmPassword === this.password) {
            return true;
        }
        return false;
    }


    /**
     * Verifier la validité des champs lors de l'enregistrement
     * @param fields Champs principaux
     */
    public registration(fields: {
        lastName?: string,
        firstName?: string,
        email?: string,
        phone?: string,
        gender?: string,
        password?: string,
        confirmPassword?: string
    }) {
        const resultat = {
            hideSpinner: false,
            message: ''
        };

        // Test si aucun champ n'est vide
        if (!this.emptyFieldExist(fields)) {

            // Test si le phone est unique
            if (this.phoneIsUnique(fields.phone)) {

                // Test si le mot de passe est valide
                if (this.controlPassword(fields.password)) {

                    // Test si la confirmation du mot de passe est valide
                    if (this.controlConfirmPassword(fields.confirmPassword)) {
                        // Test si l'adresse mail est valide
                        if (fields.email) {

                            if (this.controlEmail(fields.email)) {
                                resultat.hideSpinner = false;
                                resultat.message = null;
                            } else {
                                resultat.hideSpinner = true;
                                resultat.message = 'INFO_BULLE.REGISTRATION.ERROR.EMAIL';
                            }

                        } else {
                            resultat.hideSpinner = false;
                            resultat.message = null;
                        }

                    } else {
                        resultat.hideSpinner = true;
                        resultat.message = 'INFO_BULLE.REGISTRATION.ERROR.CONFIRM_PASSWORD';
                    }

                } else {
                    resultat.hideSpinner = true;
                    resultat.message = 'INFO_BULLE.REGISTRATION.ERROR.PASSWORD';
                }

            } else {
                resultat.hideSpinner = true;
                resultat.message = 'INFO_BULLE.REGISTRATION.ERROR.PSEUDO';
            }

        } else {
            resultat.hideSpinner = true;
            resultat.message = 'INFO_BULLE.EMPTY_FIELD';
        }

        return resultat;
    }

}
