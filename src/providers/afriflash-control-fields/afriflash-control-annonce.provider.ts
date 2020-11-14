import { Injectable } from '@angular/core';

@Injectable()

/**
 * Service controlant les champs concernant les annonces
 */
export class AfriflashControlAnnonceProvider {


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
     * Verifie les choix d'un select
     * @param price prix
     * @param currency devise
     */
    public controlSelectChoice(choice1: number, choice2: string) {
        if ((choice1 && choice2 && choice1 !== 0 && choice2 !== '') ||
            (!choice1 && !choice2) ) {
            return true;
        }
        return false;
    }

    public controlForm(data: {
        annonceUser: string,
        annonceType: string,
        title: string,
        category: string,
        subCategory: string,
        description: string,
        price?: number,
        currency?: string,
        photos?: Array<string>,
        statusProduct?: string,
        dateProduct?: string,

        nameProduct?: string,
        featureMeasure?: string,
        featureSize?: number,
        nbElement?: string,

        countryName: string,
        city: string,
        details?: string,

        companyName?: string,
        telephone: number,
        indicatif: string,
        mail?: string,
    }) {
            const error = {
                message: '',
                fieldId: ''
            };

            if (data) {

                if (data.annonceType && data.annonceType.trim() !== '') {

                    if (data.title && data.title.trim() !== '') {

                        if (data.category && data.category.trim() !== '' && data.category !== 'category') {

                            if (data.subCategory && data.subCategory.trim() !== '' && data.subCategory !== 'subCategory') {

                                if (data.description && data.description.trim() !== '') {

                                    if (data.countryName && data.countryName.trim() !== '') {

                                        if (data.city && data.city.trim() !== '') {

                                            if (data.telephone && data.indicatif && data.telephone !== 0
                                                && data.indicatif.trim() !== '' ) {

                                                    return error;

                                                } else {

                                                    error.message = 'Veuillez renseigner le champ Numéro de téléphone';
                                                    error.fieldId = 'phone';
                                                    return error;
                                                }

                                        } else {

                                            error.message = 'Veuillez renseigner le champ Ville';
                                            error.fieldId = 'city';
                                            return error;
                                        }

                                    } else {

                                        error.message = 'Veuillez renseigner le champ Pays';
                                        error.fieldId = 'country';
                                        return error;
                                    }

                                } else {

                                    error.message = 'Veuillez renseigner le champ Description';
                                    error.fieldId = 'description-ad';
                                    return error;
                                }

                            } else {

                                error.message = 'Veuillez renseigner le champ Sous-catégorie de l\'annonce';
                                error.fieldId = 'subCategory';
                                return error;
                            }

                        } else {
                            error.message = 'Veuillez renseigner le champ Catégorie de l\'annonce';
                            error.fieldId = 'category';
                            return error;
                        }

                    } else {

                        error.message = 'Veuillez renseigner le champ Titre de l\'annonce';
                        error.fieldId = 'annonce-title';
                        return error;
                    }

                } else {
                    error.message = 'Veuillez renseigner le champ Type d\'annonce';
                    error.fieldId = 'annonce-type';
                    return error;
                }
            }
      }
}
