import { Component, OnInit, ViewChild } from '@angular/core';
import { AfriflashObservablesProvider } from 'src/providers/afriflash-observables/afriflash-observables.provider';
import { AfriflashHttpAnnonceProvider } from 'src/providers/afriflash-http/afriflash-http-annonce.provider';
import { AfriflashDataProvider } from 'src/providers/afriflash-data/afriflash-data.provider';
import { AfriflashConfigProvider } from 'src/providers/afriflash-config/afriflash-config.provider';
import { AfriflashFilterProvider } from 'src/providers/afriflash-filter/afriflash-filter.provider';
import { AfriflashUtilsProvider } from 'src/providers/afriflash-utils-functions/afriflash-utils.provider';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { AfriflashSessionProvider } from 'src/providers/afriflash-session/afriflash-session.provider';

@Component({
  selector: 'app-search-annonce',
  templateUrl: './search-annonce.page.html',
  styleUrls: ['./search-annonce.page.scss'],
})
export class SearchAnnoncePage implements OnInit {

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
  public nbrAnnoncesPerPage = 10;

  /**
   * Valeur de la categorie par défaut
   */
 public categoryDefault = '';

 public subscribe: Subscription;

 @ViewChild('content', { static: true }) public content: any;

  constructor(private observable: AfriflashObservablesProvider,
              private navCtrl: NavController,
              private httpAnnonce: AfriflashHttpAnnonceProvider,
              private dataProvider: AfriflashDataProvider,
              private config: AfriflashConfigProvider,
              private filterProvider: AfriflashFilterProvider,
              private route: ActivatedRoute,
              private session: AfriflashSessionProvider,
              private utilsProvider: AfriflashUtilsProvider) { }

  ngOnInit() {

    // initialisation tableau positions
    this.positions = [];

    // Initialisation des choix pour les filtres secondaires
    this.choicies = this.dataProvider.getChoices();

    // Initialisation de la plateforme
    this.isWeb = this.config.isWeb();

    // On supprime la source avant d'initialiser la recherche
    this.session.remove('source').then(
      () => {
        this.getAnnonces();
      }
    );
  }

  /**
   * Reinitialise l'ecouteur
   */
  async ionViewWillEnter() {
    const source = await this.session.getItem('source');
    if (source && source === 'home') {
      this.subscribe = this.route.queryParams.subscribe(
        (category: any) => {
          if (category) {
            this.criteres = {
              acountType: '',
              category: category.category,
              country: '',
              filters: {},
              subCategories: null,
              typeAnnonce: '',
            };
            this.annonces = null;
            this.annoncesTmp = null;
            this.skip = 0;
            this.currentPage = 1;
            this.categoryDefault = category.category;
            this.observable.initDefaultCategory.emit(this.categoryDefault);
            this.getAnnonces();
          }
        }
    );
    }
  }

  /**
   * Lorsque l'on quitte la page on se désabonne
   */
  async ionViewWillLeave() {
    console.log('Unsuscribe observer');
    await this.session.remove('source');
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  /**
   * Recupère les critères
   * @param criteres critères
   */
  public getFilters(criteres: any) {
    this.criteres = criteres;
    this.annonces = null;
    this.annoncesTmp = null;
    this.skip = 0;
    this.currentPage = 1;
    this.getAnnonces();
  }

  /**
   * Recupere la position de la page courante et permet de savoir si c'est un suivant 
   * donc il faut requeter de nouveau (multiple de 5) ou si c'est un precedent il ne faut
   * rien faire dans ce cas
   * @param position Position de la page
   */
  public getPosition(position: number) {
    this.currentPage = position;
    // On scroll au debut de la page
    this.content.scrollToTop(300);
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
      queryParams: { id: annonceId}
    });
  }

  /**
   * Recupère la liste des annonces
   */
  private getAnnonces() {
    let body: any = {};
    console.log(this.criteres);
    if (this.criteres && this.criteresExist()) {

      body = {
        limit: this.limit,
        skip: this.skip,
        filters: this.criteres
      };
    } else {
      body = {
        limit: this.limit,
        skip: this.skip
      };
    }
    this.hiddeSpinner = false;
    this.httpAnnonce.getAllWithFilters('annonce/annonces', body).subscribe(
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

  /**
   * Recupère le filtre secondaire
   * @param event
   */
  public getChoiceSecondFilter(value) {
    this.secondaryFilters.selectFiltre = value;
    this.reloadAnnonces();
  }

  /**
   * Récupère le filtre pro
   * @param event
   */
  public handleCheckboxPro(event) {
    if (event.target.checked) {
      this.secondaryFilters.proSort = event.target.value;
      this.reloadAnnonces();
    } else {
      this.secondaryFilters.proSort = '';
      this.reloadAnnonces();
    }
  }

  /**
   * Récupère le filtre particulier
   * @param event
   */
  public handleCheckboxParticulier(event) {
    if (event.target.checked) {
      this.secondaryFilters.ParticulierSort = event.target.value;
      this.reloadAnnonces();
    } else {
      this.secondaryFilters.ParticulierSort = '';
      this.reloadAnnonces();
    }
  }

  /**
   * Verifie si au moins un des critères est remplit
   */
  private criteresExist() {
    if (this.criteres.acountType !== '' || this.criteres.category !== '' ||
        this.criteres.filters !== {} || this.criteres.subCategories.length !== 0 ||
        this.criteres.typeAnnonce !== '') {

          return true;
    }
    return false;
  }

  /**
   * Recharge les annonces avec les filtres secondaires
   */
  private reloadAnnonces() {
    if (this.secondaryFilters.selectFiltre && this.secondaryFilters.selectFiltre.trim() !== '') {
        this.hiddeSpinner = false;
        if (this.secondaryFilters.selectFiltre.trim() === 'Tri: Plus récentes') {
          this.annoncesTmp.sort(this.filterProvider.cmpByRecentAnnonces);
          this.annonces.sort(this.filterProvider.cmpByRecentAnnonces);
        }
        if (this.secondaryFilters.selectFiltre.trim() === 'Tri: Plus anciennes') {
            this.annoncesTmp.sort(this.filterProvider.cmpByOldAnnonces);
            this.annonces.sort(this.filterProvider.cmpByOldAnnonces);
        }
    }

    if (this.secondaryFilters.ParticulierSort && this.secondaryFilters.ParticulierSort.trim() === 'Particulier') {
        this.hiddeSpinner = false;
        this.annoncesTmp = this.annonces.filter(object => object.annonce.compteType === 'Particulier');
        this.currentPage = 1;
      }

    if (this.secondaryFilters.proSort && this.secondaryFilters.proSort.trim() === 'Professionnel') {
        this.hiddeSpinner = false;
        this.annoncesTmp = this.annonces.filter(object => object.annonce.compteType === 'Professionnel');
        this.currentPage = 1;
    }

    if (this.secondaryFilters.proSort && this.secondaryFilters.proSort.trim() === 'Professionnel' &&
        this.secondaryFilters.ParticulierSort && this.secondaryFilters.ParticulierSort.trim() === 'Particulier') {
        this.hiddeSpinner = false;
        this.annoncesTmp = this.annonces;
        this.currentPage = 1;
    }

    if (this.secondaryFilters.proSort.trim() !== 'Professionnel' && this.secondaryFilters.ParticulierSort.trim() !== 'Particulier') {
          this.hiddeSpinner = false;
          this.annoncesTmp = this.annonces;
          this.currentPage = 1;
          document.getElementById('Professionnels').click();
          document.getElementById('Particuliers').click();
    }
    this.hiddeSpinner = true;
  }

}
