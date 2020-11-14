import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'afriflash-registration',
  templateUrl: './afriflash-registration.component.html',
  styleUrls: ['./afriflash-registration.component.scss'],
})
export class AfriflashRegistrationComponent implements OnInit {

  /**
   * Permet de changer de tabulation
   */
  public tabDisplayed = 1;

  constructor() { }

  ngOnInit() {}

  /**
   * Permet de changer de tabulation
   * Entre Personnel et Professionnel
   */
  public changeTab(value: number) {
    this.tabDisplayed = value;
  }
}
