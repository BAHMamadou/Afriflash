import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  constructor() {

  }

  contactUs() {
    console.log('CONTACT US');
  }

  conditionsUse() {
    console.log('CONDITIONS USE');
  }

}
