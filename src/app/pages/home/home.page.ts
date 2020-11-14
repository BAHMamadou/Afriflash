import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from 'angular-6-social-login';
import {Socialusers} from '../../../models/afriflash-social-users.model';
import {IonSlides, ModalController, NavController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import {AfriflashDataProvider} from '../../../providers/afriflash-data/afriflash-data.provider';
import {AfriflashConfigProvider} from '../../../providers/afriflash-config/afriflash-config.provider';
import { AfriflashSessionProvider } from 'src/providers/afriflash-session/afriflash-session.provider';



@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    socialusers = new Socialusers();

    public countries: string[];

    /**
     * Test si c'est du web ou non
     */
    public isWeb: boolean;

    @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
    @ViewChild('slideWithNav2', {static: false}) slideWithNav2: IonSlides;
    @ViewChild('slideWithNav3', {static: false}) slideWithNav3: IonSlides;

    sliderTwo: any;


    slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true,
        spaceBetween: 40
    };

    public icon = 'camera';
    sliderOpts = {
        zome: false,
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 20,
    };

    constructor(public OAuth: AuthService,
                public modalCtrl: ModalController,
                private dataProvider: AfriflashDataProvider,
                private config: AfriflashConfigProvider,
                public  sanitizer: DomSanitizer,
                private navCtrl: NavController,
                private session: AfriflashSessionProvider) {
    }

    ngOnInit() {
        this.isWeb = this.config.isWeb();
        this.countries = this.dataProvider.getCountries();
        this.initSlide();
    }

    public initSlide() {
        if (this.isWeb) {
            this.sliderTwo = {
                isBeginningSlide: true,
                isEndSlide: false,
                slidesItems: [
                    {s: this.dataProvider.getSlideHome().web.slide1},
                    {s: this.dataProvider.getSlideHome().web.slide2},
                    {s: this.dataProvider.getSlideHome().web.slide3},
                    {s: this.dataProvider.getSlideHome().web.slide4},
                ]
            };
        } else {
            this.sliderTwo = {
                isBeginningSlide: true,
                isEndSlide: false,
                slidesItems: [
                    {s: this.dataProvider.getSlideHome().mobile.slide1},
                    {s: this.dataProvider.getSlideHome().mobile.slide2},
                    {s: this.dataProvider.getSlideHome().mobile.slide3},
                    {s: this.dataProvider.getSlideHome().mobile.slide4},

                    {s: this.dataProvider.getSlideHome().mobile.slide5},
                    {s: this.dataProvider.getSlideHome().mobile.slide6},
                    {s: this.dataProvider.getSlideHome().mobile.slide7},
                    {s: this.dataProvider.getSlideHome().mobile.slide8},
                    {s: this.dataProvider.getSlideHome().mobile.slide9},
                ]
            };

        }
    }

    /**
     * Publier une annonce
     */
    public publish() {
        this.navCtrl.navigateForward('publish-annonce');
    }

    /**
     * Cherche une annonce
     */
    public search() {
        this.navCtrl.navigateForward('search-annonce');
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


    async goToPage(categoryValue: string) {
        await this.session.setItem('source', 'home');
        this.navCtrl.navigateForward('search-annonce', {
            queryParams: { category: categoryValue}
        });
    }


}
