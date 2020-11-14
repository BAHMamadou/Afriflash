import {Injectable} from '@angular/core';

@Injectable()

/**
 * Service fournissants des données dont l'application à besoin
 */
export class AfriflashDataProvider {

    /**
     * Liste des pays d'Afrique
     */
    private countries: string[];

    /**
     * Liste des catégories
     */
    private categoriesObjects = {
        'Services': [
            'Réparation & Maintenance', 'Beauté & Mode', 'Soutien scolaire', 'Restaurateurs', 'Déménageurs',
            'Service à domicile', 'Loisirs', 'Pressing', 'Voyage', 'Informatique', 'Restauration & Hôtellerie',
            'Comptable', 'Avocat', 'Notaire', 'Huissier de justice', 'Architecte', 'Agent commercial',
            'Courtier', 'Transiteur', 'Commissaire aux comptes', 'Commissionnaire', 'Moniteur auto-école', 'Formation',
            'Autres'
        ],
        'Informatique & éléctronique': [
            'Ordinateurs', 'Téléphones', 'Consoles de jeux', 'Tablettes', 'Télévision',
            'Magnétoscopes', 'Dictaphones & magnétophones', 'Appareils photos', 'Caméra',
            'Autres'
        ],
        'Immobilier': ['Maison', 'Appartement', 'Terrain', 'Bureaux & Commerces', 'Autres'],
        'Mobilier': ['Chaises & tabourets', 'Canapés & fauteuils', 'Literie', 'Luminaires', 'Rangements', 'Tables', 'Ustensiles de cuisine'],
        'Mode & beauté': ['Pagnes traditionnel', 'Vêtements homme', 'Vêtement femme', 'Chapeaux traditionnel', 'Beurre de karité', 'Autres'],

        'Véhicules': ['Voitures', 'Motos', 'Pièces détachées', 'Équipement auto', 'Équipement moto', 'Autres'],

        'Agriculture': ['Agricoles', 'Produits agricoles', 'Intrants', 'Autres'],
        'Art & culture': ['Instruments musical', 'Sculptures', 'Poteries', 'Peintures', 'Autres'],
        'Bijouterie': ['Chaînes', 'Boucles d’oreilles', 'Bagues', 'Bracelets', 'Autres'],
        'Cordonnerie': ['Chaussures', 'Portemonnaies', 'Sacs', 'Ceintures', 'Autres'],
        'Elevage & pêche': ['Produits animaliers', 'Produits halieutiques', 'Autres'],
        'Electroménager': ['Machine à laver', 'Cuisinière', 'Réfrigérateur & congélateur', 'Lave vaisselle', 'Cafetière', 'Autres'],

        'Loisirs & sports': ['Livres', 'Ballons', 'Vêtements de sport', 'Autres'],
        'Métallurgie': ['Portes', 'Fenêtres', 'Antivols', 'Autres'],
        'Matériaux de construction': ['Dallettes', 'Sable', 'Ciment', 'Fer', 'Autres'],
        'Produits sanitaires': ['Produits pharmaceutiques', 'Produits traditionnels', 'Autres'],
        'Emploi': ['Offres d\'emploi', 'Offres d\'emploi cadres', 'Autres'],

        'Divers': ['Autres']
    };

    /**
     * La liste des dévises
     */
    private currencies = [
        'GNF',
        'FCFA',
        'MAD',
        'NAIRA',
        'GHS',
        'LEONE',
        'EUR',
        'USD'
    ];

    /**
     * La liste des indicatifs
     */
    private indicatifs = [
        '+224',
        '+221',
        '+225',
        '+245',
        '+233',
        '+232',
        '+229',
        '+226',

        '+234',
        '+231',
        '+228',

        '+220',
        '+222',
        '+290',

        '+247',
        '+227',
        '+238',
        '+212',


        '+20',
        '+213',
        '+218',
        '+249',
        '+216',
        '+211',

        '+33',
        '+32'
    ];

    private marquesMotos = [
        'Tvs',
        'Yamaha',
        'Honda',
    ];

    private marques = [

        'ABARTH',
        'AC',
        'ACREA',
        'AIXAM',
        'ALFA ROMEO',
        'ALPINA',
        'ALPINE',
        'AME',
        'APAL',
        'ASTON MARTIN',
        'AUDI',
        'AUSTIN',
        'AUSTIN HEALEY',
        'AUTOBIANCHI',
        'BELLIER',
        'BENTLEY',
        'BMW',
        'BOLLORE',
        'BUICK',
        'BURBY\'S',
        'CADILLAC',
        'CASALINI',
        'CATERHAM',
        'CHATENET',
        'CHEVROLET',
        'CHRYSLER',
        'CITROEN',
        'COURB',
        'CUPRA',
        'DACIA',
        'DAEWOO',
        'DAIHATSU',
        'DAIMLER',
        'DALLARA',
        'DANGEL',
        'DATSUN',
        'DE LOREAN',
        'DE TOMASO',
        'DEVINCI',
        'DKW',
        'DODGE',
        'DONKERVOORT',
        'DS',
        'DUE',
        'EBRO',
        'EMBUGGY',
        'EXCALIBUR',
        'FACEL VEGA',
        'FERRARI',
        'FIAT',
        'FISKER',
        'FORD',
        'GMC',
        'GOUPIL',
        'HONDA',
        'HUMMER',
        'HYUNDAI',
        'INFINITI',
        'INNOCENTI',
        'ISUZU',
        'IVECO',
        'JAGUAR',
        'JDM SIMPA',
        'JEEP',
        'SIMPA',
        'JENSEN',
        'KIA',
        'KTM',
        'LADA',
        'LAMBORGHINI',
        'LANCIA',
        'LAND ROVER',
        'LEXUS',
        'LIGIER',
        'LINCOLN',
        'LONDON TAXI COMPANY',
        'LOTUS',
        'MAN',
        'MASERATI',
        'MATRA',
        'MAYBACH',
        'MAZDA',
        'MCLAREN',
        'MERCEDES',
        'MERCEDES-AMG',
        'MERCEDES-BENZ',
        'MERCURY',
        'MG',
        'MIA ELECTRIC',
        'MICROCAR',
        'MINAUTO',
        'MINI MITSUBISHI',
        'MORGAN',
        'MORRIS',
        'MPM MOTORS',
        'NASH',
        'NISSAN',
        'OLDSMOBILE',
        'OPEL',
        'PANHARD',
        'PEUGEOT',
        'PGO',
        'PIAGGIO',
        'PLYMOUTH',
        'POLARIS',
        'PONTIAC',
        'PORSCHE',
        'RADICAL',
        'RENAULT',
        'ROLLS ROYCE',
        'ROVER',
        'SAAB',
        'SANTANA',
        'SEAT',
        'SHELBY',
        'SIMCA',
        'SKODA',
        'SMART',
        'SPYKER',
        'SSANGYONG',
        'SUBARU',
        'SUNBEAM',
        'SUZUKI',
        'TALBOT LAGO',
        'TALBOT SIMCA',
        'TEILHOL',
        'TESLA',
        'TOYOTA',
        'TRABANT',
        'TRIUMPH',
        'TVR',
        'VOLKSWAGEN',
        'VOLVO',
        'WESTFIELD',
        'Autres'
    ];


    /**
     * Choix pour les filtres secondaires
     */
    private choicies = [
        // 'Tri: Plus récentes',
        'Tri: Plus anciennes',
        // 'Tri: Prix croissants',
        // 'Tri: Prix décroissants'
    ];



    private slideHome = {
        web : {
            slide1: ['Services', 'Informatique & éléctronique', 'Mode & beauté', 'Mobilier', 'Immobilier'],
            slide2: ['Electroménager', 'Véhicules', 'Cordonnerie', 'Art & culture', 'Loisirs & sports'],
            slide3: ['Agriculture',  'Elevage & pêche', 'Métallurgie', 'Matériaux de construction', 'Produits sanitaires'],
            slide4: [ 'Bijouterie', 'Emploi', 'Divers']
        },
        mobile : {
            slide1: ['Services', 'Informatique & éléctronique'],
            slide2: ['Mode & beauté',  'Electroménager'],
            slide3: ['Immobilier', 'Véhicules'],

            slide4: ['Cordonnerie', 'Elevage & pêche'],
            slide5: ['Art & culture', 'Loisirs & sports'],
            slide6: ['Mobilier',  'Agriculture'],

            slide7: ['Métallurgie', 'Matériaux de construction'],
            slide8: ['Produits sanitaires', 'Bijouterie'],
            slide9: ['Divers', 'Emploi']
        }
    };

    constructor() {
        this.countries = [];
        this.setCountries();
    }

    /**
     * Renvoie tous les pays d'Afrique
     */
    public getCountries() {
        return this.countries;
    }

    /**
     * Enregistre l'ensemble des pays d'Afrique
     */
    private setCountries() {
        this.countries.push('Afrique du Sud', 'Algérie', 'Angola', 'Bénin', 'Botswana',
            'Burkina Faso', 'Burundi', 'Cameroun', 'Cap-Vert', 'République centrafricaine', 'Comores',
            'République du Congo', 'République démocratique du Congo', 'Côte d’Ivoire', 'Djibouti', 'Égypte',
            'Érythrée', 'Eswatini', 'Éthiopie', 'Gabon', 'Gambie', 'Ghana', 'Guinée', 'Guinée-Bissau',
            'Guinée équatoriale', 'Kenya', 'Lesotho', 'Liberia', 'Libye', 'Madagascar', 'Malawi', 'Mali',
            'Maroc', 'Maurice', 'Mauritanie', 'Mozambique', 'Namibie', 'Niger', 'Nigeria', 'Ouganda',
            'Rwanda', 'São Tomé-et-Principe', 'Sénégal', 'Seychelles', 'Sierra Leone', 'Somalie', 'Soudan',
            'Soudan du Sud', 'Tanzanie', 'Tchad', 'Togo', 'Tunisie', 'Zambie', 'Zimbabwe');
    }

    /**
     * Recupere la liste des catégorie
     */
    public getCategoriesObjects() {
        return this.categoriesObjects;
    }

    /**
     * Recupere la liste des indicatifs
     */
    public getIndicatifs() {
        return this.indicatifs;
    }

    /**
     * Recupere la liste des devises
     */
    public getCurrencies() {
        return this.currencies;
    }

    /**
     * Renvoie la marques des véhicules ou motos
     * @param subCategory Sous catégorie
     */
    public getMarques(subCategory?: string) {
        if (subCategory && subCategory === 'Motos') {
            return this.marquesMotos;
        }
        return this.marques;
    }

    public getChoices() {
        return this.choicies;
    }


    /**
     * Recupere la liste des catégorie du slide 1
     */
    public getSlideHome() {
        return this.slideHome;
    }

}
