import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AfriflashDateProvider } from 'src/providers/afriflash-date/afriflash-date.provider';
import { AfriflashObservablesProvider } from 'src/providers/afriflash-observables/afriflash-observables.provider';
import { IonSlides, NavController } from '@ionic/angular';
import { AfriflashModalProvider } from 'src/providers/afriflash-modal/afriflash-modal.provider';
import { AfriflashMessageFormComponent } from '../../afriflash-message-form/afriflash-message-form.component';
import { AfriflashConfigProvider } from 'src/providers/afriflash-config/afriflash-config.provider';

@Component({
  selector: 'app-afriflash-ad-details',
  templateUrl: './afriflash-ad-details.component.html',
  styleUrls: ['./afriflash-ad-details.component.scss'],
})
export class AfriflashAdDetailsComponent implements OnInit {

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

  /**
   * Photos de l'annonce
   */
  public photos: any[];

  /**
   * Pour savoir si c'est un professionnel
   */
  public pro: boolean;

  /**
   * Afficher le numéro
   */
  public displayNumber = 'Afficher le numéro';

  /**
   * Pour savoir si c'est du web ou non
   */
  public isWeb: boolean;


  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

  sliderTwo: any;

  constructor(private dateProvider: AfriflashDateProvider,
              private observables: AfriflashObservablesProvider,
              private modal: AfriflashModalProvider,
              private config: AfriflashConfigProvider,
              private navCtrl: NavController) { }

  ngOnInit() {
    // Type de compte
    this.annonceInformation.annonce.compteType === 'Professionnel' ? this.pro = true : this.pro = false;

    // Recupère les photos de l'annonce
    this.getPhotos();

    // Format date
    this.getFormatDate();

    // Initialisation des slides
    this.initSlide();

    // Test si c'est du web ou non
    this.isWeb = this.config.isWeb();
  }

  public initSlide() {
        this.sliderTwo = {
            isBeginningSlide: true,
            isEndSlide: false,
            slidesItems: this.photos
        };
  }

  /**
   * Envoie un message
   */
  public async sendMessage() {
      const props = {
        annonce: this.annonceInformation
      };
      await this.modal.create(AfriflashMessageFormComponent, 'my-custom-modal-css', props);
  }

  // Move to Next slide
  slideNext(object, slideView) {
      if (slideView) {
          slideView.slideNext(500).then(() => {
              this.checkIfNavDisabled(object, slideView);
          });
      }
  }

  // Move to previous slide
  slidePrev(object, slideView) {
      slideView.slidePrev(500).then(() => {
          this.checkIfNavDisabled(object, slideView);
      });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
      this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
      this.checkisBeginning(object, slideView);
      this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
      slideView.isBeginning().then((istrue) => {
          object.isBeginningSlide = istrue;
      });
  }

  checkisEnd(object, slideView) {
      slideView.isEnd().then((istrue) => {
          object.isEndSlide = istrue;
      });
}


  /**
   * Affiche le numéro de téléphone
   */
  public displayPhone() {
    this.displayNumber = this.annonceInformation.informations.number;
  }

  /**
   * Recupère les annonces
   */
  private getPhotos() {
    this.photos = [];
    const keys = Object.keys(this.annonceInformation.annonce.photos);
    keys.forEach(key => {
      this.photos.push(this.annonceInformation.annonce.photos[key]);
    });
  }

  private getFormatDate() {
    this.annonceInformation.creationDateCustomize =
    this.dateProvider.getStructDate(this.dateProvider.getDifference(this.annonceInformation.creationDate, new Date()),
                                    this.annonceInformation.creationDate);
  }

}
