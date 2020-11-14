import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AfriflashHttpAnnonceProvider } from 'src/providers/afriflash-http/afriflash-http-annonce.provider';


@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.page.html',
  styleUrls: ['./details-annonce.page.scss'],
})
export class DetailsAnnoncePage implements OnInit {

  /**
   * L'annonce à afficher
   */
  public annonceInformation: {
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
          }
        );
      }
    );
  }

  /**
   * Met tous a nulle avant d'afficher la nouvelle annonce
   */
  ionViewWillEnter() {
    document.getElementById('actualize').click();
  }

  /**
   * Requeter l'annonce
   * @param id Id de l'annonce
   */
  private loadAnnonce(id: string) {
    return this.httpAnnonce.getById('annonce/' + id);
  }

  public actualize() {
    this.annonceInformation = null;
  }
}
