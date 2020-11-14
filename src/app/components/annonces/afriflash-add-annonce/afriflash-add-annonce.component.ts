import {Component, Input, OnInit} from '@angular/core';
import {AfriflashFilesManagerProvider} from 'src/providers/afriflash-files-manager/afriflash-files-manager.provider';
import {AfriflashConfigProvider} from 'src/providers/afriflash-config/afriflash-config.provider';
import {AfriflashDataProvider} from 'src/providers/afriflash-data/afriflash-data.provider';
import {AfriflashSessionProvider} from 'src/providers/afriflash-session/afriflash-session.provider';
import {AfriflashHttpAnnonceProvider} from 'src/providers/afriflash-http/afriflash-http-annonce.provider';
import {AfriflashControlAnnonceProvider} from 'src/providers/afriflash-control-fields/afriflash-control-annonce.provider';
import {AfriflashObservablesProvider} from 'src/providers/afriflash-observables/afriflash-observables.provider';

@Component({
    selector: 'app-afriflash-add-annonce',
    templateUrl: './afriflash-add-annonce.component.html',
    styleUrls: ['./afriflash-add-annonce.component.scss'],
})
export class AfriflashAddAnnonceComponent implements OnInit {

    /**
     * Type de compte
     */
    public youAre = 'Particulier';

    /**
     * Type d'annonce
     */
    public annonceType: string;

    /**
     * Titre de l'annonce
     */
    public annonceTitle: string;

    /**
     * Catégorie choisie
     */
    public category: string;

    /**
     * Sous catégory
     */
    public subCategory: string;

    /**
     * Description
     */
    public description = '';

    /**
     * Prix
     */
    public price: number;

    /**
     * Description
     */
    public currency: string;

    /**
     * Photos
     */
    public photos: Array<string>;

    /**
     * Pays
     */
    public country: string;

    /**
     * City
     */
    public city: string;

    /**
     * Details de l'adresse
     */
    public details = '';

    /**
     * Nom de la société
     */
    public societyName: string;

    /**
     * Phone number
     */
    public phone: any;

    /**
     * Indicatif du numero
     */
    public indicatif: string;

    /**
     * Adresse mail
     */
    public email: string;

    /**
     * Catégories object
     */
    public categoriesObjects: any;

    /**
     * Categories disponible
     */
    public categories: Array<string>;

    /**
     * Critères Véhicule
     */
    public vehicleCriteres = {
        marque: null,
        modele: null,
        kilometrage: null,
        yearCirculation: null
    };

    /**
     * Critères immobilier
     */
    public immobilierCriteres = {
        surface: null,
        surfaceMeasure: null,
        piece: null
    };

    /**
     * Critères Service
     */
    public serviceCriteres = {
        isMoving: null,
        profession: null
    };
    /**
     * Permet de tester l'affichage des critères véhicule
     */
    public displayVehicleCritere = false;

    /**
     * Permet de tester l'affichage des imobilier
     */
    public displayImobilierCritere = false;

    /**
     * Permet de tester l'affichage des imobilier
     */
    public displayServiceCritere = false;

    /**
     * Verifie si l'imobilier est un terrain
     */
    public isTerrain = false;
    /**
     * Permet d'afficher la div criteres principale
     */
    public hideCriteres = true;

    /**
     * Sous catégories
     */
    public subCategories: Array<string>;

    /**
     * Test si c'est du web ou non
     */
    public isWeb: boolean;

    /**
     * Pour afficher l'icon des image
     */
    public icon = 'camera';

    /**
     * La valeur de l'attribut acountType
     */
    public acountType = 'acountType';

    /**
     * Message a afficher après le traitement du formulaire
     */
    public message: string;

    /**
     * La liste des dévises
     */
    public currencies: Array<string>;

    /**
     * Liste des pays
     */
    public countries: Array<string>;

    /**
     * Liste des indicatifs
     */
    public indicatifs: Array<string>;

    /**
     * Dernier message d'erreur avec l'id du champ
     */
    public lastError: {
        message: string,
        fieldId: string,
    } = {
        message: '',
        fieldId: ''
    };

    /**
     * Verifier si on affiche ou non le champ nom de la société
     */
    public displaySocietyName = true;

    /**
     * Affiche ou pas le message de warning
     */
    public isAuth;

    /**
     * Affiche le spinner oui OU non
     */
    public displaySpinner: boolean;

    /**
     * Message de success
     */
    public messageSuccess: string;

    /**
     * Action à effectuer
     */
    @Input() public action = 'create';

    /**
     * Annonce à modifier
     */
    @Input() public annonce: any;

    /**
     * Id de l'annonce à modifier
     */
    private annonceId: string;


    constructor(private managerFiles: AfriflashFilesManagerProvider,
                private config: AfriflashConfigProvider,
                private data: AfriflashDataProvider,
                private session: AfriflashSessionProvider,
                private annonceProvider: AfriflashHttpAnnonceProvider,
                private controlFormAnnonce: AfriflashControlAnnonceProvider,
                private observables: AfriflashObservablesProvider) {

    }

    ngOnInit() {
        this.categoriesObjects = this.data.getCategoriesObjects();
        this.currencies = this.data.getCurrencies();
        this.countries = this.data.getCountries();
        this.indicatifs = this.data.getIndicatifs();
        this.initCategories();
        this.photos = [];
        this.isWeb = this.config.isWeb();
        // Message de warning: Session quand on reactualise ET observable quand on se connecte et deconnecte
        this.config.getAuthent().then(
            (isAuth) => {
                this.isAuth = isAuth;
            }
        );
        this.observables.isAuth.subscribe(
            (isAuth) => {
                this.isAuth = isAuth;
            }
        );
        this.initFielsToUpdated();
    }

    getCategory(event) {
        if (event.target.value) {
            this.category = event.target.value;
            this.subCategory = null;
            this.initSubCategories(this.category);
            this.hideCriteres = true;
        }
    }

    getSubCategory(event) {
        this.initCriteres();
        if (event.target.value !== 'subCategory') {
            this.subCategory = event.target.value;
            // Decidez les critères a afficher
            if (this.category === 'Véhicules' && (this.subCategory === 'Voitures' ||
                this.subCategory === 'Motos')) {
                this.displayVehicleCritere = true;
                this.hideCriteres = false;
                this.displayServiceCritere = false;
                this.displayImobilierCritere = false;
            }
            if (this.category === 'Immobilier') {
                this.isTerrain = (this.subCategory === 'Terrain');
                this.displayImobilierCritere = true;
                this.hideCriteres = false;
                this.displayVehicleCritere = false;
                this.displayServiceCritere = false;
            }
            if (this.category === 'Services') {
                this.displayServiceCritere = true;
                this.hideCriteres = false;
                this.displayVehicleCritere = false;
                this.displayImobilierCritere = false;
            }
        } else {
            this.subCategory = null;
        }
    }


    /**
     * Affiches les criteres selon les sous-category
     */
    public displayCritereBysubCategory() {
        if (this.category === 'Véhicules' && (this.subCategory === 'Voitures' ||
            this.subCategory === 'Motos')) {
            this.displayVehicleCritere = true;
            this.hideCriteres = false;
            this.displayServiceCritere = false;
            this.displayImobilierCritere = false;
        }
        if (this.category === 'Immobilier') {
            this.isTerrain = (this.subCategory === 'Terrain');
            this.displayImobilierCritere = true;
            this.hideCriteres = false;
            this.displayVehicleCritere = false;
            this.displayServiceCritere = false;
        }
        if (this.category === 'Services') {
            this.displayServiceCritere = true;
            this.hideCriteres = false;
            this.displayVehicleCritere = false;
            this.displayImobilierCritere = false;
        }
    }

    getAnnonceType(event) {

    }

    /**
     * Recupère les details
     * @param event
     */
    handleAdresseDetails(event) {
        this.details = event.target.value;
    }

    /**
     * Récupere la description
     * @param event
     */
    handleDescription(event) {
        this.description = event.target.value;
    }

    /**
     * Crée une image et l'affiche
     * @param image image
     */
    public createImageFromBlob(image: Blob) {
        // - gerer le type de fichier à renvoyer
        // - gerer la taille a prendre
        const type = image.type.split('/');
        if (type[0] === 'image' && type[1] !== 'gif') {
            this.managerFiles.createImageFromBlob(image).subscribe(
                (url) => {
                    this.photos.push(url);
                }
            );
        }
    }

    removeImage(position: number) {
        this.photos.splice(position, 1);
    }

    /**
     * Recupére toutes les catégories disponnible
     */
    private initCategories() {
        this.categories = Object.keys(this.categoriesObjects);
    }

    /**
     * Recupére toutes les sous catégories disponnible pour une catégorie donnée
     */
    private initSubCategories(category: string) {
        this.subCategories = this.categoriesObjects[category];
    }

    /**
     * Recupere les valeurs des critères concernant la catégorie Véhicule
     * @param criteres Critéres du catégorie
     */
    getData(criteres: any) {
        this.vehicleCriteres = (this.displayVehicleCritere) ? criteres : null;
        this.immobilierCriteres = (this.displayImobilierCritere) ? criteres : null;
        this.serviceCriteres = (this.displayServiceCritere) ? criteres : null;
    }

    /**
     * Emet la valeur du choix AcountType
     */
    public emitAcountType() {
        const query = 'input[name=' + this.acountType + ']:checked';
        const value = document.querySelector(query).getAttribute('value');
        this.youAre = value;
        if (this.youAre === 'Professionnel') {
            this.displaySocietyName = false;
        } else {
            this.displaySocietyName = true;
            this.societyName = null;
        }
    }

    /**
     * Enregistrement d'une annonce
     */
    public async saveAnnonces(url) {
        const isAuth = await this.config.getAuthent();
        if (isAuth) {
            this.displaySpinner = true;
            const currentUser = await this.session.getItem('socialusers');
            let nomProduct = '';
            let featureSizes = 0;
            let featureMeasures = '';
            let nbElements = '';
            let dateProduit = null;
            let statusProduit = '';
            const userCode = currentUser.objectId;
            if (this.category && this.category === 'Véhicules') {
                nomProduct = this.vehicleCriteres ? this.vehicleCriteres.marque : '';
                featureMeasures = this.vehicleCriteres ? this.vehicleCriteres.modele : '';
                featureSizes = this.vehicleCriteres ? this.vehicleCriteres.kilometrage : 0;
                dateProduit = this.vehicleCriteres ? this.vehicleCriteres.yearCirculation : '';
            } else if (this.category && this.category === 'Immobilier') {
                featureSizes = this.immobilierCriteres ? this.immobilierCriteres.surface : 0;
                featureMeasures = this.immobilierCriteres ? this.immobilierCriteres.surfaceMeasure : '';
                nbElements = this.immobilierCriteres ? this.immobilierCriteres.piece : '';
            } else if (this.category && this.category === 'Services') {
                statusProduit = this.serviceCriteres ? this.serviceCriteres.isMoving : '';
                nomProduct = this.serviceCriteres ? this.serviceCriteres.profession : '';
            }

            const data = {
                codeUser: userCode,

                annonceUser: this.youAre,
                annonceType: this.annonceType,
                title: this.annonceTitle,
                category: this.category,
                subCategory: this.subCategory,
                description: this.description,
                price: this.price,
                currency: this.currency,
                photos: this.photos,
                statusProduct: statusProduit.trim(),
                dateProduct: dateProduit,

                nameProduct: nomProduct.trim(),
                featureMeasure: featureMeasures.trim(),
                featureSize: featureSizes,
                nbElement: nbElements.trim(),

                countryName: this.country,
                city: this.city,
                details: this.details,

                companyName: this.societyName,
                telephone: this.phone,
                indicatif: this.indicatif,
                mail: this.email,
            };

            this.displayMessage('', this.lastError.fieldId, '#46AEEE');
            this.messageSuccess = null;
            const error = this.controlFormAnnonce.controlForm(data);

            if (error && error.message === '') {

                if (this.controlFormAnnonce.controlSelectChoice(this.price, this.currency)) {

                    this.displayMessage('', 'price', 'none');

                    if ((this.societyName && this.societyName.trim() !== '') || (this.youAre === 'Particulier')) {

                        this.displayMessage('', 'society-name', 'none');

                        if ((this.email && this.email === '') ||
                            (this.email && this.controlFormAnnonce.controlEmail(this.email)) ||
                            (!this.email)) {

                            this.displayMessage('', 'email', 'none');

                            // On concatène l'indicatif et le numéro
                            data.telephone = data.indicatif + ' ' + data.telephone;

                            this.annonceProvider.save(url, data).subscribe(
                                (annonces) => {
                                    this.displaySpinner = false;
                                    if (this.action && this.action === 'update') {
                                        this.messageSuccess = 'Votre annonce a bien été modifiée';

                                    } else {
                                        this.messageSuccess = 'Votre annonce a bien été publiée';

                                    }
                                });
                            if (this.action && this.action !== 'update') {
                                this.initFields();
                            }

                        } else {
                            this.displayMessage('Veuillez renseigner le champ email', 'email', 'red');
                        }

                    } else {
                        this.displayMessage('Veuillez renseigner le champ Nom de la société', 'society-name', 'red');
                    }

                } else {
                    this.displayMessage('Veuillez renseigner le champ Prix - dévise', 'price', 'red');
                }

            } else {
                this.displayMessage(error.message, error.fieldId, 'red');
                this.lastError = error;
            }

        }
    }

    /**
     * Publication d'une annonce
     * @param url
     */
    public publishAnnonce() {
        this.saveAnnonces('annonce/save');
    }

    /**
     * Initialise les champs du formulaire
     */
    private initFields() {
        this.annonceTitle = null;
        this.annonceType = null;
        this.annonceTitle = null;
        this.category = null;
        this.subCategory = null;
        this.description = null;
        this.price = null;
        this.currency = null;
        this.photos = [];
        if (this.vehicleCriteres) {
            this.vehicleCriteres.marque = null;
            this.vehicleCriteres.modele = null;
            this.vehicleCriteres.kilometrage = null;
            this.vehicleCriteres.yearCirculation = null;
        }
        if (this.immobilierCriteres) {
            this.immobilierCriteres.surface = null;
            this.immobilierCriteres.surfaceMeasure = null;
            this.immobilierCriteres.piece = null;
        }
        if (this.serviceCriteres) {
            this.serviceCriteres.isMoving = null;
            this.serviceCriteres.profession = null;
        }
        this.country = null;
        this.city = null;
        this.details = null;

        this.societyName = null;
        this.phone = null;
        this.indicatif = null;
        this.email = null;
    }

    /**
     * Affiche le message et colorie si possible
     * @param message
     * @param idField
     * @param color
     */
    private displayMessage(message: string, idField: string, color: string) {
        this.message = message;
        if (idField && idField.trim() !== '') {
            document.getElementById(idField).style.borderColor = color;
        }
    }

    /**
     * Initialise les critères
     */
    private initCriteres() {
        this.displayVehicleCritere = false;
        this.hideCriteres = false;
        this.displayServiceCritere = false;
        this.displayImobilierCritere = false;

        this.vehicleCriteres = null;
        this.serviceCriteres = null;
        this.immobilierCriteres = null;
    }

    /**
     * Modification d'une annonce
     */
    public updateAnnonces() {
        console.log(this.annonceId);
        this.saveAnnonces('annonce/update/' + this.annonceId);
    }

    private initFielsToUpdated() {
        console.log(this.annonce);
        console.log(this.action);
        if (this.action === 'update' && this.annonce && this.annonce.annonce) {
            this.annonceId = this.annonce._id;
            console.log(this.annonceId);
            this.youAre = this.annonce.annonce.compteType;
            this.annonceType = this.annonce.annonce.annonceType;
            this.annonceTitle = this.annonce.annonce.annonceTitle;
            this.category = this.annonce.annonce.category;
            this.initSubCategories(this.category);
            this.subCategory = this.annonce.annonce.subCategory;

            if (this.category && this.subCategory) {
                this.displayCritereBysubCategory();
                if (this.category && this.category === 'Véhicules') {
                    this.vehicleCriteres.marque = this.annonce.annonce.product ? this.annonce.annonce.product.nameProduct : ' ';
                    this.vehicleCriteres.modele = this.annonce.annonce.product ? this.annonce.annonce.product.featureMeasure : ' ';
                    this.vehicleCriteres.kilometrage = this.annonce.annonce.product ? this.annonce.annonce.product.featureSize : 0;
                    this.vehicleCriteres.yearCirculation = this.annonce.annonce.product ? this.annonce.annonce.product.dateProduct : '';

                } else if (this.category && this.category === 'Immobilier' && this.immobilierCriteres) {
                    this.immobilierCriteres.surface = this.annonce.annonce.product ? this.annonce.annonce.product.featureSize : 0;
                    // tslint:disable-next-line:max-line-length
                    this.immobilierCriteres.surfaceMeasure = this.annonce.annonce.product ? this.annonce.annonce.product.featureMeasure : ' ';
                    this.immobilierCriteres.piece = this.annonce.annonce.product ? this.annonce.annonce.product.nbElement : ' ';
                } else if (this.category && this.category === 'Services' && this.serviceCriteres) {
                    this.serviceCriteres.isMoving = this.annonce.annonce.product ? this.annonce.annonce.product.statusProduct : ' ';
                    this.serviceCriteres.profession = this.annonce.annonce.product ? this.annonce.annonce.product.nameProduct : ' ';
                }
            }

            this.description = this.annonce.annonce.description;
            this.price = this.annonce.annonce.price.value;
            this.currency = this.annonce.annonce.price.devise;

            // tslint:disable-next-line:max-line-length
            this.phone = (this.annonce.informations && this.annonce.informations.number) ? this.annonce.informations.number.split(' ')[1] : this.phone;
            // tslint:disable-next-line:max-line-length
            this.indicatif = (this.annonce.informations && this.annonce.informations.number) ? this.annonce.informations.number.split(' ')[0] : this.indicatif;
            this.email = (this.annonce.informations) ? this.annonce.informations.mail : this.email;

            this.city = (this.annonce.adress) ? this.annonce.adress.city : this.city;
            this.country = (this.annonce.adress) ? this.annonce.adress.country : this.country;
            this.details = (this.annonce.adress) ? this.annonce.adress.details : this.details;

            this.photos[0] = (this.annonce.annonce.photos) ? this.annonce.annonce.photos.photo_1 : null;
            this.photos[1] = (this.annonce.annonce.photos) ? this.annonce.annonce.photos.photo_2 : null;
            this.photos[2] = (this.annonce.annonce.photos) ? this.annonce.annonce.photos.photo_2 : null;

        }
    }
}
