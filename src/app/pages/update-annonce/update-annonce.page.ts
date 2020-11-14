import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AfriflashHttpAnnonceProvider} from '../../../providers/afriflash-http/afriflash-http-annonce.provider';

@Component({
  selector: 'app-update-annonce',
  templateUrl: './update-annonce.page.html',
  styleUrls: ['./update-annonce.page.scss'],
})
export class UpdateAnnoncePage implements OnInit {
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

  constructor(private route: ActivatedRoute, private httpAnnonce: AfriflashHttpAnnonceProvider) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
        (object: any) => {
          this.loadAnnonce(object.id).subscribe(
              (annonce) => {
                this.annonceInformation = annonce;
                console.log(this.annonceInformation);
              }
          );
        }
    );
  }

  /**
   * Requeter l'annonce
   * @param id Id de l'annonce
   */
  private loadAnnonce(id: string) {
    return this.httpAnnonce.getById('annonce/' + id);
  }

  /**
   * Initialiser les champs dans le cas d'une modification
   */
  ionViewWillEnter() {
    this.annonceInformation = null;
  }

  public actualize() {
    this.annonceInformation = null;
  }
}
