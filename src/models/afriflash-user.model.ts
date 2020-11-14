/**
 * Le modèle de données User
 */
export class AfriflashUserModel {
    /**
     * id de l'utilisateur
     */
    public objectId: string;

    /**
     * nom de l'utilisateur
     */
    public firstName: string;

    /**
     * Prenom de l'utilisateur
     */
    public lastName: string;

    /**
     * date de naissance
     */
    public dateOfBirth: Date;

    /**
     * lieu de naissance
     */
    public cityOfBirth: string;

    /**
     * Pays de naissance
     */
    public countryOfBirth: string;

    /**
     * Telephone portalble de l'utilisateur
     */
    public phoneNumber: string;

    /**
     * Telephone fixe
     */
    public phoneFixedNumber: string;

    /**
     * adress de l'utilisateur
     */
    public adress: string;

    /**
     * codePostal l'utilisateur
     */
    public zipCode: string;

    /**
     * ville de l'adress l'utilisateur
     */
    public cityOfAdress: string;

    /**
     * fonction de l'utilisateur
     */
    public userJob: string;

    /**
     * pseudo de l'utilisateur
     */
    public pseudo: string;

    /**
     * Adresse mail de l'utilisateur
     */
    public email: string;

    /**
     * Mot de passe de l'utilisateur
     */
    public password: string;

    /**
     * date de creation du compte de l'utilisateur
     */
    public dateOfCreation: Date;

    /***
     * date de modification de compte de l'utilisateur
     */
    public dateOfUpdate: Date;

    /**
     * date de suppression de compte de l'utilisateur
     */
    public dateOfDeleted: Date;

    /**
     * genre de l'utilisateur (masculin ou fiminin)
     */
    public genderOfUser: string;

    /**
     * civilite de l'utilisateur (celibateur, marié, veuf, veuf ...)
     */
    public civilitOfUsers: string;
    /**
     * compte bancaire de l'utilisateur
     */
    public banqueCode: string;

    /**
     * Type d'utilisateur
     */
    public typeOfUser: string;

    /**
     * Si l'utilisateur est abonnée ou non
     */
    public isSubscribe: string;

}
