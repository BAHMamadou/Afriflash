import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AfriflashConfigProvider} from 'src/providers/afriflash-config/afriflash-config.provider';
import {AfriflashDateProvider} from 'src/providers/afriflash-date/afriflash-date.provider';
import {AfriflashUtilsProvider} from 'src/providers/afriflash-utils-functions/afriflash-utils.provider';
import {AfriflashAlertProvider} from '../../../../providers/afriflash-alert/afriflash-alert.provider';
import {AfriflashHttpAnnonceProvider} from '../../../../providers/afriflash-http/afriflash-http-annonce.provider';
import {NavController} from '@ionic/angular';
import {AfriflashObservablesProvider} from "../../../../providers/afriflash-observables/afriflash-observables.provider";

@Component({
    selector: 'afriflash-ad',
    templateUrl: './afriflash-ad.component.html',
    styleUrls: ['./afriflash-ad.component.scss'],
})
export class AfriflashAdComponent implements OnInit {

    /**
     * L'annonce à afficher
     */
    @Input() public annonceInformation: {
        _id: string,
        creationDate: any,
        creationDateCustomize: any,
        user: {},
        annonce: {
            category: string,
            subCategory: string,
            compteType: string,
            annonceType: string,
            annonceTitle: string,
            description: string,
            product: {
                nameProduct: string,
                stateProduct: string,
                statusProduct: string,
                featureSize: string,
                featureMeasure: string,
                nbElement: string,
                dateProduct: string,

            },
            price: {
                value: any,
                devise: string,
            },
            photos: {
                photo_1: string,
                photo_2: string,
                photo_3: string,
            }
        },
        adress: {
            country: string,
            city: string,
            details: string
        },
        informations: {
            nameOrPseudo: string,
            mail: string,
            number: string,
            displayNumber: boolean
        }

    };

    @Output() public clickAd = new EventEmitter<any>();

    /**
     * L'image de l'annonce
     */
    public image: string;

    /**
     * Pour savoir si c'est un professionnel
     */
    public pro: boolean;

    /**
     * Test si la platform est de type web
     */
    public isWeb = false;

    /**
     * Verification s'i la page est mes annonces
     */
    @Input() public myadd = false;


    constructor(private config: AfriflashConfigProvider,
                private dateProvider: AfriflashDateProvider,
                private utilsProvider: AfriflashUtilsProvider,
                private navCtrl: NavController,
                private httpAnnonce: AfriflashHttpAnnonceProvider,
                private alert: AfriflashAlertProvider,
                private observable: AfriflashObservablesProvider) {
    }

    ngOnInit() {
        this.getFormatDate();
        this.image = this.annonceInformation.annonce.photos.photo_1 ? this.annonceInformation.annonce.photos.photo_1 :
            './assets/icon/annonce_img_default.PNG';
        this.annonceInformation.annonce.compteType === 'Professionnel' ? this.pro = true : this.pro = false;
        this.isWeb = this.config.isWeb();
    }

    private getFormatDate() {
        this.annonceInformation.creationDateCustomize =
            this.dateProvider.getStructDate(this.dateProvider.getDifference(this.annonceInformation.creationDate, new Date()),
                this.annonceInformation.creationDate);
    }

    /**
     * On emet le id de l'annonce
     */
    public details() {
        this.clickAd.emit(this.annonceInformation._id);
    }

    public async updateAnnonce() {
        this.navCtrl.navigateForward('update-annonce', {
            queryParams: {id: this.annonceInformation._id}
        });
    }

    public delateAnnonce() {
        const message = 'Attention vous allez supprimer définitivement cette annonce.';
        const css = '';
        console.log(this.annonceInformation._id);
        const body = {
            annonceId: this.annonceInformation._id
        };
        const buttons = [
            {
                text: 'Supprimer',
                handler: () => {
                    this.httpAnnonce.deleteAnnonce('annonce/delate', body).subscribe(
                        (annonce) => {
                            this.observable.loadMyAnnonces.emit(this.annonceInformation.user['objectId']);
                        }
                    );
                }
            },
            {
                text: 'Annuler',
                handler: () => {
                }
            }
        ];
        this.alert.alertMessage(message, css, buttons);
    }

}
