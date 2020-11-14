import {Component, OnInit} from '@angular/core';
import {AfriflashObservablesProvider} from '../../../providers/afriflash-observables/afriflash-observables.provider';
import {NavController} from '@ionic/angular';
import {AfriflashHttpAnnonceProvider} from '../../../providers/afriflash-http/afriflash-http-annonce.provider';
import {AfriflashDataProvider} from '../../../providers/afriflash-data/afriflash-data.provider';
import {AfriflashConfigProvider} from '../../../providers/afriflash-config/afriflash-config.provider';
import {AfriflashUtilsProvider} from '../../../providers/afriflash-utils-functions/afriflash-utils.provider';
import {AfriflashSessionProvider} from '../../../providers/afriflash-session/afriflash-session.provider';

@Component({
    selector: 'app-my-annonces',
    templateUrl: './my-annonces.page.html',
    styleUrls: ['./my-annonces.page.scss'],
})
export class MyAnnoncesPage implements OnInit {

    /**
     * Liste des annonces
     */
    public annonces: any[];

    /**
     * Critères générales
     */
    public criteres: {
        typeAnnonce: string,
        category: string,
        country: string,
        subCategories: string[],
        filters: any,
        acountType: string
    };

    /**
     * Filtres secondaires
     */
    public secondaryFilters: {
        proSort: string,
        ParticulierSort: string,
        selectFiltre: string
    } = {
        proSort: 'Professionnel',
        ParticulierSort: 'Particulier',
        selectFiltre: ''
    };

    /**
     * Liste des choix des filtres secondaires
     */
    public choicies: Array<string>;

    /**
     * Resultat de la recherche
     */
    public results: string;

    /**
     * Afficher le spinner ou non
     */
    public hiddeSpinner = true;

    /**
     * Savoir si c'est du web ou non
     */
    public isWeb: boolean;

    /**
     * numéro des pages
     */
    public positions = [];

    /**
     * Position de la page courante
     */
    public currentPage = 1;

    /**
     * Annonces temporaires
     */
    public annoncesTmp: Array<any>;

    /**
     * La limite pour récuperer les données
     */
    public limit = 100;

    /**
     * Données à ignorer
     */
    public skip = 0;

    /**
     * Le nombre d'annonces par pages
     */
    public nbrAnnoncesPerPage = 20;

    /**
     * Valeur de la categorie par défaut
     */
    public categoryDefault = '';
    public userId: any;

    constructor(private observable: AfriflashObservablesProvider,
                private navCtrl: NavController,
                private httpAnnonce: AfriflashHttpAnnonceProvider,
                private dataProvider: AfriflashDataProvider,
                private config: AfriflashConfigProvider,
                private session: AfriflashSessionProvider,
                private utilsProvider: AfriflashUtilsProvider) {
    }

    ngOnInit() {

        // initialisation tableau positions
        this.positions = [];

        // Initialisation des choix pour les filtres secondaires
        this.choicies = this.dataProvider.getChoices();

        // Initialisation de la plateforme
        this.isWeb = this.config.isWeb();

        // Chargement des données
        this.getAnnonces();

        // Pour rediriger vers le home quand le user n'est pas connecté
        this.init();

        this.observable.loadMyAnnonces.subscribe(
            (idUser) => {
                this.annoncesTmp = null;
                this.annonces = null;
                this.getAnnonces();
            }
        );
    }

    /**
     * Verifie si le user est connecté
     */
    public init() {
        this.session.getItem('socialusers').then(
            (user) => {
                if (!user) {
                    this.navCtrl.navigateRoot('/');
                }
            });

    }

    /**
     * Recupère les critères
     * @param criteres critères
     */
    public getFilters(criteres: any) {
        this.criteres = criteres;
        this.annonces = null;
        this.annoncesTmp = null;
        console.log(this.criteres);
        this.skip = 0;
        this.currentPage = 1;
        this.getAnnonces();
    }

    /**
     * Recupere la position de la page courante
     * @param position Position de la page
     */
    public getPosition(position: number) {
        this.currentPage = position;
        // Recuperer un multiple de 5
        if (position % 5 === 0 && !this.positions.includes(position)) {
            this.positions.push(position);
            this.skip = this.skip + this.limit;
            this.getAnnonces();
        }
    }

    /**
     * Afficher plus de details pour l'annonce en question
     * @param id id
     */
    public moreDetails(annonceId: any) {
        this.navCtrl.navigateForward('details-annonce', {
            queryParams: {id: annonceId}
        });
    }

    /**
     * Recupère la liste des annonces
     */
    private async getAnnonces() {
        const currentUser = await this.session.getItem('socialusers');
        const body = {
            limit: this.limit,
            skip: this.skip,
            user: currentUser.objectId
        };
        this.hiddeSpinner = false;
        this.httpAnnonce.getAllWithFilters('annonce/byuser', body).subscribe(
            (annonces) => {
                if (!this.annonces && !this.annoncesTmp) {
                    this.annonces = [];
                    this.annoncesTmp = [];
                    this.positions = [];
                }
                this.annonces = this.annonces.concat(annonces.slice());
                this.annoncesTmp = this.annoncesTmp.concat(annonces.slice());
                this.results = this.utilsProvider.customizeNumber(annonces.length);
                this.hiddeSpinner = true;
                // this.observable.spinnerEvent.emit(true);
            }
        );
    }


}
